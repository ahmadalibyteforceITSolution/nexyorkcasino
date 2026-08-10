<template>
  <section 
    @mousemove="handleMouseMove" 
    @mouseleave="handleMouseLeave"
    class="relative min-h-[92vh] flex flex-col items-center justify-center pt-24 md:pt-32 pb-16 px-4 text-center overflow-hidden perspective-3d select-none"
  >
    <!-- Background Visual Backdrop -->
    <div class="absolute inset-0 -z-10">
      <img :src="currentBg" class="w-full h-full object-cover brightness-[0.25] transition-all duration-1000 scale-110 blur-[2px]" alt="Binance Luxury Backdrop">
      <div class="absolute inset-0 bg-gradient-to-b from-[#0B0E11]/90 via-transparent to-[#0B0E11]"></div>
    </div>

    <!-- Floating 3D Orbs -->
    <div class="orb w-[600px] h-[600px] top-[-100px] left-[-100px] bg-[#F0B90B]/20 animate-float-3d"></div>
    <div class="orb w-[500px] h-[500px] bottom-[-100px] right-[-100px] bg-[#0ECB81]/15 animate-float-3d" style="animation-delay: -2.5s;"></div>
    
    <!-- Main 3D Card Content Container -->
    <div 
      class="max-w-6xl space-y-8 relative z-10 transition-transform duration-200 ease-out"
      :style="{ transform: `rotateX(${rotX}deg) rotateY(${rotY}deg)` }"
    >
      <div class="inline-flex items-center gap-3 bg-white/5 border border-[#F0B90B]/30 px-6 py-2 rounded-full text-xs font-black text-[#F0B90B] tracking-[0.3em] uppercase shadow-2xl backdrop-blur-md">
        <span class="relative flex h-2.5 w-2.5">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#F0B90B] opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#F0B90B]"></span>
        </span>
        BINANCE POWERED CRYPTO CASINO & SPOT EXCHANGE
      </div>
      
      <!-- 3D Title -->
      <h1 class="font-outfit text-7xl md:text-[11rem] font-black leading-[0.8] tracking-tighter drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
        NEX<span class="text-gradient">YORK</span><br>
        <span class="text-3xl md:text-5xl font-light tracking-[0.5em] text-gray-400 uppercase">3D ELITE ARENA</span>
      </h1>
      
      <p class="text-gray-300 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light drop-shadow-2xl">
        Trade real-time crypto, earn <span class="text-[#F0B90B] font-bold">20% lifetime affiliate commissions</span>, and play high-stakes 3D live casino games.
      </p>
      
      <!-- Interactive 3D Buttons -->
      <div class="flex flex-col sm:flex-row gap-6 justify-center pt-8">
        <router-link to="/arena" class="btn-primary text-lg px-12 group flex items-center justify-center shadow-[0_10px_40px_rgba(240,185,11,0.4)] hover:scale-105 transition-all">
          ENTER 3D ARENA
          <span class="inline-block transition-transform group-hover:translate-x-2 ml-2">➜</span>
        </router-link>
        <router-link to="/earn" class="glass px-12 py-4 rounded-2xl font-black text-white hover:bg-[#F0B90B] hover:text-black transition-all flex items-center justify-center gap-3 border-[#F0B90B]/40 hover:scale-105">
          <span>💰</span> EARN 20% COMMISSIONS
        </router-link>
      </div>
    </div>

    <!-- Floating 3D Gold Coin Emblem Visual -->
    <div class="absolute bottom-10 right-10 z-20 pointer-events-none hidden xl:block animate-float-3d">
      <div class="w-40 h-40 rounded-full border-4 border-[#F0B90B] bg-gradient-to-br from-[#F0B90B] via-yellow-600 to-[#F0B90B] flex flex-col items-center justify-center text-black shadow-[0_0_80px_rgba(240,185,11,0.6)] transform rotate-12">
        <div class="text-4xl font-black">₿</div>
        <div class="text-[9px] font-black tracking-widest uppercase mt-1">SAFU VAULT</div>
      </div>
    </div>
    
    <!-- Hero Live Winner Avatars -->
    <div class="mt-20 w-full max-w-6xl px-4 relative z-10">
      <div class="flex flex-wrap justify-center gap-6">
        <div v-for="user in liveVips" :key="user.name" class="flex items-center gap-4 glass p-3 pr-6 rounded-full border-[#F0B90B]/30 bg-[#161618]/80 hover:scale-105 transition-transform">
          <img :src="user.avatar" class="w-10 h-10 rounded-full object-cover border-2 border-[#F0B90B]" alt="VIP">
          <div class="text-left">
            <div class="text-[9px] font-black text-[#0ECB81] uppercase tracking-widest">REAL WINNER</div>
            <div class="text-xs font-bold text-white">{{ user.name }} • ${{ user.win }}</div>
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
