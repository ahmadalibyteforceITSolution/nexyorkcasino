<template>
  <header class="sticky top-0 z-50 bg-[#0B0E11]/95 border-b border-white/10 backdrop-blur-md">
    <!-- Binance Live Crypto Ticker Bar -->
    <CryptoTickerBar />

    <!-- Navigation Bar -->
    <nav class="max-w-7xl mx-auto h-16 flex items-center justify-between px-4 md:px-6">
      <div class="flex items-center gap-3 md:gap-6">
        <router-link to="/" class="flex items-center gap-2 font-outfit font-black text-sm md:text-xl tracking-widest cursor-pointer group">
          <div class="w-8 h-8 rounded-xl bg-[#F0B90B] flex items-center justify-center text-black font-black text-lg shadow-[0_0_15px_rgba(240,185,11,0.5)] group-hover:scale-110 transition-transform">
            <VueIcon name="zap" size="1.2em" />
          </div>
          <div class="hidden xs:block"><span class="text-[#F0B90B]">NEX</span>YORK <span class="text-[9px] font-bold text-gray-400 bg-white/5 px-2.5 py-0.5 rounded border border-white/10">EXCHANGE</span></div>
          <div class="xs:hidden text-[#F0B90B]">N</div>
        </router-link>
        
        <div class="hidden sm:flex items-center gap-2 bg-[#0ECB81]/10 border border-[#0ECB81]/20 px-3 py-1 rounded-full">
          <span class="w-1.5 h-1.5 bg-[#0ECB81] rounded-full animate-pulse"></span>
          <span class="text-[8px] lg:text-[9px] font-black text-[#0ECB81] uppercase tracking-widest">{{ userCount }} LIVE TRADERS</span>
        </div>
      </div>
      
      <!-- Desktop Nav Links -->
      <div class="hidden xl:flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
        <router-link to="/arena" class="hover:text-[#F0B90B] transition-colors">Arena</router-link>
        <router-link to="/earn" class="hover:text-[#F0B90B] transition-colors flex items-center gap-1.5 text-[#F0B90B]">
          <VueIcon name="coins" size="1.1em" /> Earn 20%
        </router-link>
        <router-link to="/rewards" class="hover:text-[#F0B90B] transition-colors">Rewards</router-link>
        <router-link to="/wallet" class="hover:text-[#F0B90B] transition-colors">Wallet</router-link>
        <router-link to="/magazine" class="hover:text-[#F0B90B] transition-colors">Magazine</router-link>
        <a href="https://www.binance.com/en/academy" target="_blank" rel="noopener noreferrer" class="hover:text-[#F0B90B] transition-colors flex items-center gap-1">
          Academy <span class="text-[9px] text-[#F0B90B]">↗</span>
        </a>
      </div>

      <div v-if="currentUser" class="flex items-center gap-2 md:gap-3">
        <!-- Tokens -->
        <button @click="$emit('open-tokens')" aria-label="Buy Tokens" class="flex items-center gap-1.5 bg-[#F0B90B]/10 px-2.5 py-1.5 rounded-xl border border-[#F0B90B]/30 hover:bg-[#F0B90B]/20 transition-all cursor-pointer">
          <VueIcon name="coins" size="1.1em" class="text-[#F0B90B]" />
          <span class="hidden sm:inline text-[10px] font-black text-[#F0B90B] tracking-widest">{{ tokens?.toLocaleString() || 0 }} TKN</span>
        </button>

        <!-- USD Balance -->
        <div class="flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-xl border border-white/10 font-bold text-xs shadow-inner">
          <VueIcon name="dollar" size="1.1em" class="text-[#0ECB81]" />
          <span class="tracking-tight text-white font-mono">${{ balance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span>
        </div>
        
        <div class="flex items-center gap-2">
          <button @click="$emit('open-dashboard')" class="relative bg-[#F0B90B] hover:bg-yellow-400 text-black py-1.5 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">
            Profile
            <span v-if="slipCount > 0" class="absolute -top-1 -right-1 w-4 h-4 bg-[#F6465D] text-white rounded-full flex items-center justify-center text-[8px] font-black border border-dark animate-bounce">
              {{ slipCount }}
            </span>
          </button>
          <button @click="$emit('logout')" aria-label="Logout" class="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white py-1.5 px-3 rounded-xl border border-red-500/20 text-[10px] font-black uppercase tracking-widest transition-all">
            Logout
          </button>
        </div>
      </div>

      <!-- Guest Actions -->
      <div v-else class="flex items-center gap-3">
        <router-link to="/earn" class="hidden sm:flex items-center gap-1 text-[10px] font-black text-[#F0B90B] uppercase tracking-widest hover:underline">
          <VueIcon name="coins" size="1.1em" /> Earn 20%
        </router-link>
        <button @click="$emit('open-auth')" class="bg-[#F0B90B] hover:bg-yellow-400 text-black py-2 px-5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(240,185,11,0.3)]">
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
