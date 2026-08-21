<template>
  <section 
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave"
    class="relative min-h-[90vh] flex flex-col items-center justify-center pt-20 md:pt-28 pb-16 px-4 text-center overflow-hidden perspective-3d select-none"
  >
    <!-- Background Visual Backdrop -->
    <div class="absolute inset-0 -z-10 overflow-hidden">
      <img :src="currentBg" class="w-full h-full object-cover opacity-15 transition-all duration-1000 scale-105 blur-[1px]" alt="Binance Luxury Backdrop">
      <div class="absolute inset-0 bg-gradient-to-b from-[#FAF8F5]/80 via-transparent to-[#FAF8F5]"></div>
    </div>

    <!-- Floating 3D Orbs -->
    <div class="orb w-[600px] h-[600px] top-[-100px] left-[-100px] bg-orange-300/25 animate-float-3d"></div>
    <div class="orb w-[500px] h-[500px] bottom-[-100px] right-[-100px] bg-amber-200/30 animate-float-3d" style="animation-delay: -2.5s;"></div>
    
    <!-- Main 3D Card Content Container -->
    <div 
      class="max-w-6xl space-y-8 relative z-10 transition-transform duration-200 ease-out"
      :style="{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }"
    >
      <div class="inline-flex items-center gap-3 bg-white/90 border border-orange-200/80 px-6 py-2.5 rounded-full text-xs font-black text-[#FF7A00] tracking-[0.25em] uppercase shadow-[0_4px_20px_rgba(255,122,0,0.12)] backdrop-blur-md">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A00] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF7A00]"></span>
        </span>
        BINANCE POWERED CRYPTO CASINO & SPOT EXCHANGE
      </div>
      
      <!-- 3D Title -->
      <h1 class="font-outfit text-6xl md:text-[8.5rem] font-black leading-[0.88] tracking-tighter text-[#1A202C] drop-shadow-sm">
        NEX<span class="text-gradient">YORK</span><br>
        <span class="text-2xl md:text-5xl font-light tracking-[0.4em] text-[#718096] uppercase">3D ELITE ARENA</span>
      </h1>
      
      <p class="text-[#4A5568] text-base md:text-xl max-w-3xl mx-auto leading-relaxed font-normal">
        Trade real-time crypto, earn <span class="text-[#FF7A00] font-black underline decoration-orange-300 underline-offset-4">20% lifetime affiliate commissions</span>, and play high-stakes 3D live casino games in New York.
      </p>
      
      <!-- Interactive 3D Buttons -->
      <div class="flex flex-col sm:flex-row gap-5 justify-center pt-6">
        <router-link to="/arena" class="btn-primary text-base px-10 group flex items-center justify-center">
          ENTER 3D ARENA
          <span class="inline-block transition-transform group-hover:translate-x-2 ml-2 font-black">➜</span>
        </router-link>
        <router-link to="/earn" class="bg-white/95 px-10 py-4 rounded-2xl font-black text-[#FF7A00] hover:bg-orange-50 transition-all flex items-center justify-center gap-3 border border-orange-200 shadow-[0_4px_20px_rgba(255,122,0,0.08)] hover:scale-103">
          <span>💰</span> EARN 20% COMMISSIONS
        </router-link>
      </div>
    </div>

    <!-- Floating 3D Gold Coin Emblem Visual -->
    <div class="absolute bottom-12 right-12 z-20 pointer-events-none hidden xl:block animate-float-3d">
      <div class="w-36 h-36 rounded-full border-4 border-orange-200 bg-gradient-to-br from-[#FF9E44] via-[#FF7A00] to-[#E65100] flex flex-col items-center justify-center text-white shadow-[0_15px_40px_rgba(255,122,0,0.35)] transform rotate-12">
        <div class="text-3xl font-black">₿</div>
        <div class="text-[8px] font-black tracking-widest uppercase mt-1">SAFU VAULT</div>
      </div>
    </div>
    
    <!-- Hero Live Winner Avatars -->
    <div class="mt-16 w-full max-w-5xl px-4 relative z-10">
      <div class="flex flex-wrap justify-center gap-5">
        <div v-for="user in liveVips" :key="user.name" class="flex items-center gap-3.5 bg-white/90 p-2.5 pr-6 rounded-full border border-orange-200/80 shadow-sm hover:shadow-md hover:scale-103 transition-all">
          <img :src="user.avatar" class="w-10 h-10 rounded-full object-cover border-2 border-[#FF7A00]" alt="VIP">
          <div class="text-left">
            <div class="text-[9px] font-black text-emerald-600 uppercase tracking-widest">VERIFIED WINNER</div>
            <div class="text-xs font-black text-[#1A202C]">{{ user.name }} • <span class="text-[#FF7A00]">${{ user.win }}</span></div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const rotX = ref(0)
const rotY = ref(0)

const bgImages = [
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1920&auto=format&fit=crop"
];

const currentBg = ref(bgImages[0]);

const liveVips = [
  { name: 'Alex_Crypto', win: '4,850', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop' },
  { name: 'Elena_V', win: '2,120', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&auto=format&fit=crop' },
  { name: 'Sophia_X', win: '6,400', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }
];

const handleMouseMove = (e) => {
  const rect = e.currentTarget.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  rotX.value = -y * 0.015
  rotY.value = x * 0.015
}

const handleMouseLeave = () => {
  rotX.value = 0
  rotY.value = 0
}

onMounted(() => {
  let i = 0;
  setInterval(() => {
    i = (i + 1) % bgImages.length;
    currentBg.value = bgImages[i];
  }, 5000);
});

defineEmits(['claim-bonus'])
</script>
