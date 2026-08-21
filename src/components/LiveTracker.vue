<template>
  <section id="sports" class="py-20 container mx-auto px-4 max-w-7xl">
    <div class="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
      <div>
        <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-[#FF7A00] font-black text-xs tracking-widest uppercase mb-3">
          <i class="fa-solid fa-satellite-dish"></i> ESPN LIVE FEEDS
        </div>
        <h2 class="font-outfit text-3xl md:text-5xl font-black text-[#1A202C]">
          LIVE <span class="text-gradient">SPORTS</span> TRACKER
        </h2>
        <p class="text-[#5A6474] text-sm mt-1">Real-time global match tracking with instant high-liquidity betting options.</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div 
        v-for="match in matches" 
        :key="match.id" 
        class="bg-white rounded-3xl overflow-hidden border border-[#EAE2D7] hover:border-orange-300 transition-all group shadow-sm hover:shadow-xl border-t-4" 
        :class="getBorderColor(match)"
      >
        <div class="bg-[#FFF9F3] px-6 py-3 flex justify-between items-center border-b border-[#EFE8DF]">
          <span class="text-[10px] font-black animate-pulse flex items-center gap-1.5 text-[#FF7A00]">
            <i class="fa-solid fa-circle text-[7px]"></i> LIVE {{ match.time }}
          </span>
          <span class="text-[9px] text-[#718096] font-black uppercase tracking-widest">{{ match.league }}</span>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center gap-2">
            <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
              <div class="w-14 h-14 bg-orange-50/80 rounded-2xl mb-3 flex items-center justify-center text-2xl group-hover:bg-orange-100 transition-colors border border-orange-100 shadow-xs">
                <i :class="getSportIcon(match.homeEmoji)"></i>
              </div>
              <div class="font-black text-xs text-center w-full truncate px-1 text-[#1A202C] uppercase tracking-tight">{{ match.home }}</div>
            </div>
            
            <div class="px-4 py-3 bg-[#1A202C] rounded-2xl border border-gray-700 flex flex-col items-center justify-center min-w-[100px] shadow-md">
              <div class="text-xl md:text-2xl font-black text-white tracking-tighter tabular-nums">{{ match.homeScore }} <span class="text-[#FF7A00] mx-1">:</span> {{ match.awayScore }}</div>
              <div class="text-[8px] text-[#FFA15C] font-bold uppercase tracking-[0.2em] mt-0.5">Live Score</div>
            </div>
            
            <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
              <div class="w-14 h-14 bg-orange-50/80 rounded-2xl mb-3 flex items-center justify-center text-2xl group-hover:bg-orange-100 transition-colors border border-orange-100 shadow-xs">
                <i :class="getSportIcon(match.awayEmoji || match.homeEmoji)"></i>
              </div>
              <div class="font-black text-xs text-center w-full truncate px-1 text-[#1A202C] uppercase tracking-tight">{{ match.away }}</div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#EFE8DF]">
            <button 
              @click="$emit('add-to-slip', { match, type: 'home', odds: match.odds.home })"
              class="bg-[#FAF8F5] py-3 rounded-xl border border-[#EAE2D7] text-center hover:bg-gradient-to-r hover:from-[#FF7A00] hover:to-[#FFA15C] hover:text-white transition-all flex flex-col items-center group/btn cursor-pointer shadow-2xs"
            >
              <div class="text-[9px] text-[#718096] font-bold mb-0.5 uppercase tracking-wider group-hover/btn:text-white/80">Home</div>
              <div class="font-black text-sm text-[#1A202C] group-hover/btn:text-white">{{ match.odds.home }}</div>
            </button>
            <button 
              @click="$emit('add-to-slip', { match, type: 'draw', odds: match.odds.draw })"
              :disabled="match.odds.draw === '-'"
              class="bg-[#FAF8F5] py-3 rounded-xl border border-[#EAE2D7] text-center hover:bg-gradient-to-r hover:from-[#FF7A00] hover:to-[#FFA15C] hover:text-white transition-all disabled:opacity-25 disabled:hover:bg-[#FAF8F5] disabled:hover:text-inherit flex flex-col items-center group/btn cursor-pointer shadow-2xs"
            >
              <div class="text-[9px] text-[#718096] font-bold mb-0.5 uppercase tracking-wider group-hover/btn:text-white/80">Draw</div>
              <div class="font-black text-sm text-[#1A202C] group-hover/btn:text-white">{{ match.odds.draw }}</div>
            </button>
            <button 
              @click="$emit('add-to-slip', { match, type: 'away', odds: match.odds.away })"
              class="bg-[#FAF8F5] py-3 rounded-xl border border-[#EAE2D7] text-center hover:bg-gradient-to-r hover:from-[#FF7A00] hover:to-[#FFA15C] hover:text-white transition-all flex flex-col items-center group/btn cursor-pointer shadow-2xs"
            >
              <div class="text-[9px] text-[#718096] font-bold mb-0.5 uppercase tracking-wider group-hover/btn:text-white/80">Away</div>
              <div class="font-black text-sm text-[#1A202C] group-hover/btn:text-white">{{ match.odds.away }}</div>
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

const getSportIcon = (emoji) => {
  const map = {
    '🏀': 'fa-solid fa-basketball text-orange-500',
    '⚽': 'fa-solid fa-futbol text-emerald-600',
    '⚾': 'fa-solid fa-baseball text-blue-600',
    '🏏': 'fa-solid fa-baseball-bat-ball text-amber-600',
    '🏒': 'fa-solid fa-hockey-puck text-indigo-500',
    '🎮': 'fa-solid fa-gamepad text-purple-600',
    '🏎️': 'fa-solid fa-car-side text-rose-500',
    '🥊': 'fa-solid fa-hand-fist text-rose-600',
    '🏈': 'fa-solid fa-football text-amber-800',
    '🎾': 'fa-solid fa-table-tennis-paddle-ball text-lime-600',
    '🃏': 'fa-solid fa-clover text-rose-500'
  }
  return map[emoji] || 'fa-solid fa-star text-[#FF7A00]'
}

const getBorderColor = (match) => {
  if (match.league && match.league.includes('NBA')) return '!border-t-orange-500'
  if (match.league && (match.league.includes('MAJOR') || match.league.includes('DOTA'))) return '!border-t-purple-500'
  if (match.league && (match.league.includes('CRICKET') || match.league.includes('IPL'))) return '!border-t-amber-500'
  return '!border-t-[#FF7A00]'
}
</script>
