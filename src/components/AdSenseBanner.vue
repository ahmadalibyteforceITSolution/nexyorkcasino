<template>
  <div class="my-8 w-full max-w-7xl mx-auto px-4 select-none">
    <div class="glass p-4 rounded-2xl border border-[#F0B90B]/20 relative overflow-hidden bg-gradient-to-r from-[#0B0E11] via-[#1E2329] to-[#0B0E11] text-center shadow-xl">
      <div class="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-2 flex items-center justify-center gap-2">
        <i class="fa-solid fa-rectangle-ad text-[#F0B90B]"></i>
        SPONSORED ADVERTISEMENT • EARNING ENGINE ACTIVE
      </div>

      <!-- Google AdSense Container -->
      <ins class="adsbygoogle"
           style="display:block"
           data-ad-client="ca-pub-1888138480311828"
           :data-ad-slot="slotId || '1234567890'"
           data-ad-format="auto"
           data-full-width-responsive="true"></ins>

      <!-- Fallback Luxury Ad Banner (If AdSense blocker is enabled or initializing) -->
      <div v-if="showFallback" class="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white/5 rounded-xl border border-white/5">
        <div class="flex items-center gap-4 text-left">
          <div class="w-12 h-12 rounded-xl bg-[#F0B90B]/20 flex items-center justify-center text-[#F0B90B] text-2xl font-black">
            <i class="fa-brands fa-bitcoin"></i>
          </div>
          <div>
            <div class="text-sm font-black text-white uppercase tracking-wider">BINANCE VIP PLATINUM LOUNGE</div>
            <div class="text-xs text-gray-400 font-medium">Trade with 0% Maker Fees & Get 100 USDT Welcome Cashback</div>
          </div>
        </div>
        <a href="https://www.binance.com" target="_blank" rel="noopener noreferrer" class="btn-primary py-2.5 px-6 text-xs whitespace-nowrap uppercase tracking-widest">
          CLAIM 100 USDT ➜
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  slotId: String
})

const showFallback = ref(true)

onMounted(() => {
  try {
    if (window.adsbygoogle) {
      window.adsbygoogle.push({})
    }
  } catch (e) {
    showFallback.value = true
  }
})
</script>
