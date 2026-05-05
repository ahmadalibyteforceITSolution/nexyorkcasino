<template>
  <nav class="fixed top-2 md:top-5 left-1/2 -translate-x-1/2 w-[95%] lg:w-[90%] max-w-7xl h-14 md:h-16 glass rounded-xl md:rounded-2xl flex items-center justify-between px-3 md:px-6 z-50">
    <div class="flex items-center gap-2 md:gap-6">
      <router-link to="/" class="flex items-center gap-2 font-outfit font-black text-sm md:text-xl tracking-widest cursor-pointer group">
        <img src="/favicon.png" alt="NexYork Logo" class="w-6 h-6 md:w-8 md:h-8 rounded-lg shadow-lg group-hover:scale-110 transition-transform duration-300" />
        <div class="hidden xs:block"><span class="text-gradient">NEX</span>YORK</div>
        <div class="xs:hidden text-gradient">N</div>
      </router-link>
      <div class="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-2 lg:px-3 py-1 rounded-full">
        <span class="w-1 lg:w-1.5 lg:h-1.5 bg-green-500 rounded-full animate-pulse"></span>
        <span class="text-[8px] lg:text-[9px] font-black text-green-500 uppercase tracking-widest">{{ userCount }} LIVE</span>
      </div>
    </div>
    
    <!-- Desktop Nav -->
    <div class="hidden xl:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">
      <router-link to="/arena" class="hover:text-primary transition-colors">Arena</router-link>
      <router-link to="/magazine" class="hover:text-primary transition-colors">Magazine</router-link>
      <router-link to="/rewards" class="hover:text-primary transition-colors">Rewards</router-link>
      <router-link to="/wallet" class="hover:text-primary transition-colors">Wallet</router-link>
    </div>

    <div v-if="currentUser" class="flex items-center gap-1.5 md:gap-3">
      <!-- Tokens -->
      <button @click="$emit('open-tokens')" class="flex items-center gap-1 md:gap-2 bg-primary/10 px-2 md:px-3 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-primary/30 hover:bg-primary/20 transition-all cursor-pointer">
        <i class="fa-solid fa-coins text-primary text-[10px] md:text-sm"></i>
        <span class="hidden sm:inline text-[9px] md:text-[11px] font-black text-primary tracking-widest">{{ tokens?.toLocaleString() || 0 }}</span>
      </button>

      <!-- USD Balance -->
      <div class="flex items-center gap-1.5 bg-white/5 px-2 md:px-4 py-1.5 md:py-2 rounded-lg md:rounded-xl border border-white/10 font-bold text-[10px] md:text-sm shadow-inner">
        <i class="fa-solid fa-dollar-sign text-green-500 text-[10px] md:text-sm"></i>
        <span class="tracking-tight">${{ balance.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 }) }}</span>
      </div>
      
      <div class="flex items-center gap-1 md:gap-2">
        <button @click="$emit('open-dashboard')" class="relative bg-primary hover:bg-yellow-500 text-black py-1.5 md:py-2 px-3 md:px-5 rounded-lg md:rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all">
          Profile
          <span v-if="slipCount > 0" class="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-[8px] font-black border-2 border-dark animate-bounce">
            {{ slipCount }}
          </span>
        </button>
        <button @click="$emit('logout')" class="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-1.5 md:py-2 px-2 md:px-4 rounded-lg md:rounded-xl border border-red-500/20 text-[9px] md:text-[10px] font-black uppercase tracking-widest transition-all group">
          <span class="hidden md:inline">Logout</span>
          <span class="md:hidden">✕</span>
        </button>
      </div>
    </div>

    <!-- Guest Actions -->
    <div v-else class="flex items-center gap-2">
      <button @click="$emit('open-auth')" class="bg-primary hover:bg-yellow-500 text-black py-2 px-6 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(245,197,24,0.3)]">Join Elite</button>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  currentUser: Object,
  balance: Number,
  tokens: Number,
  cryptoBalance: Number,
  userCount: Number,
  slipCount: Number
})
defineEmits(['open-dashboard', 'open-tokens', 'logout', 'open-auth'])
</script>
