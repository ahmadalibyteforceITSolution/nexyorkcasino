<template>
  <header class="sticky top-0 z-50 bg-[#FAF8F5]/95 border-b border-[#EFE8DF] backdrop-blur-md shadow-xs">
    <!-- Binance Live Crypto Ticker Bar -->
    <CryptoTickerBar />

    <!-- Navigation Bar -->
    <nav class="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 md:px-6">
      <div class="flex items-center gap-3 md:gap-6">
        <router-link to="/" class="flex items-center gap-2 font-outfit font-black text-sm md:text-xl tracking-widest cursor-pointer group">
          <div class="w-9 h-9 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFA15C] flex items-center justify-center text-white font-black text-lg shadow-[0_4px_15px_rgba(255,122,0,0.35)] group-hover:scale-105 transition-transform">
            <VueIcon name="zap" size="1.2em" />
          </div>
          <div class="hidden xs:block text-[#1A202C]">
            <span class="text-[#FF7A00]">NEX</span>YORK 
            <span class="text-[9px] font-black text-[#FF7A00] bg-orange-50 px-2.5 py-0.5 rounded-full border border-orange-200 ml-1">EXCHANGE</span>
          </div>
          <div class="xs:hidden text-[#FF7A00] font-black">N</div>
        </router-link>
        
        <div class="hidden sm:flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
          <span class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
          <span class="text-[8px] lg:text-[9px] font-black text-emerald-700 uppercase tracking-widest">{{ userCount }} LIVE TRADERS</span>
        </div>
      </div>
      
      <!-- Desktop Nav Links -->
      <div class="hidden xl:flex gap-7 text-[11px] font-black uppercase tracking-[0.18em] text-[#5A6474]">
        <router-link to="/arena" class="hover:text-[#FF7A00] transition-colors py-1">Arena</router-link>
        <router-link to="/earn" class="hover:text-[#FF7A00] transition-colors flex items-center gap-1.5 text-[#FF7A00] font-black bg-orange-50/80 px-3 py-1 rounded-full border border-orange-200/60">
          <VueIcon name="coins" size="1.1em" /> Earn 20%
        </router-link>
        <router-link to="/rewards" class="hover:text-[#FF7A00] transition-colors py-1">Rewards</router-link>
        <router-link to="/wallet" class="hover:text-[#FF7A00] transition-colors py-1">Wallet</router-link>
        <router-link to="/magazine" class="hover:text-[#FF7A00] transition-colors py-1">Magazine (1000+)</router-link>
        <a href="https://www.binance.com/en/academy" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF7A00] transition-colors flex items-center gap-1 py-1">
          Academy <span class="text-[9px] text-[#FF7A00]">↗</span>
        </a>
      </div>

      <div v-if="currentUser" class="flex items-center gap-2 md:gap-3">
        <!-- Tokens -->
        <button @click="$emit('open-tokens')" aria-label="Buy Tokens" class="flex items-center gap-1.5 bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200 hover:bg-orange-100 transition-all cursor-pointer shadow-xs">
          <VueIcon name="coins" size="1.1em" class="text-[#FF7A00]" />
          <span class="hidden sm:inline text-[10px] font-black text-[#FF7A00] tracking-widest">{{ tokens?.toLocaleString() || 0 }} TKN</span>
        </button>

        <!-- USD Balance -->
        <div class="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-[#E2D9CE] font-bold text-xs shadow-xs">
          <VueIcon name="dollar" size="1.1em" class="text-emerald-600" />
          <span class="tracking-tight text-[#1A202C] font-mono font-black">${{ balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        </div>
        
        <div class="flex items-center gap-2">
          <button @click="$emit('open-dashboard')" class="relative bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white py-1.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xs hover:shadow-md hover:scale-102 transition-all cursor-pointer">
            Profile
            <span v-if="slipCount > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white rounded-full flex items-center justify-center text-[8px] font-black border-2 border-white animate-bounce">
              {{ slipCount }}
            </span>
          </button>
          <button @click="$emit('logout')" aria-label="Logout" class="bg-rose-50 hover:bg-rose-100 text-rose-600 py-1.5 px-3 rounded-xl border border-rose-200 text-[10px] font-black uppercase tracking-widest transition-all cursor-pointer">
            Logout
          </button>
        </div>
      </div>

      <!-- Guest Actions -->
      <div v-else class="flex items-center gap-3">
        <router-link to="/earn" class="hidden sm:flex items-center gap-1 text-[10px] font-black text-[#FF7A00] uppercase tracking-widest hover:underline">
          <VueIcon name="coins" size="1.1em" /> Earn 20%
        </router-link>
        <button @click="$emit('open-auth')" class="btn-primary py-2 px-5 text-[10px] uppercase tracking-widest">
          Join Exchange
        </button>
      </div>
    </nav>
  </header>
</template>

<script setup>
import CryptoTickerBar from './CryptoTickerBar.vue'

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
