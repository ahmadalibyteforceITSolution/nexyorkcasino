<template>
  <div class="bg-[#FFF8F2] border-b border-[#FFE4D1] py-2 px-4 text-xs font-mono select-none overflow-hidden relative z-50 shadow-sm">
    <div class="max-w-7xl mx-auto flex items-center justify-between gap-4">
      
      <!-- Crypto Pairs Ticker Carousel -->
      <div class="flex items-center gap-6 overflow-x-auto no-scrollbar py-0.5">
        <div class="flex items-center gap-2 text-[10px] font-black text-[#FF7A00] tracking-wider uppercase whitespace-nowrap border-r border-[#FFD5BA] pr-4">
          <VueIcon name="chart" size="1.2em" />
          BINANCE SPOT LIVE
        </div>

        <div v-for="ticker in tickers" :key="ticker.symbol" class="flex items-center gap-2 whitespace-nowrap cursor-pointer hover:bg-orange-50 px-2.5 py-1 rounded-xl transition-all group border border-transparent hover:border-orange-200">
          <span class="font-bold text-[#4A5568] group-hover:text-[#FF7A00]">{{ ticker.displaySymbol }}</span>
          <span class="font-black text-[#1A202C]" :class="ticker.priceDirection === 'up' ? '!text-[#00A86B]' : ticker.priceDirection === 'down' ? '!text-[#E53E3E]' : ''">
            ${{ parseFloat(ticker.price).toLocaleString(undefined, { minimumFractionDigits: parseFloat(ticker.price) < 10 ? 4 : 2 }) }}
          </span>
          <span class="text-[9px] font-black px-1.5 py-0.5 rounded-md" :class="parseFloat(ticker.change) >= 0 ? 'bg-[#00A86B]/10 text-[#00A86B]' : 'bg-[#E53E3E]/10 text-[#E53E3E]'">
            {{ parseFloat(ticker.change) >= 0 ? '+' : '' }}{{ parseFloat(ticker.change).toFixed(2) }}%
          </span>
        </div>
      </div>

      <!-- Quick SAFU & Security Stats -->
      <div class="hidden lg:flex items-center gap-4 text-[10px] font-sans font-bold text-[#718096] whitespace-nowrap">
        <div class="flex items-center gap-1.5 bg-orange-100/70 text-[#FF7A00] px-3 py-1 rounded-full border border-orange-200 shadow-xs">
          <VueIcon name="shield" size="1.1em" />
          <span>SAFU Vault $1.2B</span>
        </div>
        <div class="flex items-center gap-1 text-[#2D3748]">
          <VueIcon name="lock" size="1.1em" class="text-[#00A86B]" />
          <span>AES-256 SSL Verified</span>
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
