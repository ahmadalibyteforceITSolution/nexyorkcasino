<template>
  <section id="sports" class="py-24 container mx-auto px-4">
    <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
      <div>
        <h2 class="font-outfit text-4xl font-black mb-2">LIVE <span class="text-primary">SPORTS</span> TRACKER</h2>
        <p class="text-gray-400">Real-time global match tracking with instant betting options.</p>
      </div>
    </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      <div v-for="match in matches" :key="match.id" class="glass rounded-3xl overflow-hidden hover:border-primary/50 transition-all group bg-gradient-to-br from-dark-card to-black border-t-2" :class="getBorderColor(match)">
        <div class="bg-white/5 px-6 py-3 flex justify-between items-center border-b border-white/5">
          <span class="text-[10px] font-black animate-pulse flex items-center gap-1" :class="match.odds.draw === '-' ? 'text-primary' : 'text-green-500'"><i class="fa-solid fa-circle text-[6px]"></i> LIVE {{ match.time }}</span>
          <span class="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{{ match.league }}</span>
        </div>
        
        <div class="p-6 space-y-6">
          <div class="flex justify-between items-center gap-2">
            <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
              <div class="w-14 h-14 bg-white/5 rounded-2xl mb-3 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors shadow-inner">
                <i :class="getSportIcon(match.homeEmoji)"></i>
              </div>
              <div class="font-bold text-xs text-center w-full truncate px-1 text-white uppercase tracking-tight">{{ match.home }}</div>
            </div>
            
            <div class="px-4 py-3 bg-black/80 rounded-2xl border border-white/10 flex flex-col items-center justify-center min-w-[110px] shadow-2xl">
              <div class="text-xl md:text-2xl font-black text-white tracking-tighter tabular-nums">{{ match.homeScore }} <span class="text-primary mx-1">:</span> {{ match.awayScore }}</div>
              <div class="text-[8px] text-primary font-bold uppercase tracking-[0.2em] mt-1">Live Score</div>
            </div>
            
            <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
              <div class="w-14 h-14 bg-white/5 rounded-2xl mb-3 flex items-center justify-center text-2xl group-hover:bg-primary/20 transition-colors shadow-inner">
                <i :class="getSportIcon(match.awayEmoji || match.homeEmoji)"></i>
              </div>
              <div class="font-bold text-xs text-center w-full truncate px-1 text-white uppercase tracking-tight">{{ match.away }}</div>
            </div>
          </div>

          <div class="grid grid-cols-3 gap-2 pt-4 border-t border-white/5">
            <button 
              @click="$emit('add-to-slip', { match, type: 'home', odds: match.odds.home })"
              class="bg-white/5 py-3 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center group/btn"
            >
              <div class="text-[9px] text-gray-500 font-bold mb-1 uppercase tracking-widest group-hover/btn:text-black/60">Home</div>
              <div class="font-black text-sm" :class="parseFloat(match.odds.home) > 2 ? 'text-green-500' : 'text-white group-hover/btn:text-black'">{{ match.odds.home }}</div>
            </button>
            <button 
              @click="$emit('add-to-slip', { match, type: 'draw', odds: match.odds.draw })"
              :disabled="match.odds.draw === '-'"
              class="bg-white/5 py-3 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all disabled:opacity-20 disabled:hover:bg-white/5 flex flex-col items-center group/btn"
            >
              <div class="text-[9px] text-gray-500 font-bold mb-1 uppercase tracking-widest group-hover/btn:text-black/60">Draw</div>
              <div class="font-black text-sm text-white group-hover/btn:text-black">{{ match.odds.draw }}</div>
            </button>
            <button 
              @click="$emit('add-to-slip', { match, type: 'away', odds: match.odds.away })"
              class="bg-white/5 py-3 rounded-xl border border-white/5 text-center hover:bg-primary hover:text-black transition-all flex flex-col items-center group/btn"
            >
              <div class="text-[9px] text-gray-500 font-bold mb-1 uppercase tracking-widest group-hover/btn:text-black/60">Away</div>
              <div class="font-black text-sm" :class="parseFloat(match.odds.away) > 2 ? 'text-green-500' : 'text-white group-hover/btn:text-black'">{{ match.odds.away }}</div>
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
    '⚽': 'fa-solid fa-futbol text-white',
    '⚾': 'fa-solid fa-baseball text-white',
    '🏏': 'fa-solid fa-cricket-bat-ball text-yellow-600',
    '🏒': 'fa-solid fa-hockey-puck text-blue-400',
    '🎮': 'fa-solid fa-gamepad text-purple-500',
    '🏎️': 'fa-solid fa-car-side text-red-500',
    '🥊': 'fa-solid fa-hand-fist text-red-600',
    '🏈': 'fa-solid fa-football text-brown-600',
    '🎾': 'fa-solid fa-baseball-ball text-lime-400',
    '🏉': 'fa-solid fa-football text-orange-800',
    '🃏': 'fa-solid fa-cards text-red-500'
  }
  return map[emoji] || 'fa-solid fa-star text-primary'
}

const getBorderColor = (match) => {
  if (match.league.includes('NBA')) return 'border-t-orange-500'
  if (match.league.includes('MAJOR') || match.league.includes('DOTA')) return 'border-t-purple-500'
  if (match.league.includes('CRICKET') || match.league.includes('IPL')) return 'border-t-yellow-500'
  return match.odds.draw === '-' ? 'border-t-primary' : 'border-t-green-500'
}
</script>
