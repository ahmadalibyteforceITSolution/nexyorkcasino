<template>
  <div class="fixed inset-0 z-[100] bg-dark flex flex-col md:flex-row overflow-hidden">
    <!-- Sidebar -->
    <aside class="w-full md:w-64 glass border-r border-white/5 p-6 flex flex-col justify-between">
      <div>
        <div class="font-outfit font-black text-2xl tracking-widest mb-10 text-gradient cursor-pointer" @click="$emit('close')">NEXYORK</div>
        <nav class="space-y-2">
          <button 
            v-for="item in menu" 
            :key="item.id" 
            @click="activeTab = item.id"
            class="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all font-bold text-sm" 
            :class="activeTab === item.id ? 'bg-primary text-black' : 'text-gray-400 hover:bg-white/5'"
          >
            <i v-if="item.id === 'dashboard'" class="fa-solid fa-chart-pie w-5 text-center"></i>
            <i v-if="item.id === 'live'" class="fa-solid fa-satellite-dish w-5 text-center"></i>
            <i v-if="item.id === 'history'" class="fa-solid fa-scroll w-5 text-center"></i>
            <i v-if="item.id === 'wallet'" class="fa-solid fa-wallet w-5 text-center"></i>
            {{ item.label }}
          </button>
        </nav>
      </div>
      
      <div class="space-y-4">
        <!-- User Profile -->
        <div class="bg-white/5 p-4 rounded-2xl border border-white/10 flex items-center gap-3">
          <div class="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-black uppercase">{{ user?.username?.[0] || 'U' }}</div>
          <div class="min-w-0">
            <div class="text-[10px] text-gray-500 font-bold uppercase truncate">Logged in as</div>
            <div class="text-sm font-black text-white truncate">{{ user?.username || 'Elite Player' }}</div>
          </div>
        </div>

        <!-- Live Users -->
        <div class="flex items-center gap-3 bg-green-500/5 p-3 rounded-xl border border-green-500/10">
          <div class="relative">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-ping absolute opacity-75"></div>
            <div class="w-2 h-2 bg-green-500 rounded-full relative"></div>
          </div>
          <div class="text-[9px] font-black text-green-500 uppercase tracking-widest">{{ userCount }} PLAYERS ACTIVE</div>
        </div>

        <div class="bg-white/5 p-4 rounded-2xl border border-white/10">
          <div class="text-[9px] text-gray-500 font-bold uppercase mb-1">CASH BALANCE</div>
          <div class="text-xl font-black text-primary">${{ balance.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto p-4 md:p-10 space-y-10 custom-scrollbar relative">
      <header class="flex justify-between items-center">
        <div>
          <h1 class="text-3xl font-black font-outfit uppercase">
            {{ activeTab === 'dashboard' ? `Welcome, ${user?.username || 'Player'}` : activeTab === 'live' ? 'Sports Feed' : activeTab === 'history' ? 'My Bets' : 'Payments & Withdrawal' }}
          </h1>
          <p class="text-gray-500 text-[10px] font-black uppercase tracking-widest mt-1">Real-time Data Synchronized via Google Global Feed</p>
        </div>
        <button @click="$emit('close')" class="w-10 h-10 rounded-full glass flex items-center justify-center font-bold hover:bg-red-500 transition-colors">✕</button>
      </header>

      <!-- Live Overview / Sports Feed -->
      <div v-if="activeTab === 'dashboard' || activeTab === 'live'" class="space-y-10">
        <div class="flex justify-between items-center border-b border-white/5 pb-4">
          <h2 class="text-xl font-black uppercase font-outfit">Active Global Games</h2>
          <div class="flex gap-4">
            <div v-for="winner in recentWinners" :key="winner.id" class="hidden lg:flex items-center gap-2 text-[10px] font-bold">
              <span class="text-green-500">WIN!</span>
              <span class="text-white">{{ winner.user }}</span>
              <span class="text-primary">+${{ winner.amount }}</span>
            </div>
          </div>
        </div>

        <!-- Stock Exchange Ticker -->
        <div class="bg-black/50 border border-white/5 py-2 px-4 rounded-xl flex items-center overflow-hidden mb-6">
          <span class="text-primary font-black text-[10px] tracking-widest mr-4 whitespace-nowrap">MARKET TICKER</span>
          <div class="flex-1 overflow-hidden relative">
            <div class="animate-marquee whitespace-nowrap text-xs font-bold text-gray-400 flex gap-8">
              <span v-for="match in matches" :key="match.id">
                <span class="text-white">{{ match.home }}</span> vs <span class="text-white">{{ match.away }}</span> 
                <span :class="parseFloat(match.odds.home) > 2 ? 'text-green-500' : 'text-red-500'">H:{{ match.odds.home }}</span> 
                <span :class="parseFloat(match.odds.away) > 2 ? 'text-green-500' : 'text-red-500'">A:{{ match.odds.away }}</span>
              </span>
            </div>
          </div>
        </div>

        <!-- Matches Grid -->
        <div v-if="matches.length > 0" class="grid grid-cols-1 gap-4">
          <div v-for="match in matches" :key="match.id" class="glass p-5 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:border-primary/20 transition-all group bg-dark-card border-l-4" :class="match.odds.draw === '-' ? 'border-l-primary' : 'border-l-green-500'">
            <div class="flex items-center gap-4 flex-1">
              <div class="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-xl group-hover:bg-primary/10 transition-colors">{{ match.homeEmoji }}</div>
              <div class="flex-1 min-w-0">
                <div class="font-bold text-sm uppercase tracking-tight text-white">{{ match.home }} <span class="text-gray-500 mx-2">VS</span> {{ match.away }}</div>
                <div class="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1"><span class="text-primary">{{ match.league }}</span> • {{ match.time }}</div>
              </div>
            </div>
            
            <div class="text-2xl font-black font-outfit tracking-tighter w-32 text-center bg-black/40 py-2 rounded-lg border border-white/5 text-white">
              {{ match.homeScore }} <span class="text-gray-600">-</span> {{ match.awayScore }}
            </div>
            
            <div class="flex gap-2 w-full md:w-auto">
              <button @click="$emit('add-to-slip', { match, type: 'home', odds: match.odds.home })" class="flex-1 md:w-16 py-3 bg-white/5 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center justify-center">
                <span class="text-[8px] font-bold text-gray-500 uppercase mb-1">HOME</span>
                <span class="text-sm font-black" :class="parseFloat(match.odds.home) > 2 ? 'text-green-500' : 'text-red-500'">{{ match.odds.home }}</span>
              </button>
              
              <button @click="$emit('add-to-slip', { match, type: 'draw', odds: match.odds.draw })" :disabled="match.odds.draw === '-'" class="flex-1 md:w-16 py-3 bg-white/5 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center justify-center disabled:opacity-30">
                <span class="text-[8px] font-bold text-gray-500 uppercase mb-1">DRAW</span>
                <span class="text-sm font-black">{{ match.odds.draw }}</span>
              </button>
              
              <button @click="$emit('add-to-slip', { match, type: 'away', odds: match.odds.away })" class="flex-1 md:w-16 py-3 bg-white/5 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center justify-center">
                <span class="text-[8px] font-bold text-gray-500 uppercase mb-1">AWAY</span>
                <span class="text-sm font-black" :class="parseFloat(match.odds.away) > 2 ? 'text-green-500' : 'text-red-500'">{{ match.odds.away }}</span>
              </button>
            </div>
          </div>
        </div>
        <div v-else class="h-64 flex flex-col items-center justify-center text-center glass rounded-3xl opacity-50 border-dashed border-2 border-white/10">
          <i class="fa-solid fa-satellite-dish text-5xl mb-4 animate-pulse text-primary"></i>
          <div class="text-xs font-black uppercase tracking-widest">Connecting to Global Exchange...</div>
        </div>
      </div>

      <!-- My Bets History -->
      <div v-if="activeTab === 'history'" class="space-y-6">
        <div v-if="betHistory.length > 0" class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div v-for="bet in betHistory" :key="bet.id" class="glass p-6 rounded-3xl border-l-4" :class="bet.status === 'win' ? 'border-green-500' : bet.status === 'pending' ? 'border-primary' : 'border-red-500'">
            <div class="flex justify-between items-start mb-4">
              <div>
                <div class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">{{ new Date(bet.createdAt).toLocaleDateString() }}</div>
                <div class="font-bold text-lg">{{ bet.match }}</div>
              </div>
              <span class="px-3 py-1 rounded-full text-[10px] font-black uppercase" :class="bet.status === 'win' ? 'bg-green-500/20 text-green-500' : bet.status === 'pending' ? 'bg-primary/20 text-primary' : 'bg-red-500/20 text-red-500'">{{ bet.status }}</span>
            </div>
            <div class="flex justify-between items-end">
              <div>
                <div class="text-[9px] text-gray-500 font-bold uppercase mb-1">Pick: {{ bet.selection }} @ {{ bet.odds }}</div>
                <div class="text-xs text-gray-400 uppercase font-bold tracking-widest">Stake: ${{ bet.stake }}</div>
              </div>
              <div class="text-xl font-black" :class="bet.status === 'win' ? 'text-green-500' : 'text-gray-600'">
                {{ bet.status === 'win' ? '+$' + (bet.stake * bet.odds).toFixed(2) : '-$' + bet.stake }}
              </div>
            </div>
          </div>
        </div>
        <div v-else class="h-64 flex flex-col items-center justify-center text-center glass rounded-3xl opacity-50 border-dashed border-2 border-white/10">
          <i class="fa-solid fa-scroll text-5xl mb-4 text-gray-500"></i>
          <div class="text-xs font-black uppercase tracking-widest">No betting history found</div>
        </div>
      </div>

      <!-- Payments / Withdrawal -->
      <div v-if="activeTab === 'wallet'" class="max-w-xl mx-auto space-y-10 py-10">
        <div class="glass p-10 rounded-[40px] border-primary/20">
          <h2 class="text-2xl font-black mb-8 uppercase text-center">Withdraw to Bank</h2>
          <div class="space-y-6">
            <div>
              <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Account Holder Name</label>
              <input v-model="withdrawForm.accountName" type="text" placeholder="e.g. ALEXANDER VIP" class="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 font-bold outline-none focus:border-primary transition-all uppercase">
            </div>
            <div>
              <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Bank Name</label>
              <input v-model="withdrawForm.bankName" type="text" placeholder="e.g. Chase, Bank of America" class="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 font-bold outline-none focus:border-primary transition-all">
            </div>
            <div>
              <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Account Number (IBAN)</label>
              <input v-model="withdrawForm.accountNumber" type="text" placeholder="US00 0000 0000 0000" class="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 font-bold outline-none focus:border-primary transition-all">
            </div>
            <div>
              <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Withdrawal Amount</label>
              <div class="relative">
                <input v-model="withdrawForm.amount" type="number" placeholder="Min. $100" class="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-2xl text-primary pl-10">
                <span class="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-black text-gray-400">$</span>
              </div>
            </div>
            <button @click="handleWithdraw" :disabled="isWithdrawing" class="btn-primary w-full py-5 text-lg uppercase tracking-widest mt-4">
              {{ isWithdrawing ? 'Processing...' : 'Initiate Bank Transfer' }}
            </button>
          </div>
        </div>
        <p class="text-center text-[10px] text-gray-500 font-bold uppercase tracking-widest">Withdrawals are processed within 2-4 business hours.</p>
      </div>
    </main>

    <!-- Bet Slip -->
    <aside class="hidden xl:block w-80 glass p-8 border-l border-white/5 flex flex-col">
      <div class="flex justify-between items-center mb-8">
        <h3 class="font-black text-lg uppercase font-outfit">Bet Slip</h3>
        <span class="bg-primary/20 text-primary px-2 py-1 rounded text-[10px] font-black">{{ betSlip.length }} ACTIVE</span>
      </div>
      
      <div class="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
        <div v-if="betSlip.length === 0" class="h-64 flex flex-col items-center justify-center text-center opacity-20">
          <i class="fa-solid fa-building-columns text-6xl mb-4 text-gray-500"></i>
          <div class="text-xs font-bold uppercase tracking-widest">No selections<br>Ready to win? Select odds</div>
        </div>
        
        <div v-for="bet in betSlip" :key="bet.id" class="bg-white/5 p-4 rounded-xl border border-white/10 relative group">
          <button @click="$emit('remove-bet', bet.id)" class="absolute top-2 right-2 text-gray-600 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100">✕</button>
          <div class="text-[9px] font-black text-primary mb-1 uppercase tracking-tighter">{{ bet.match }}</div>
          <div class="font-bold text-sm">{{ bet.selection }}</div>
          <div class="flex justify-between items-center mt-3">
            <div class="text-xs text-gray-400">Odds: <span class="text-white font-bold">{{ bet.odds }}</span></div>
            <div class="text-xs text-white font-black">$100.00</div>
          </div>
        </div>
      </div>

      <div class="mt-8 pt-8 border-t border-white/10 space-y-4">
        <div class="flex justify-between font-black text-lg">
          <span class="text-gray-500">Potential Return</span>
          <span class="text-primary">${{ (betSlip.reduce((acc, b) => acc + (100 * parseFloat(b.odds)), 0)).toLocaleString(undefined, { maximumFractionDigits: 2 }) }}</span>
        </div>
        <button @click="$emit('place-bet')" :disabled="betSlip.length === 0" class="btn-primary w-full py-4 uppercase tracking-widest text-xs disabled:opacity-30">Place All Bets</button>
      </div>
    </aside>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue'
import { apiService } from '../services/api'

const Swal = window.Swal

const props = defineProps({
  isOpen: Boolean,
  matches: Array,
  betSlip: Array,
  balance: Number,
  userCount: Number,
  user: Object
})

const activeTab = ref('dashboard')
const isWithdrawing = ref(false)
const withdrawForm = reactive({
  accountName: '',
  bankName: '',
  accountNumber: '',
  amount: ''
})

const menu = [
  { id: 'dashboard', label: 'Live Overview', icon: '📊' },
  { id: 'live', label: 'Sports Feed', icon: '📡' },
  { id: 'history', label: 'My Bets', icon: '📜' },
  { id: 'wallet', label: 'Payments', icon: '💳' }
]

const recentWinners = [
  { id: 1, user: 'AhmedH', amount: '1,240' },
  { id: 2, user: 'JohnNY', amount: '450' },
  { id: 3, user: 'SaraP', amount: '2,100' }
]

const betHistory = ref([])

const fetchHistory = async () => {
  try {
    const res = await apiService.getMyBets()
    betHistory.value = res.data
  } catch (err) {
    console.error('Failed to fetch history:', err)
  }
}

watch(activeTab, (newTab) => {
  if (newTab === 'history') {
    fetchHistory()
  }
})

const handleWithdraw = async () => {
  if (!withdrawForm.accountName || !withdrawForm.accountNumber || !withdrawForm.amount) {
    return Swal?.fire({ title: 'Error', text: 'All fields are required!', icon: 'error', background: '#111', color: '#fff' })
  }
  if (!/^[A-Z0-9]{8,20}$/i.test(withdrawForm.accountNumber.trim())) {
    return Swal?.fire({ title: 'Error', text: 'Invalid Account Number. Must be 8-20 alphanumeric characters without spaces/dashes.', icon: 'error', background: '#111', color: '#fff' })
  }
  if (withdrawForm.amount < 100) {
    return Swal?.fire({ title: 'Error', text: 'Minimum withdrawal is $100', icon: 'error', background: '#111', color: '#fff' })
  }
  if (withdrawForm.amount > props.balance) {
    return Swal?.fire({ title: 'Error', text: 'Insufficient Balance', icon: 'error', background: '#111', color: '#fff' })
  }

  isWithdrawing.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await axios.post('http://localhost:5000/api/withdraw', {
      amount: withdrawForm.amount,
      method: `Bank Transfer (${withdrawForm.bankName}) - ${withdrawForm.accountNumber}`
    }, { headers: { 'x-auth-token': token } })

    const user = JSON.parse(localStorage.getItem('user'))
    user.balance = res.data.balance
    localStorage.setItem('user', JSON.stringify(user))

    Swal?.fire({
      title: 'Withdrawal Initiated',
      text: `Funds will be transferred to ${withdrawForm.bankName} within 2-4 hours.`,
      icon: 'success',
      background: '#111',
      color: '#fff',
      confirmButtonColor: '#F5C518'
    })
    
    withdrawForm.accountName = ''
    withdrawForm.bankName = ''
    withdrawForm.accountNumber = ''
    withdrawForm.amount = ''
  } catch (err) {
    Swal?.fire({ title: 'Error', text: err.response?.data?.error || 'Failed to withdraw', icon: 'error', background: '#111', color: '#fff' })
  } finally {
    isWithdrawing.value = false
  }
}
</script>

<style scoped>
@keyframes marquee {
  0% { transform: translateX(100%); }
  100% { transform: translateX(-100%); }
}
.animate-marquee {
  animation: marquee 20s linear infinite;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}
</style>
