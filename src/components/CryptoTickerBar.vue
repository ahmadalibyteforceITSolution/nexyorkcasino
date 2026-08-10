<template>
  <div class="bg-[#0B0E11] border-b border-white/10 py-1.5 px-4 text-xs font-mono select-none overflow-hidden relative z-50">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      
      <!-- Crypto Pairs Ticker Carousel -->
      <div class="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
        <div class="flex items-center gap-2 text-[10px] font-black text-[#F0B90B] tracking-wider uppercase whitespace-nowrap border-r border-white/10 pr-4">
          <VueIcon name="chart" size="1.2em" />
          BINANCE SPOT LIVE
        </div>

        <div v-for="ticker in tickers" :key="ticker.symbol" class="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:bg-white/5 px-2 py-0.5 rounded transition-colors group">
          <span class="font-bold text-gray-300 group-hover:text-[#F0B90B]">{{ ticker.displaySymbol }}</span>
          <span class="font-black text-white" :class="ticker.priceDirection === 'up' ? 'text-[#0ECB81]' : ticker.priceDirection === 'down' ? 'text-[#F6465D]' : ''">
            ${{ parseFloat(ticker.price).toLocaleString(undefined, { minimumFractionDigits: parseFloat(ticker.price) < 10 ? 4 : 2 }) }}
          </span>
          <span class="text-[9px] font-black px-1.5 py-0.2 rounded" :class="parseFloat(ticker.change) >= 0 ? 'bg-[#0ECB81]/15 text-[#0ECB81]' : 'bg-[#F6465D]/15 text-[#F6465D]'">
            {{ parseFloat(ticker.change) >= 0 ? '+' : '' }}{{ parseFloat(ticker.change).toFixed(2) }}%
          </span>
        </div>
      </div>

      <!-- Quick SAFU & Security Stats -->
      <div class="hidden lg:flex items-center gap-4 text-[10px] font-sans font-bold text-gray-400 whitespace-nowrap">
        <div class="flex items-center gap-1.5 bg-[#0ECB81]/10 text-[#0ECB81] px-2.5 py-1 rounded-full border border-[#0ECB81]/20">
          <VueIcon name="shield" size="1.1em" />
          <span>SAFU Vault $1.2B</span>
        </div>
        <div class="flex items-center gap-1 text-gray-400">
          <VueIcon name="lock" size="1.1em" class="text-green-400" />
          <span>AES-256 SSL</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import axios from 'axios'

const tickers = ref([
  { symbol: 'BTCUSDT', displaySymbol: 'BTC/USDT', price: '67420.50', change: '3.45', priceDirection: null },
  { symbol: 'ETHUSDT', displaySymbol: 'ETH/USDT', price: '3480.20', change: '2.12', priceDirection: null },
  { symbol: 'BNBUSDT', displaySymbol: 'BNB/USDT', price: '588.90', change: '1.85', priceDirection: null },
  { symbol: 'SOLUSDT', displaySymbol: 'SOL/USDT', price: '154.30', change: '5.60', priceDirection: null },
  { symbol: 'XRPUSDT', displaySymbol: 'XRP/USDT', price: '0.5840', change: '4.10', priceDirection: null },
])

let timer = null

const fetchBinancePrices = async () => {
  try {
    const res = await axios.get('https://api.binance.com/api/v3/ticker/24hr')
    if (res.data && Array.isArray(res.data)) {
      const symbolsToWatch = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT']
      const filtered = res.data.filter(t => symbolsToWatch.includes(t.symbol))
      
      tickers.value = filtered.map(t => {
        const oldTicker = tickers.value.find(o => o.symbol === t.symbol)
        const oldPrice = oldTicker ? parseFloat(oldTicker.price) : parseFloat(t.lastPrice)
        const newPrice = parseFloat(t.lastPrice)
        const direction = newPrice > oldPrice ? 'up' : newPrice < oldPrice ? 'down' : null
        
        return {
          symbol: t.symbol,
          displaySymbol: t.symbol.replace('USDT', '/USDT'),
          price: t.lastPrice,
          change: t.priceChangePercent,
          priceDirection: direction
        }
      })
    }
  } catch (err) {
    console.warn("Binance API fetch failed", err)
  }
}

onMounted(() => {
  fetchBinancePrices()
  timer = setInterval(fetchBinancePrices, 4000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
