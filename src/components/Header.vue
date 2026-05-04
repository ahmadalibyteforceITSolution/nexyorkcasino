<template>
  <nav class="fixed top-5 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl h-16 glass rounded-2xl flex items-center justify-between px-4 lg:px-6 z-50">
    <div class="flex items-center gap-4 lg:gap-6">
      <router-link to="/" class="font-outfit font-black text-lg lg:text-xl tracking-widest cursor-pointer">
        <span class="text-gradient">NEX</span>YORK
      </router-link>
      <div class="hidden sm:flex items-center gap-2 bg-green-500/10 border border-green-500/20 px-2 lg:px-3 py-1 rounded-full">
        <span class="w-1 h-1 lg:w-1.5 lg:h-1.5 bg-green-500 rounded-full animate-pulse"></span>
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

    <div class="flex items-center gap-2 lg:gap-3">
      <!-- Tokens -->
      <button @click="$emit('open-tokens')" class="flex items-center gap-2 bg-primary/10 px-2 lg:px-3 py-2 rounded-xl border border-primary/30 hover:bg-primary/20 transition-all cursor-pointer">
        <i class="fa-solid fa-coins text-primary text-sm"></i>
        <span class="hidden md:inline text-[11px] font-black text-primary tracking-widest">{{ tokens?.toLocaleString() || 0 }} TKN</span>
      </button>

      <!-- USD Balance -->
      <div class="flex items-center gap-2 bg-white/5 px-3 lg:px-4 py-2 rounded-xl border border-white/10 font-bold text-xs lg:text-sm shadow-inner">
        <i class="fa-solid fa-dollar-sign text-green-500 text-sm"></i>
        <span class="tracking-tight">${{ balance.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</span>
      </div>
      
      <div class="flex items-center gap-1 lg:gap-2">
        <button @click="$emit('open-dashboard')" class="bg-primary hover:bg-yellow-500 text-black py-2 px-3 lg:px-5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">Profile</button>
        <button @click="$emit('logout')" class="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-2 px-3 lg:px-4 rounded-xl border border-red-500/20 text-[10px] font-black uppercase tracking-widest transition-all group">
          <span class="hidden lg:inline">Logout</span>
          <span class="lg:hidden">✕</span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
defineProps({
  balance: Number,
  tokens: Number,
  cryptoBalance: Number,
  userCount: Number
})
defineEmits(['open-dashboard', 'open-tokens', 'logout'])
</script>
