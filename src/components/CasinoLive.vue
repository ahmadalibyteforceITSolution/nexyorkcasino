<template>
  <section id="casino" class="py-24 relative overflow-hidden bg-[#FAF8F5] text-[#1E2329] font-outfit select-none border-t border-[#EFE8DF]">
    <!-- Background Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[450px] bg-orange-200/20 blur-[140px] -z-10"></div>

    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-16">
        <div class="text-[#FF7A00] font-black text-xs tracking-[0.35em] uppercase mb-3 flex items-center justify-center gap-2">
          <i class="fa-solid fa-crown"></i> HIGH STAKES BINANCE CASINO LOUNGE
        </div>
        <h2 class="text-4xl md:text-7xl font-black mb-4 uppercase leading-none text-[#1A202C]">
          LIVE <span class="text-gradient">LOUNGE</span>
        </h2>
        <p class="text-[#5A6474] max-w-xl mx-auto text-sm md:text-base font-medium">
          Experience real-time Platinum Roulette with audio synthesis, Rocket Crash, and VIP Mines games.
        </p>
      </div>

      <!-- Game Mode Selector Tabs -->
      <div class="flex justify-center gap-3.5 mb-12 flex-wrap">
        <button 
          @click="activeGame = 'roulette'"
          :class="activeGame === 'roulette' ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white font-black scale-103 shadow-md border-orange-300' : 'bg-white text-[#5A6474] hover:text-[#1A202C] border-[#E2D9CE]'"
          class="px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border shadow-xs flex items-center gap-2 cursor-pointer"
        >
          🎲 Platinum Roulette
        </button>
        <button 
          @click="activeGame = 'crash'"
          :class="activeGame === 'crash' ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white font-black scale-103 shadow-md border-orange-300' : 'bg-white text-[#5A6474] hover:text-[#1A202C] border-[#E2D9CE]'"
          class="px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border shadow-xs flex items-center gap-2 cursor-pointer"
        >
          🚀 Rocket Crash
        </button>
        <button 
          @click="activeGame = 'mines'"
          :class="activeGame === 'mines' ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white font-black scale-103 shadow-md border-orange-300' : 'bg-white text-[#5A6474] hover:text-[#1A202C] border-[#E2D9CE]'"
          class="px-7 py-3 rounded-2xl text-xs font-black uppercase tracking-wider transition-all border shadow-xs flex items-center gap-2 cursor-pointer"
        >
          💣 VIP Mines
        </button>
      </div>

      <!-- Game Container Component Switching -->
      <div v-if="activeGame === 'crash'">
        <CrashGame :balance="balance" @place-bet="handleDeductBalance" @win="handleAddBalance" />
      </div>

      <div v-else-if="activeGame === 'mines'">
        <MinesGame :balance="balance" @place-bet="handleDeductBalance" @win="handleAddBalance" />
      </div>

      <!-- Roulette Game -->
      <div v-else class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Live Stream & Animated Roulette Visual -->
        <div class="xl:col-span-3 relative rounded-[40px] overflow-hidden border border-[#E2D9CE] aspect-video group shadow-xl bg-[#1A202C] flex flex-col items-center justify-center p-8">
          <img src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=1200&auto=format&fit=crop" loading="lazy" class="absolute inset-0 w-full h-full object-cover brightness-[0.35] transition-all duration-1000 scale-105" alt="Casino Live">
          
          <div class="absolute top-8 left-8 flex items-center gap-3 z-10">
            <div class="bg-rose-600 text-white px-3.5 py-1.5 rounded-lg text-[10px] font-black tracking-widest animate-pulse shadow-md">LIVE HD</div>
            <div class="bg-black/60 backdrop-blur-xl px-3.5 py-1.5 rounded-lg text-[10px] font-bold text-gray-200 border border-white/10 uppercase tracking-[0.2em]">Platinum Roulette #04</div>
          </div>

          <!-- Wheel Animation Visual -->
          <div class="relative z-10 text-center space-y-6">
            <div 
              class="w-44 h-44 md:w-52 md:h-52 rounded-full border-6 border-orange-400 flex items-center justify-center text-5xl font-black bg-gradient-to-br from-rose-700 via-stone-900 to-rose-700 shadow-[0_0_60px_rgba(255,122,0,0.45)] transition-all duration-[3000ms]"
              :style="{ transform: isSpinning ? 'rotate(1440deg)' : 'rotate(0deg)' }"
            >
              <span class="text-white drop-shadow-2xl">{{ displayNum !== null ? displayNum : '🎯' }}</span>
            </div>
            <div class="text-xs font-black uppercase tracking-widest text-[#FFA15C] drop-shadow-sm">
              {{ isSpinning ? 'SPINNING WHEEL...' : displayNum !== null ? `RESULT: NUMBER ${displayNum}` : 'PLACE YOUR BET & SPIN' }}
            </div>
          </div>

          <!-- Recent Numbers History -->
          <div class="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
            <div>
              <div class="text-[9px] font-black text-gray-300 uppercase tracking-[0.25em]">24H VOLUME</div>
              <div class="text-2xl md:text-3xl font-black text-white font-mono">$1,842,500.00</div>
            </div>
            <div class="flex gap-2">
              <div v-for="(num, idx) in history" :key="idx" class="w-9 h-9 rounded-full flex items-center justify-center font-black text-xs border border-white/20 shadow-md" :class="num === 0 ? 'bg-emerald-600 text-white' : num % 2 === 0 ? 'bg-rose-600 text-white' : 'bg-black text-white'">
                {{ num }}
              </div>
            </div>
          </div>
        </div>

        <!-- Roulette Betting Terminal -->
        <div class="bg-white rounded-[40px] p-8 flex flex-col justify-between border border-[#E2D9CE] shadow-lg relative overflow-hidden">
          <div class="space-y-6">
            <div class="flex justify-between items-center border-b border-[#EFE8DF] pb-4">
              <h3 class="font-black text-xs uppercase tracking-[0.25em] text-[#718096]">Terminal 01</h3>
              <div class="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <button 
                  @click="selectedBet = 'red'"
                  class="border-2 py-4 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-xs cursor-pointer"
                  :class="selectedBet === 'red' ? 'bg-rose-600 border-rose-600 text-white scale-103 shadow-md' : 'bg-rose-50 border-rose-200 text-rose-600 hover:bg-rose-100'"
                >RED (2x)</button>
                <button 
                  @click="selectedBet = 'black'"
                  class="border-2 py-4 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-xs cursor-pointer"
                  :class="selectedBet === 'black' ? 'bg-[#1A202C] border-[#1A202C] text-white scale-103 shadow-md' : 'bg-stone-100 border-stone-300 text-[#1A202C] hover:bg-stone-200'"
                >BLACK (2x)</button>
              </div>

              <div>
                <label class="text-[10px] text-[#718096] font-black uppercase tracking-widest mb-2 block">Chip Wager ($)</label>
                <div class="relative">
                  <input type="number" min="1" v-model.number="wager" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 px-5 font-black outline-none focus:border-[#FF7A00] text-xl text-[#1A202C]">
                  <span class="absolute right-5 top-1/2 -translate-y-1/2 text-[#FF7A00] font-black text-xl">$</span>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-2">
                <button v-for="c in [10, 50, 100, 500]" :key="c" @click="wager = c" class="py-2 bg-orange-50 hover:bg-orange-500 hover:text-white rounded-xl text-xs font-black transition-all border border-orange-200 text-[#FF7A00] cursor-pointer">
                  ${{ c }}
                </button>
              </div>
            </div>
          </div>

          <button 
            @click="spinRoulette" 
            :disabled="isSpinning || !selectedBet"
            class="btn-primary w-full py-4 text-xs uppercase tracking-[0.2em] shadow-md disabled:opacity-30 disabled:cursor-not-allowed mt-8 cursor-pointer"
          >
            {{ isSpinning ? 'SPINNING...' : 'SPIN WHEEL' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import CrashGame from './CrashGame.vue'
import MinesGame from './MinesGame.vue'

const props = defineProps({
  balance: Number
})

const emit = defineEmits(['place-bet', 'balance-update'])

const Swal = window.Swal || alert

const activeGame = ref('roulette')
const selectedBet = ref('red')
const wager = ref(50)
const isSpinning = ref(false)
const displayNum = ref(null)
const history = ref([32, 15, 19, 4, 21, 0, 7])

const playSound = (freq, duration, type='sine') => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.setValueAtTime(freq, ctx.currentTime)
    gain.gain.setValueAtTime(0.1, ctx.currentTime)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + duration)
  } catch (e) {}
}

const handleDeductBalance = (amount) => {
  emit('balance-update', props.balance - amount)
}

const handleAddBalance = (amount) => {
  emit('balance-update', props.balance + amount)
}

const spinRoulette = () => {
  if (wager.value <= 0) return
  if (props.balance < wager.value) {
    if (typeof window.Swal !== 'undefined') {
      window.Swal.fire({ title: 'Insufficient Balance', text: 'Please deposit funds to place bets.', icon: 'error', background: '#FFFFFF', color: '#1A202C', confirmButtonColor: '#FF7A00' })
    }
    return
  }

  handleDeductBalance(wager.value)
  isSpinning.value = true
  playSound(400, 0.2, 'square')

  setTimeout(() => {
    isSpinning.value = false
    const num = Math.floor(Math.random() * 37)
    displayNum.value = num
    history.value.unshift(num)
    if (history.value.length > 7) history.value.pop()

    const color = num === 0 ? 'green' : (num % 2 === 0 ? 'red' : 'black')
    const isWin = selectedBet.value === color

    if (isWin) {
      const winAmt = wager.value * 2
      handleAddBalance(winAmt)
      playSound(800, 0.4, 'triangle')
      if (typeof window.Swal !== 'undefined') {
        window.Swal.fire({ title: '🎯 ROULETTE WIN!', text: `Number ${num} (${color.toUpperCase()})! Won $${winAmt}!`, icon: 'success', background: '#FFFFFF', color: '#1A202C', confirmButtonColor: '#FF7A00' })
      }
    } else {
      playSound(150, 0.3, 'sawtooth')
      if (typeof window.Swal !== 'undefined') {
        window.Swal.fire({ title: 'BET LOST', text: `Number ${num} (${color.toUpperCase()}).`, icon: 'error', background: '#FFFFFF', color: '#1A202C', confirmButtonColor: '#FF7A00' })
      }
    }
  }, 2500)
}
</script>
