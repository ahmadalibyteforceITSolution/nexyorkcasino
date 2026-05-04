<template>
  <section id="sports" class="py-24 container mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <h2 class="font-outfit text-4xl font-black mb-2">LIVE <span class="text-primary">SPORTS</span> TRACKER</h2>
        <p class="text-gray-400">Real-time global match tracking with instant betting options.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="match in matches" :key="match.id" class="glass rounded-3xl overflow-hidden hover:border-primary/30 transition-all group bg-dark-card border-t-2" :class="match.odds.draw === '-' ? 'border-t-primary' : 'border-t-green-500'">
        <div class="bg-primary/5 px-6 py-3 flex justify-between items-center border-b border-white/5">
          <span class="text-[10px] font-black animate-pulse flex items-center gap-1" :class="match.odds.draw === '-' ? 'text-primary' : 'text-green-500'"><i class="fa-solid fa-circle text-[6px]"></i> LIVE {{ match.time }}</span>
          <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{{ match.league }}</span>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center gap-2">
            <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
              <div class="w-12 h-12 bg-white/5 rounded-full mb-3 flex items-center justify-center text-xl">
                <i :class="match.odds.draw === '-' ? 'fa-solid fa-basketball text-primary' : 'fa-solid fa-futbol text-white'"></i>
              </div>
              <div class="font-bold text-xs text-center w-full truncate px-1 text-white">{{ match.home }}</div>
            </div>
            
            <div class="px-4 py-2 bg-black/50 rounded-xl border border-white/5 flex flex-col items-center justify-center min-w-[100px]">
              <div class="text-lg md:text-xl font-black text-white whitespace-nowrap">{{ match.homeScore }} <span class="text-gray-600 text-sm mx-1">-</span> {{ match.awayScore }}</div>
            </div>
            
            <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
              <div class="w-12 h-12 bg-white/5 rounded-full mb-3 flex items-center justify-center text-xl">
                <i :class="match.odds.draw === '-' ? 'fa-solid fa-basketball text-primary' : 'fa-solid fa-futbol text-white'"></i>
              </div>
              <div class="font-bold text-xs text-center w-full truncate px-1 text-white">{{ match.away }}</div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
            <button 
              @click="$emit('add-to-slip', { match, type: 'home', odds: match.odds.home })"
              class="bg-white/5 py-3 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center"
            >
              <div class="text-[9px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Home</div>
              <div class="font-black text-sm" :class="parseFloat(match.odds.home) > 2 ? 'text-green-500' : 'text-white'">{{ match.odds.home }}</div>
            </button>
            <button 
              @click="$emit('add-to-slip', { match, type: 'draw', odds: match.odds.draw })"
              :disabled="match.odds.draw === '-'"
              class="bg-white/5 py-3 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-white/5 flex flex-col items-center"
            >
              <div class="text-[9px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Draw</div>
              <div class="font-black text-sm text-white">{{ match.odds.draw }}</div>
            </button>
            <button 
              @click="$emit('add-to-slip', { match, type: 'away', odds: match.odds.away })"
              class="bg-white/5 py-3 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center"
            >
              <div class="text-[9px] text-gray-500 font-bold mb-1 uppercase tracking-widest">Away</div>
              <div class="font-black text-sm" :class="parseFloat(match.odds.away) > 2 ? 'text-green-500' : 'text-white'">{{ match.odds.away }}</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
defineProps({
  matches: Array
})
defineEmits(['add-to-slip'])
</script>
