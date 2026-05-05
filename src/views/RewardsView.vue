<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in fade-in duration-1000">
    <header class="mb-16 text-center relative">
      <div class="absolute -top-10 left-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-[100px] -z-10"></div>
      <h1 class="text-7xl md:text-8xl font-black font-outfit uppercase tracking-tighter leading-none">THE <span class="text-gradient">ELITE</span> PERKS</h1>
      <p class="text-gray-500 text-[10px] font-black uppercase tracking-[0.5em] mt-6">Where your loyalty meets our legacy</p>
    </header>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
      <!-- Left: VIP Tiers -->
      <div class="lg:col-span-1 space-y-4">
        <h3 class="text-xs font-black uppercase tracking-[0.3em] mb-6 text-gray-500 pl-4">Your Standing</h3>
        <div v-for="tier in tiers" :key="tier.name" 
          :class="['glass p-6 rounded-[30px] border transition-all duration-500 flex items-center justify-between group', 
                   currentTier === tier.name ? 'border-primary bg-primary/10 scale-105 z-10' : 'border-white/5 opacity-40 grayscale hover:opacity-60 hover:grayscale-0']">
          <div class="flex items-center gap-4">
            <div :class="['w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-inner', tier.color]">
              <i :class="tier.icon"></i>
            </div>
            <div>
              <div class="text-[10px] font-black uppercase tracking-widest text-gray-500">{{ tier.subtitle }}</div>
              <div class="text-lg font-black uppercase tracking-tight">{{ tier.name }}</div>
            </div>
          </div>
          <div v-if="currentTier === tier.name" class="w-2 h-2 bg-primary rounded-full animate-pulse shadow-[0_0_10px_#ffbb33]"></div>
        </div>
      </div>

      <!-- Center: Daily Reward (Interactive) -->
      <div class="lg:col-span-2">
        <div class="glass p-12 md:p-20 rounded-[60px] text-center border-primary/20 shadow-2xl relative overflow-hidden group">
          <div class="absolute top-0 right-0 p-10">
            <span class="bg-primary text-black text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest animate-bounce">READY TO OPEN</span>
          </div>
          
          <div class="relative z-10 mb-12">
            <div class="text-[100px] md:text-[140px] drop-shadow-[0_20px_50px_rgba(245,197,24,0.3)] transition-transform duration-700 group-hover:scale-110 cursor-pointer" @click="handleClaim">
              {{ isClaimed ? '💎' : '🎁' }}
            </div>
          </div>

          <h2 class="text-4xl md:text-5xl font-black mb-6 uppercase font-outfit tracking-tighter leading-none">
            {{ isClaimed ? 'REWARD SECURED' : 'DAILY GIFT BOX' }}
          </h2>
          <p class="text-gray-400 text-sm md:text-base mb-12 max-w-sm mx-auto leading-relaxed font-medium">
            {{ isClaimed ? 'Your vault has been updated. Return in 24 hours for your next luxury drop.' : 'Experience the rush of the unknown. Open your daily vault to claim instant USD or elite tokens.' }}
          </p>

          <div class="flex flex-col items-center gap-4">
            <button 
              @click="handleClaim" 
              :disabled="isClaimed"
              :class="['btn-primary px-20 py-6 text-sm uppercase tracking-[0.3em] font-black transition-all relative overflow-hidden group', 
                       isClaimed ? 'opacity-20 cursor-not-allowed' : 'hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(245,197,24,0.3)]']"
            >
              <span class="relative z-10">{{ isClaimed ? 'LOCKED FOR 24H' : 'OPEN THE VAULT' }}</span>
              <div class="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </button>
            <div class="text-[10px] text-gray-600 font-bold uppercase tracking-widest mt-4">Current Streak: <span class="text-primary">12 DAYS</span></div>
          </div>
        </div>

        <!-- Upcoming Rewards -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          <div v-for="i in 4" :key="i" class="glass p-6 rounded-[35px] opacity-40 border-dashed border border-white/10 flex flex-col items-center justify-center text-center group hover:border-primary/30 hover:opacity-100 transition-all cursor-not-allowed">
            <div class="text-2xl mb-3 group-hover:scale-110 transition-transform">🔒</div>
            <div class="text-[8px] font-black text-gray-500 uppercase tracking-widest leading-tight">Next Drop<br><span class="text-white">{{ i * 6 }}h 22m</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const Swal = window.Swal
const props = defineProps({
  currentUser: Object
})
const emit = defineEmits(['claim-bonus'])
const isClaimed = ref(false)
const currentTier = ref('GOLD')

const tiers = [
  { name: 'DIAMOND', subtitle: 'The Apex', icon: 'fa-solid fa-gem', color: 'bg-blue-500/20 text-blue-400' },
  { name: 'PLATINUM', subtitle: 'The Elite', icon: 'fa-solid fa-crown', color: 'bg-purple-500/20 text-purple-400' },
  { name: 'GOLD', subtitle: 'The Regular', icon: 'fa-solid fa-star', color: 'bg-primary/20 text-primary' },
  { name: 'SILVER', subtitle: 'The Rising', icon: 'fa-solid fa-shield', color: 'bg-gray-400/20 text-gray-400' },
  { name: 'BRONZE', subtitle: 'The Rookie', icon: 'fa-solid fa-medal', color: 'bg-orange-700/20 text-orange-600' },
]

const handleClaim = async () => {
  if (isClaimed.value) return
  
  if (!props.currentUser) {
    Swal.fire({
      title: 'AUTHENTICATION REQUIRED',
      text: 'Please log in to your NexYork account to claim elite rewards.',
      icon: 'warning',
      background: '#111',
      color: '#fff',
      confirmButtonColor: '#ffbb33',
      confirmButtonText: 'LOGIN NOW'
    })
    return
  }

  // Phase 1: Securing Connection
  Swal.fire({
    title: 'SECURING CONNECTION...',
    html: `
      <div class="space-y-6 py-4">
        <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p class="text-gray-400 text-xs uppercase tracking-widest animate-pulse">Establishing encrypted link to vault...</p>
      </div>
    `,
    background: '#000',
    showConfirmButton: false,
    timer: 2000,
    allowOutsideClick: false
  }).then(async () => {
    // Phase 2: Verification / Bank Account (Simulated or triggered)
    const { value: account } = await Swal.fire({
      title: 'VERIFY RECIPIENT',
      text: 'To ensure secure deposit, please confirm your linked bank account or ID.',
      input: 'text',
      inputPlaceholder: 'Enter verification code or account ending...',
      background: '#111',
      color: '#fff',
      confirmButtonColor: '#ffbb33',
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return 'Verification is required!'
      }
    })

    if (account) {
      // Phase 3: Processing Transaction
      Swal.fire({
        title: 'PROCESSING TRANSACTION',
        html: `
          <div class="space-y-4">
            <div class="h-1 bg-white/10 rounded-full overflow-hidden">
              <div class="h-full bg-primary animate-progress-fast"></div>
            </div>
            <p class="text-[10px] text-gray-500 uppercase tracking-widest">Finalizing secure deposit to wallet...</p>
          </div>
        `,
        background: '#000',
        showConfirmButton: false,
        timer: 2500,
        allowOutsideClick: false
      }).then(() => {
        isClaimed.value = true
        emit('claim-bonus')
        
        // Phase 4: Detailed Success Receipt
        const txId = 'TX-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        Swal.fire({
          title: 'TRANSACTION SUCCESS',
          html: `
            <div class="glass p-6 rounded-2xl border border-white/5 text-left space-y-4 mt-4">
              <div class="flex justify-between items-center pb-2 border-b border-white/5">
                <span class="text-gray-500 text-[10px] uppercase font-black">Status</span>
                <span class="text-green-500 text-[10px] uppercase font-black">Completed</span>
              </div>
              <div class="flex justify-between items-center pb-2 border-b border-white/5">
                <span class="text-gray-500 text-[10px] uppercase font-black">Reward</span>
                <span class="text-white text-xs font-bold">5,000 CREDITS</span>
              </div>
              <div class="flex justify-between items-center pb-2 border-b border-white/5">
                <span class="text-gray-500 text-[10px] uppercase font-black">Asset</span>
                <span class="text-primary text-xs font-bold">ELITE PASS #772</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-500 text-[10px] uppercase font-black">Transaction ID</span>
                <span class="text-gray-300 text-[9px] font-mono">${txId}</span>
              </div>
            </div>
          `,
          icon: 'success',
          background: '#000',
          color: '#fff',
          confirmButtonColor: '#ffbb33',
          confirmButtonText: 'VIEW IN WALLET',
          customClass: {
            popup: 'glass rounded-[40px] border border-white/10'
          }
        })
      })
    }
  })
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #ffbb33 0%, #ff8800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
