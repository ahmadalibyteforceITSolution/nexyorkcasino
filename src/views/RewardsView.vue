<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in fade-in duration-1000 max-w-7xl font-outfit">
    <header class="mb-16 text-center relative">
      <div class="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200 px-4 py-1.5 rounded-full text-xs font-black text-[#FF7A00] tracking-widest uppercase mb-4 shadow-xs">
        <i class="fa-solid fa-crown"></i> VIP PLATINUM CASHBACK & PERKS
      </div>
      <h1 class="text-5xl md:text-8xl font-black font-outfit uppercase tracking-tighter leading-none text-[#1A202C]">
        THE <span class="text-gradient">ELITE</span> PERKS
      </h1>
      <p class="text-[#5A6474] text-xs font-black uppercase tracking-[0.4em] mt-4">Where your loyalty meets our legacy</p>
    </header>

    <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
      <!-- Left: VIP Tiers -->
      <div class="lg:col-span-1 space-y-4">
        <h3 class="text-xs font-black uppercase tracking-[0.3em] mb-4 text-[#718096] pl-2">Your VIP Standing</h3>
        <div 
          v-for="tier in tiers" 
          :key="tier.name" 
          :class="['p-6 rounded-[30px] border transition-all duration-500 flex items-center justify-between group shadow-sm', 
                   currentTier === tier.name ? 'border-orange-300 bg-orange-50/80 scale-103 shadow-md' : 'bg-white border-[#E2D9CE] opacity-60 hover:opacity-100']"
        >
          <div class="flex items-center gap-4">
            <div :class="['w-12 h-12 rounded-2xl flex items-center justify-center text-xl shadow-xs border border-orange-200', tier.color]">
              <i :class="tier.icon"></i>
            </div>
            <div>
              <div class="text-[10px] font-black uppercase tracking-widest text-[#718096]">{{ tier.subtitle }}</div>
              <div class="text-lg font-black uppercase tracking-tight text-[#1A202C]">{{ tier.name }}</div>
            </div>
          </div>
          <div v-if="currentTier === tier.name" class="w-2.5 h-2.5 bg-[#FF7A00] rounded-full animate-pulse shadow-xs"></div>
        </div>
      </div>

      <!-- Center: Daily Reward (Interactive) -->
      <div class="lg:col-span-2">
        <div class="bg-white p-12 md:p-16 rounded-[45px] text-center border border-orange-200 shadow-xl relative overflow-hidden group">
          <div class="absolute top-6 right-6">
            <span class="bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white text-[9px] font-black px-4 py-2 rounded-full uppercase tracking-widest animate-bounce shadow-xs">READY TO OPEN</span>
          </div>
          
          <div class="relative z-10 mb-8">
            <div class="text-[90px] md:text-[120px] drop-shadow-md transition-transform duration-700 group-hover:scale-110 cursor-pointer" @click="handleClaim">
              {{ isClaimed ? '💎' : '🎁' }}
            </div>
          </div>

          <h2 class="text-3xl md:text-5xl font-black mb-4 uppercase font-outfit tracking-tighter leading-none text-[#1A202C]">
            {{ isClaimed ? 'REWARD SECURED' : 'DAILY GIFT BOX' }}
          </h2>
          <p class="text-[#5A6474] text-sm md:text-base mb-10 max-w-sm mx-auto leading-relaxed font-medium">
            {{ isClaimed ? 'Your vault has been updated. Return in 24 hours for your next luxury drop.' : 'Experience the rush of the unknown. Open your daily vault to claim instant USD or elite tokens.' }}
          </p>

          <div class="flex flex-col items-center gap-4">
            <button 
              @click="handleClaim" 
              :disabled="isClaimed"
              :class="['btn-primary px-16 py-5 text-xs uppercase tracking-[0.25em] font-black transition-all relative overflow-hidden group cursor-pointer', 
                       isClaimed ? 'opacity-30 cursor-not-allowed' : 'hover:scale-103 active:scale-95 shadow-md']"
            >
              <span class="relative z-10">{{ isClaimed ? 'LOCKED FOR 24H' : 'OPEN THE VAULT' }}</span>
            </button>
            <div class="text-[10px] text-[#718096] font-bold uppercase tracking-widest mt-2">Current Streak: <span class="text-[#FF7A00] font-black">12 DAYS</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentTier = ref('Platinum')
const isClaimed = ref(false)

const emit = defineEmits(['balance-update'])

const props = defineProps({
  balance: Number
})

const tiers = [
  { name: 'Bronze', subtitle: 'Entry Tier', icon: 'fa-solid fa-shield text-amber-700', color: 'bg-amber-100/50' },
  { name: 'Silver', subtitle: 'Tier II (5% Rakeback)', icon: 'fa-solid fa-award text-slate-500', color: 'bg-slate-100' },
  { name: 'Gold', subtitle: 'Tier III (10% Rakeback)', icon: 'fa-solid fa-medal text-amber-500', color: 'bg-amber-100' },
  { name: 'Platinum', subtitle: 'VIP Elite (20% Rakeback)', icon: 'fa-solid fa-crown text-[#FF7A00]', color: 'bg-orange-100' }
]

const handleClaim = () => {
  if (isClaimed.value) return
  isClaimed.value = true
  const reward = Math.floor(Math.random() * 150) + 50
  if (props.balance !== undefined) {
    emit('balance-update', props.balance + reward)
  }
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: '💎 VAULT UNLOCKED!',
      text: `You have been awarded $${reward} VIP Bonus Funds!`,
      icon: 'success',
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00'
    })
  }
}
</script>
