<template>
  <div class="fixed inset-0 z-[250] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="$emit('close')"></div>

    <div class="relative w-full max-w-xl glass p-8 rounded-[40px] border-[#F0B90B]/30 text-center animate-in zoom-in duration-300 shadow-2xl bg-[#0B0E11] text-white">
      <button @click="$emit('close')" class="absolute top-6 right-6 text-gray-500 hover:text-white font-bold text-lg">✕</button>

      <div class="flex items-center gap-3 justify-center text-[#F0B90B] font-black text-xs uppercase tracking-widest mb-2">
        <i class="fa-solid fa-qrcode text-lg"></i>
        BINANCE MULTI-CHAIN DEPOSIT VAULT
      </div>
      <h3 class="text-3xl font-black uppercase text-white font-outfit mb-6">DEPOSIT CRYPTO</h3>

      <!-- Step 1: Coin Selection -->
      <div class="space-y-6 text-left">
        <div>
          <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Select Coin</label>
          <div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
            <button 
              v-for="coin in coins" 
              :key="coin.symbol"
              @click="selectedCoin = coin"
              class="p-3 rounded-2xl border transition-all flex flex-col items-center gap-1 font-bold text-xs"
              :class="selectedCoin.symbol === coin.symbol ? 'bg-[#F0B90B]/15 border-[#F0B90B] text-[#F0B90B] scale-105' : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'"
            >
              <i :class="coin.icon + ' text-lg'"></i>
              <span>{{ coin.symbol }}</span>
            </button>
          </div>
        </div>

        <!-- Step 2: Network Selection -->
        <div>
          <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Deposit Network</label>
          <select v-model="selectedNetwork" class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold uppercase tracking-wider outline-none focus:border-[#F0B90B] text-white">
            <option v-for="net in selectedCoin.networks" :key="net" :value="net">{{ net }}</option>
          </select>
        </div>

        <!-- Deposit QR Code & Address Display -->
        <div class="bg-black/60 p-6 rounded-3xl border border-white/10 text-center space-y-4">
          <div class="bg-white p-3 rounded-2xl w-44 h-44 mx-auto flex items-center justify-center shadow-2xl">
            <!-- Dynamic SVG QR Code Representation -->
            <svg viewBox="0 0 100 100" class="w-full h-full text-black fill-current">
              <path d="M0,0 h30 v30 h-30 z M40,0 h20 v10 h-20 z M70,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M80,10 h10 v10 h-10 z M0,40 h10 v20 h-10 z M20,40 h30 v10 h-30 z M60,40 h40 v10 h-40 z M0,70 h30 v30 h-30 z M10,80 h10 v10 h-10 z M40,60 h20 v40 h-20 z M70,70 h30 v30 h-30 z M80,80 h10 v10 h-10 z"/>
            </svg>
          </div>

          <div>
            <div class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Your {{ selectedCoin.symbol }} Deposit Address ({{ selectedNetwork }})</div>
            <div class="bg-white/5 border border-white/10 rounded-xl py-3 px-4 font-mono text-xs text-[#F0B90B] flex items-center justify-between gap-2 overflow-hidden">
              <span class="truncate">{{ depositAddress }}</span>
              <button @click="copyAddress" class="text-white hover:text-[#F0B90B] text-sm"><i class="fa-solid fa-copy"></i></button>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-3 text-[10px] text-gray-400 font-medium bg-[#F0B90B]/10 p-3 rounded-xl border border-[#F0B90B]/20">
          <i class="fa-solid fa-circle-info text-[#F0B90B] text-sm"></i>
          <span>Send only <b>{{ selectedCoin.symbol }}</b> on <b>{{ selectedNetwork }}</b>. Minimum deposit: 0.001 {{ selectedCoin.symbol }}. Requires 12 network confirmations.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['close'])

const coins = [
  { symbol: 'USDT', name: 'Tether USD', icon: 'fa-solid fa-dollar-sign', networks: ['TRC20 (Tron)', 'ERC20 (Ethereum)', 'BEP20 (BNB Smart Chain)', 'Solana'] },
  { symbol: 'BTC', name: 'Bitcoin', icon: 'fa-brands fa-bitcoin', networks: ['Bitcoin Network', 'BEP20 (BNB Smart Chain)'] },
  { symbol: 'ETH', name: 'Ethereum', icon: 'fa-brands fa-ethereum', networks: ['ERC20 (Ethereum)', 'Arbitrum One', 'Optimism'] },
  { symbol: 'BNB', name: 'BNB', icon: 'fa-solid fa-coins', networks: ['BEP20 (BNB Smart Chain)', 'BEP2 (Beacon Chain)'] },
  { symbol: 'NEX', name: 'NexToken', icon: 'fa-solid fa-gem', networks: ['NEX Native Chain', 'BEP20'] },
]

const selectedCoin = ref(coins[0])
const selectedNetwork = ref(coins[0].networks[0])

const depositAddress = computed(() => {
  const symbol = selectedCoin.value.symbol
  if (symbol === 'USDT' || symbol === 'ETH' || symbol === 'BNB') return '0x71C7656EC7ab88b098defB751B7401B5f6d8976F'
  if (symbol === 'BTC') return '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
  return 'T9yD14Nj9j7xG4Z3K8mY2xW7vP1qL0rR8'
})

const copyAddress = () => {
  navigator.clipboard.writeText(depositAddress.value)
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'ADDRESS COPIED!',
      text: depositAddress.value,
      icon: 'success',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B'
    })
  } else {
    alert('Address copied to clipboard!')
  }
}
</script>
