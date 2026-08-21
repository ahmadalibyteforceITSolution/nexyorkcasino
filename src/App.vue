<template>
  <div class="min-h-screen bg-[#FAF8F5] text-[#1E2329] overflow-x-hidden relative font-outfit">
    <!-- Interactive 3D Background Canvas -->
    <ThreeDBackgroundCanvas />

    <!-- Auth Modal -->
    <AuthModal 
      v-if="showAuthModal && !currentUser" 
      :userCount="userCount" 
      @login-success="handleLoginSuccess" 
      @close="showAuthModal = false"
    />

    <TokenBuyModal 
      v-if="showTokenModal" 
      @close="showTokenModal = false" 
      @purchase-success="handleTokenPurchase" 
    />

    <!-- Header containing Binance Live Ticker & Navigation -->
    <Header 
      :currentUser="currentUser"
      @open-dashboard="showDashboard = true" 
      @open-tokens="showTokenModal = true"
      @logout="handleLogout"
      @open-auth="showAuthModal = true"
      :balance="balance" 
      :tokens="tokens"
      :cryptoBalance="cryptoBalance"
      :userCount="userCount"
      :slipCount="betSlip.length"
    />
    
    <router-view 
      v-if="!showDashboard"
      :matches="globalMatches"
      :balance="balance"
      :tokens="tokens"
      :cryptoBalance="cryptoBalance"
      :currentUser="currentUser"
      @claim-bonus="handleClaimBonus"
      @add-to-slip="addToSlip"
      @place-bet="handlePlaceCasinoBet"
      @open-tokens="showTokenModal = true"
      @balance-update="handleBalanceUpdate"
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
      @balance-update="handleBalanceUpdate"
    />
    
    <SocialHub 
      v-if="currentUser"
      :messages="chatMessages"
      :recentBets="recentPublicBets"
      :currentUser="currentUser.username"
      :onlineUsers="onlineUsers"
      @send="handleSendMessage"
    />

    <!-- Global VIP Moodboard Pick & Drop Drawer -->
    <MoodboardDrawer />

    <!-- Binance Exchange Footer -->
    <Footer />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { apiService, API_BASE_URL } from './services/api'
import ThreeDBackgroundCanvas from './components/ThreeDBackgroundCanvas.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import MoodboardDrawer from './components/MoodboardDrawer.vue'
import UserDashboard from './components/UserDashboard.vue'
import AuthModal from './components/AuthModal.vue'
import TokenBuyModal from './components/TokenBuyModal.vue'
import SocialHub from './components/SocialHub.vue'
import socket from './socket'

const Swal = window.Swal

const currentUser = ref(null)
const showDashboard = ref(false)
const showTokenModal = ref(false)
const balance = ref(1500)
const tokens = ref(2500)
const cryptoBalance = ref(0.2450)
const betSlip = ref([])
const globalMatches = ref([])
const userCount = ref(142)
const chatMessages = ref([])
const recentPublicBets = ref([])
const showAuthModal = ref(false)
const onlineUsers = ref([])

// Fetch Real Live Sports Data from ESPN API
const fetchRealEspnMatches = async () => {
  try {
    const leagues = [
      { name: 'NBA (USA)', url: 'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard', emoji: '🏀' },
      { name: 'EPL (UK)', url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/eng.1/scoreboard', emoji: '⚽' },
      { name: 'MLB (USA)', url: 'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard', emoji: '⚾' },
      { name: 'LA LIGA (SPAIN)', url: 'https://site.api.espn.com/apis/site/v2/sports/soccer/esp.1/scoreboard', emoji: '⚽' }
    ]

    const allGames = []

    for (const leg of leagues) {
      try {
        const res = await axios.get(leg.url)
        if (res.data && res.data.events) {
          res.data.events.slice(0, 3).forEach(ev => {
            const comps = ev.competitions[0].competitors
            const homeComp = comps.find(c => c.homeAway === 'home') || comps[0]
            const awayComp = comps.find(c => c.homeAway === 'away') || comps[1]

            allGames.push({
              id: ev.id,
              league: leg.name,
              time: ev.status.type.detail || 'LIVE',
              home: homeComp.team.shortDisplayName || homeComp.team.name,
              homeEmoji: leg.emoji,
              homeScore: homeComp.score || '0',
              away: awayComp.team.shortDisplayName || awayComp.team.name,
              awayEmoji: leg.emoji,
              awayScore: awayComp.score || '0',
              odds: {
                home: (1.30 + Math.random() * 1.5).toFixed(2),
                draw: leg.emoji === '⚽' ? (2.80 + Math.random() * 1.2).toFixed(2) : '-',
                away: (1.50 + Math.random() * 2.0).toFixed(2)
              }
            })
          })
        }
      } catch (err) {}
    }

    if (allGames.length > 0) {
      globalMatches.value = allGames
    }
  } catch (err) {
    console.warn("ESPN live sports fetch failed", err)
  }
}

onMounted(() => {
  const storedUser = localStorage.getItem('user')
  if (storedUser) {
    handleLoginSuccess(JSON.parse(storedUser))
  }

  fetchRealEspnMatches()
  setInterval(fetchRealEspnMatches, 8000)

  socket.on('userCountUpdate', (count) => userCount.value = count)
  socket.on('initialMatches', (data) => {
    if (!globalMatches.value.length) globalMatches.value = data
  })
  socket.on('allMatchesUpdate', (data) => {
    if (!globalMatches.value.length) globalMatches.value = data
  })
  socket.on('initialMessages', (msgs) => chatMessages.value = msgs)
  socket.on('newMessage', (msg) => chatMessages.value.push(msg))
  socket.on('betBroadcast', (bet) => {
    recentPublicBets.value.unshift(bet)
    if (recentPublicBets.value.length > 5) recentPublicBets.value.pop()
  })
  
  socket.on('balanceUpdate', (data) => {
    balance.value = data.balance
    if (currentUser.value) {
      const user = JSON.parse(localStorage.getItem('user')) || {}
      user.balance = data.balance
      localStorage.setItem('user', JSON.stringify(user))
    }
  })
})

const handleLoginSuccess = (user) => {
  currentUser.value = user
  balance.value = user.balance !== undefined ? user.balance : 1500
  tokens.value = user.tokens || 2500
  cryptoBalance.value = user.cryptoBalance !== undefined ? user.cryptoBalance : 0.2450
  apiService.registerUserSocket(user)
  showAuthModal.value = false
}

const handleLogout = () => {
  currentUser.value = null
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  window.location.reload()
}

const handleBalanceUpdate = (newBalance) => {
  balance.value = newBalance
  if (currentUser.value) {
    const user = JSON.parse(localStorage.getItem('user')) || {}
    user.balance = newBalance
    localStorage.setItem('user', JSON.stringify(user))
  }
}

const handleTokenPurchase = (newTokens) => {
  tokens.value = newTokens
  showTokenModal.value = false
}

const handleSendMessage = (text) => {
  apiService.sendMessage(text, currentUser.value.username)
}

const addToSlip = (data) => {
  if (!currentUser.value) {
    showAuthModal.value = true
    return
  }
  const { match, type, odds } = data
  const selection = type === 'home' ? match.home : type === 'away' ? match.away : 'Draw'
  betSlip.value.push({
    id: Date.now(),
    match: `${match.home} vs ${match.away}`,
    selection,
    odds,
    stake: 100
  })
  showDashboard.value = true
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
      background: '#FFFFFF',
      color: '#1E2329',
      confirmButtonColor: '#FF7A00',
      timer: 3000
    })
  } else {
    Swal?.fire({
      title: 'Insufficient Balance',
      text: 'Please deposit funds to place bets.',
      icon: 'error',
      background: '#FFFFFF',
      color: '#1E2329',
      confirmButtonColor: '#FF7A00'
    })
  }
}

const handlePlaceCasinoBet = (wager) => {
  if (!currentUser.value) {
    showAuthModal.value = true
    return
  }
  if (tokens.value >= wager) {
    tokens.value -= wager
    const user = JSON.parse(localStorage.getItem('user')) || {}
    user.tokens = tokens.value
    localStorage.setItem('user', JSON.stringify(user))
  } else {
    showTokenModal.value = true
  }
}

const handleClaimBonus = async () => {
  if (!currentUser.value) {
    showAuthModal.value = true
    return
  }
  const { value: accountNumber } = await Swal?.fire({
    title: 'Link Crypto / Bank Account',
    text: 'Please enter your account number or wallet address to claim your $100 VIP Bonus instantly.',
    input: 'text',
    inputPlaceholder: 'Enter Account or Wallet Address',
    background: '#FFFFFF',
    color: '#1E2329',
    confirmButtonColor: '#FF7A00',
    showCancelButton: true
  }) || {}

  if (accountNumber) {
    balance.value += 100
    Swal?.fire({
      title: '👑 VIP BONUS CLAIMED!',
      html: `<p style="color:#5A6270">$100 has been verified and deposited instantly!</p>`,
      icon: 'success',
      background: '#FFFFFF',
      color: '#1E2329',
      confirmButtonColor: '#FF7A00'
    })
  }
}
</script>
