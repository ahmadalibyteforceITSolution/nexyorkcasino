<template>
  <section class="relative min-h-screen flex flex-col items-center justify-center pt-20 px-4 text-center overflow-hidden">
    <!-- Sexy Background Visuals -->
    <div class="absolute inset-0 -z-10">
      <img :src="currentBg" class="w-full h-full object-cover brightness-[0.3] transition-all duration-1000 scale-110 blur-[2px]" alt="Glamorous Backdrop">
      <div class="absolute inset-0 bg-gradient-to-b from-dark/80 via-transparent to-dark"></div>
    </div>

    <!-- Visual Orbs -->
    <div class="orb w-[600px] h-[600px] top-[-100px] left-[-100px] bg-primary/20"></div>
    <div class="orb w-[500px] h-[500px] bottom-[-100px] right-[-100px] bg-blue-500/10"></div>
    
    <div class="max-w-6xl space-y-8 relative z-10">
      <div class="inline-flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-2 rounded-full text-[10px] font-black text-primary tracking-[0.3em] uppercase">
        <span class="relative flex h-2 w-2">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
          <span class="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
        </span>
        LIVE IN NEW YORK CITY
      </div>
      
      <h1 class="font-outfit text-7xl md:text-[11rem] font-black leading-[0.8] tracking-tighter">
        NEX<span class="text-gradient">YORK</span><br>
        <span class="text-3xl md:text-5xl font-light tracking-[0.5em] text-gray-500 uppercase">Elite Arena</span>
      </h1>
      
      <p class="text-gray-200 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light drop-shadow-2xl">
        Experience the city's most <span class="text-primary font-bold">glamorous live-betting ecosystem</span>. 
        Where luxury meets the floor.
      </p>
      
      <div class="flex flex-col sm:flex-row gap-6 justify-center pt-8">
        <router-link to="/arena" class="btn-primary text-lg px-12 group flex items-center justify-center">
          START PLAYING
          <span class="inline-block transition-transform group-hover:translate-x-2 ml-2">➜</span>
        </router-link>
        <button @click="$emit('claim-bonus')" class="glass px-12 py-4 rounded-2xl font-black hover:bg-primary hover:text-black transition-all flex items-center gap-3">
          <span>👑</span> VIP BONUS $100
        </button>
      </div>
    </div>
    
    <!-- Glamorous VIP Host Interactive Element -->
    <div class="absolute bottom-0 right-10 z-20 pointer-events-none hidden xl:block opacity-90 transition-transform duration-1000 hover:scale-105 hover:opacity-100 pointer-events-auto cursor-pointer" title="Chat with VIP Host">
      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop" class="h-[75vh] object-cover object-top rounded-t-full border-t-8 border-primary/30 shadow-[0_0_100px_rgba(245,197,24,0.3)]" style="-webkit-mask-image: linear-gradient(to top, transparent 2%, black 30%);" alt="VIP Host">
      <div class="absolute bottom-20 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap border-primary text-primary shadow-2xl animate-pulse">
        VIP Host Online 🟢
      </div>
    </div>
    
    <!-- Hero Social Proof with Glamorous Avatars -->
    <div class="mt-24 w-full max-w-6xl px-4">
      <div class="flex flex-wrap justify-center gap-10">
        <div v-for="user in liveVips" :key="user.name" class="flex items-center gap-4 glass p-3 pr-8 rounded-full border-primary/20">
          <img :src="user.avatar" class="w-12 h-12 rounded-full object-cover border-2 border-primary" alt="VIP">
          <div class="text-left">
            <div class="text-[10px] font-black text-primary uppercase tracking-widest">LIVE WINNER</div>
            <div class="text-xs font-bold">{{ user.name }} • ${{ user.win }}</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bgImages = [
  "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=1920&auto=format&fit=crop"
];

const currentBg = ref(bgImages[0]);

const liveVips = [
  { name: 'Bella_NY', win: '2,400', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=200&auto=format&fit=crop' },
  { name: 'Elena_V', win: '1,850', avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?q=80&w=200&auto=format&fit=crop' },
  { name: 'Sophia_X', win: '4,100', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop' }
];

onMounted(() => {
  let i = 0;
  setInterval(() => {
    i = (i + 1) % backgrounds.length;
    currentBg.value = backgrounds[i];
  }, 5000);
});

defineEmits(['claim-bonus'])
</script>
