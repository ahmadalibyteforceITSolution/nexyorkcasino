<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in slide-in-from-bottom-10 duration-700">
    <header class="mb-12">
      <h1 class="text-5xl font-black font-outfit uppercase">Global <span class="text-gradient">Live Arena</span></h1>
      <p class="text-gray-500 text-xs font-black uppercase tracking-[0.3em] mt-2">Streaming real-time global games</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div v-for="match in matches" :key="match.id" class="glass p-8 rounded-[30px] flex flex-col justify-between gap-6 hover:border-primary/30 transition-all group bg-dark-card border-t-4" :class="match.odds.draw === '-' ? 'border-t-primary' : 'border-t-green-500'">
        
        <div class="flex justify-between items-center gap-4">
          <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
            <div class="w-16 h-16 bg-white/5 rounded-full mb-4 flex items-center justify-center text-3xl shadow-2xl">
              <i :class="match.odds.draw === '-' ? 'fa-solid fa-basketball text-primary' : 'fa-solid fa-futbol text-white'"></i>
            </div>
            <div class="font-black text-sm text-center w-full truncate px-1 text-white">{{ match.home }}</div>
          </div>
          
          <div class="px-6 py-3 bg-black/60 rounded-2xl border border-white/5 flex flex-col items-center justify-center min-w-[120px]">
            <div class="text-2xl md:text-3xl font-black text-white whitespace-nowrap">{{ match.homeScore }} <span class="text-gray-600 text-lg mx-2">-</span> {{ match.awayScore }}</div>
            <div class="text-[9px] text-primary font-black uppercase tracking-[0.2em] mt-2">{{ match.league }} • {{ match.time }}</div>
          </div>
          
          <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
            <div class="w-16 h-16 bg-white/5 rounded-full mb-4 flex items-center justify-center text-3xl shadow-2xl">
              <i :class="match.odds.draw === '-' ? 'fa-solid fa-basketball text-primary' : 'fa-solid fa-futbol text-white'"></i>
            </div>
            <div class="font-black text-sm text-center w-full truncate px-1 text-white">{{ match.away }}</div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 pt-4 border-t border-white/5">
          <button @click="$emit('add-to-slip', { match, type: 'home', odds: match.odds.home })" class="bg-white/5 py-4 rounded-2xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center">
            <div class="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Home</div>
            <div class="font-black text-lg" :class="parseFloat(match.odds.home) > 2 ? 'text-green-500' : 'text-white'">{{ match.odds.home }}</div>
          </button>
          <button @click="$emit('add-to-slip', { match, type: 'draw', odds: match.odds.draw })" :disabled="match.odds.draw === '-'" class="bg-white/5 py-4 rounded-2xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-white/5 flex flex-col items-center">
            <div class="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Draw</div>
            <div class="font-black text-lg text-white">{{ match.odds.draw }}</div>
          </button>
          <button @click="$emit('add-to-slip', { match, type: 'away', odds: match.odds.away })" class="bg-white/5 py-4 rounded-2xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center">
            <div class="text-[10px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Away</div>
            <div class="font-black text-lg" :class="parseFloat(match.odds.away) > 2 ? 'text-green-500' : 'text-white'">{{ match.odds.away }}</div>
          </button>
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  matches: Array
})
defineEmits(['add-to-slip'])
</script>
