<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in fade-in duration-1000">
    <header class="mb-16 text-center">
      <h1 class="text-6xl font-black font-outfit uppercase tracking-tighter">VIP <span class="text-gradient">REWARDS</span></h1>
      <p class="text-gray-500 text-xs font-black uppercase tracking-[0.4em] mt-4">Daily gifts and exclusive bonuses for active gladiators</p>
    </header>

    <div class="max-w-3xl mx-auto">
      <div class="glass p-16 rounded-[60px] text-center border-primary/20 shadow-2xl relative overflow-hidden group">
        <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <div class="text-8xl mb-10 animate-bounce">🎁</div>
        <h2 class="text-4xl font-black mb-6 uppercase font-outfit tracking-tight">DAILY GIFT READY</h2>
        <p class="text-gray-400 text-lg mb-12 max-w-sm mx-auto leading-relaxed">
          Open your daily gift box to receive an instant boost to your USD balance.
        </p>
        <button 
          @click="$emit('claim-bonus')" 
          class="btn-primary px-20 py-6 text-lg uppercase tracking-[0.2em] relative z-10"
        >
          CLAIM MY GIFT
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        <div v-for="i in 3" :key="i" class="glass p-8 rounded-[40px] opacity-30 grayscale border-dashed border-2 border-white/10 flex flex-col items-center justify-center text-center">
          <div class="text-3xl mb-4">🔒</div>
          <div class="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-loose">Unlocks in {{ i * 6 }} Hours</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineEmits(['claim-bonus'])
</script>
