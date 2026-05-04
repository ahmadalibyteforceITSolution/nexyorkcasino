<template>
  <div class="min-h-screen bg-dark overflow-x-hidden relative">
    <!-- Auth Modal -->
    <AuthModal 
      v-if="!currentUser" 
      :userCount="userCount" 
      @login-success="handleLoginSuccess" 
    />

    <TokenBuyModal 
      v-if="showTokenModal" 
      @close="showTokenModal = false" 
      @purchase-success="handleTokenPurchase" 
    />

    <Header 
      v-if="currentUser"
      @open-dashboard="showDashboard = true" 
      @open-tokens="showTokenModal = true"
      @logout="handleLogout"
      :balance="balance" 
      :tokens="tokens"
      :cryptoBalance="cryptoBalance"
      :userCount="userCount"
    />
    
    <router-view 
      v-if="currentUser && !showDashboard"
      :matches="globalMatches"
      :balance="balance"
      :tokens="tokens"
      :cryptoBalance="cryptoBalance"
      @claim-bonus="handleClaimBonus"
      @add-to-slip="addToSlip"
      @place-bet="handlePlaceCasinoBet"
      @open-tokens="showTokenModal = true"
    />

    <UserDashboard 
      v-if="showDashboard" 
      :isOpen="showDashboard" 
      :matches="globalMatches"
      :betSlip="betSlip"
      :balance="balance"
      :cryptoBalance="cryptoBalance"
      :userCount="userCount"
      :user="currentUser"
      @close="showDashboard = false"
      @remove-bet="removeBet"
      @place-bet="handlePlaceBet"
      @claim-bonus="handleClaimBonus"
    />
    
    <SocialHub 
      v-if="currentUser"
      :messages="chatMessages"
      :recentBets="recentPublicBets"
      :currentUser="currentUser.username"
      :onlineUsers="onlineUsers"
      @send="handleSendMessage"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from './services/api'
import Header from './components/Header.vue'
import UserDashboard from './components/UserDashboard.vue'
import AuthModal from './components/AuthModal.vue'
import TokenBuyModal from './components/TokenBuyModal.vue'
import SocialHub from './components/SocialHub.vue'
import socket from './socket'

const Swal = window.Swal

const currentUser = ref(null)
const showDashboard = ref(false)
const showTokenModal = ref(false)
const balance = ref(0)
const tokens = ref(0)
const cryptoBalance = ref(0)
const betSlip = ref([])
const globalMatches = ref([])
const userCount = ref(0)
const chatMessages = ref([])
const recentPublicBets = ref([])

onMounted(() => {
  // Check for stored user
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    handleLoginSuccess(JSON.parse(storedUser))
  }

  socket.on('userCountUpdate', (count) => userCount.value = count)
  socket.on('initialMatches', (data) => globalMatches.value = data)
  socket.on('allMatchesUpdate', (data) => globalMatches.value = data)
  socket.on('initialMessages', (msgs) => chatMessages.value = msgs)
  socket.on('newMessage', (msg) => chatMessages.value.push(msg))
  socket.on('betBroadcast', (bet) => {
    recentPublicBets.value.unshift(bet)
    if (recentPublicBets.value.length > 5) recentPublicBets.value.pop()
  })
  
  socket.on('balanceUpdate', (data) => {
    balance.value = data.balance
    if (currentUser.value) {
      const user = JSON.parse(localStorage.getItem('user'))
      if (user) {
        user.balance = data.balance
        localStorage.setItem('user', JSON.stringify(user))
      }
    }
  })
})

const handleLoginSuccess = (user) => {
  currentUser.value = user
  balance.value = user.balance
  tokens.value = user.tokens || 0
  cryptoBalance.value = user.cryptoBalance
  apiService.registerUserSocket(user)
}

const handleLogout = () => {
  currentUser.value = null
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.reload() // Hard reset for security
}

const handleTokenPurchase = (newTokens) => {
  tokens.value = newTokens
  showTokenModal.value = false
}

const handleSendMessage = (text) => {
  apiService.sendMessage(text, currentUser.value.username)
}

const addToSlip = (data) => {
  const { match, type, odds } = data
  const selection = type === 'home' ? match.home : type === 'away' ? match.away : 'Draw'
  betSlip.value.push({
    id: Date.now(),
    match: `${match.home} vs ${match.away}`,
    selection,
    odds,
    stake: 100
  })
}

const removeBet = (id) => betSlip.value = betSlip.value.filter(b => b.id !== id)

const handlePlaceBet = () => {
  const total = betSlip.value.length * 100
  if (balance.value >= total) {
    balance.value -= total
    betSlip.value.forEach(bet => {
      socket.emit('placePublicBet', {
        username: currentUser.value.username,
        match: bet.match,
        amount: bet.stake,
        selection: bet.selection
      })
    })
    betSlip.value = []
    Swal?.fire({
      title: '🏆 Bets Placed!',
      text: `$${total} wagered across ${total / 100} bet(s). Good luck!`,
      icon: 'success',
      background: '#0d0d0d',
      color: '#fff',
      confirmButtonColor: '#F5C518',
      timer: 3000,
      timerProgressBar: true
    })
  } else {
    Swal?.fire({
      title: 'Insufficient Balance',
      text: 'Please deposit funds to place bets.',
      icon: 'error',
      background: '#0d0d0d',
      color: '#fff',
      confirmButtonColor: '#F5C518'
    })
  }
}

const handlePlaceCasinoBet = (wager) => {
  if (tokens.value >= wager) {
    tokens.value -= wager
    // Update local storage
    const user = JSON.parse(localStorage.getItem('user'))
    user.tokens = tokens.value
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    showTokenModal.value = true
  }
}

const handleClaimBonus = async () => {
  const { value: accountNumber } = await Swal?.fire({
    title: 'Link Bank Account',
    text: 'Please enter your bank account number to verify and deposit your $100 VIP Bonus instantly.',
    input: 'text',
    inputPlaceholder: 'Enter Account Number (e.g. US123456)',
    background: '#0d0d0d',
    color: '#fff',
    confirmButtonColor: '#F5C518',
    showCancelButton: true,
    cancelButtonColor: '#d33',
    confirmButtonText: 'Verify & Claim',
    inputValidator: (value) => {
      if (!value) return 'Bank Account Number is required!'
      if (!/^[A-Z0-9]{8,20}$/i.test(value)) {
        return 'Invalid format. Must be 8-20 alphanumeric characters (No spaces or dashes).'
      }
    }
  }) || {}

  if (accountNumber) {
    try {
      const res = await apiService.claimBonus()
      balance.value = res.data.balance
      const user = JSON.parse(localStorage.getItem('user'))
      user.balance = res.data.balance
      localStorage.setItem('user', JSON.stringify(user))

      Swal?.fire({
        title: '👑 VIP BONUS CLAIMED!',
        html: `<p style="color:#aaa">$100 has been verified and deposited instantly through account ending in <b>${accountNumber.slice(-4)}</b>!</p>`,
        icon: 'success',
        background: '#0d0d0d',
        color: '#fff',
        confirmButtonColor: '#F5C518',
        confirmButtonText: 'LET\'S PLAY!',
        showClass: { popup: 'animate__animated animate__zoomIn' }
      })
    } catch (err) {
      Swal?.fire({
        title: 'Error',
        text: err.response?.data?.error || 'Could not claim bonus',
        icon: 'error',
        background: '#0d0d0d',
        color: '#fff',
        confirmButtonColor: '#F5C518'
      })
    }
  }
}
</script>
