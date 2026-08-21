<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in slide-in-from-bottom-10 duration-700 max-w-7xl font-outfit">
    <header class="mb-12">
      <div class="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200 px-4 py-1.5 rounded-full text-xs font-black text-[#FF7A00] tracking-widest uppercase mb-4 shadow-xs">
        <i class="fa-solid fa-trophy"></i> LIVE GLOBAL SPORTS & CASINO ARENA
      </div>
      <h1 class="text-4xl md:text-6xl font-black font-outfit uppercase text-[#1A202C]">
        Global <span class="text-gradient">Live Arena</span>
      </h1>
      <p class="text-[#5A6474] text-xs font-black uppercase tracking-[0.3em] mt-2">Streaming real-time global ESPN games and high-stakes odds</p>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div 
        v-for="match in matches" 
        :key="match.id" 
        class="bg-white p-8 rounded-[35px] flex flex-col justify-between gap-6 hover:border-orange-300 transition-all group border border-[#E2D9CE] border-t-4 shadow-sm hover:shadow-xl" 
        :class="match.odds.draw === '-' ? '!border-t-[#FF7A00]' : '!border-t-emerald-500'"
      >
        <div class="flex justify-between items-center gap-4">
          <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
            <div class="w-16 h-16 bg-orange-50/80 rounded-2xl mb-3 flex items-center justify-center text-3xl shadow-xs border border-orange-100">
              <i :class="match.odds.draw === '-' ? 'fa-solid fa-basketball text-[#FF7A00]' : 'fa-solid fa-futbol text-emerald-600'"></i>
            </div>
            <div class="font-black text-xs text-center w-full truncate px-1 text-[#1A202C] uppercase">{{ match.home }}</div>
          </div>
          
          <div class="px-5 py-3 bg-[#1A202C] rounded-2xl border border-gray-700 flex flex-col items-center justify-center min-w-[110px] shadow-md">
            <div class="text-xl md:text-2xl font-black text-white whitespace-nowrap">{{ match.homeScore }} <span class="text-[#FF7A00] text-base mx-1">-</span> {{ match.awayScore }}</div>
            <div class="text-[8px] text-[#FFA15C] font-black uppercase tracking-[0.2em] mt-1">{{ match.league }} • {{ match.time }}</div>
          </div>
          
          <div class="flex flex-col items-center flex-1 min-w-0 w-1/3">
            <div class="w-16 h-16 bg-orange-50/80 rounded-2xl mb-3 flex items-center justify-center text-3xl shadow-xs border border-orange-100">
              <i :class="match.odds.draw === '-' ? 'fa-solid fa-basketball text-[#FF7A00]' : 'fa-solid fa-futbol text-emerald-600'"></i>
            </div>
            <div class="font-black text-xs text-center w-full truncate px-1 text-[#1A202C] uppercase">{{ match.away }}</div>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-3 pt-4 border-t border-[#EFE8DF]">
          <button @click="$emit('add-to-slip', { match, type: 'home', odds: match.odds.home })" class="bg-[#FAF8F5] py-3.5 rounded-2xl border border-[#E2D9CE] text-center hover:bg-gradient-to-r hover:from-[#FF7A00] hover:to-[#FFA15C] hover:text-white transition-all flex flex-col items-center cursor-pointer shadow-2xs group/btn">
            <div class="text-[9px] text-[#718096] font-bold mb-0.5 uppercase tracking-widest group-hover/btn:text-white/80">Home</div>
            <div class="font-black text-base text-[#1A202C] group-hover/btn:text-white">{{ match.odds.home }}</div>
          </button>
          <button @click="$emit('add-to-slip', { match, type: 'draw', odds: match.odds.draw })" :disabled="match.odds.draw === '-'" class="bg-[#FAF8F5] py-3.5 rounded-2xl border border-[#E2D9CE] text-center hover:bg-gradient-to-r hover:from-[#FF7A00] hover:to-[#FFA15C] hover:text-white transition-all disabled:opacity-20 disabled:hover:bg-[#FAF8F5] disabled:hover:text-inherit flex flex-col items-center cursor-pointer shadow-2xs group/btn">
            <div class="text-[9px] text-[#718096] font-bold mb-0.5 uppercase tracking-widest group-hover/btn:text-white/80">Draw</div>
            <div class="font-black text-base text-[#1A202C] group-hover/btn:text-white">{{ match.odds.draw }}</div>
          </button>
          <button @click="$emit('add-to-slip', { match, type: 'away', odds: match.odds.away })" class="bg-[#FAF8F5] py-3.5 rounded-2xl border border-[#E2D9CE] text-center hover:bg-gradient-to-r hover:from-[#FF7A00] hover:to-[#FFA15C] hover:text-white transition-all flex flex-col items-center cursor-pointer shadow-2xs group/btn">
            <div class="text-[9px] text-[#718096] font-bold mb-0.5 uppercase tracking-widest group-hover/btn:text-white/80">Away</div>
            <div class="font-black text-base text-[#1A202C] group-hover/btn:text-white">{{ match.odds.away }}</div>
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
