<template>
  <section id="casino" class="py-24 relative overflow-hidden bg-[#0B0E11] text-white font-outfit select-none">
    <!-- Background Glow -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[#F0B90B]/5 blur-[150px] -z-10"></div>

    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-16">
        <div class="text-[#F0B90B] font-black text-xs tracking-[0.4em] uppercase mb-4 flex items-center justify-center gap-2">
          <i class="fa-solid fa-crown"></i> HIGH STAKES BINANCE CASINO LOUNGE
        </div>
        <h2 class="text-6xl md:text-8xl font-black mb-6 uppercase leading-none">
          LIVE <span class="text-gradient">LOUNGE</span>
        </h2>
        <p class="text-gray-400 max-w-xl mx-auto text-sm md:text-base font-medium">
          Experience real-time Platinum Roulette with audio synthesis, Rocket Crash, and VIP Mines games.
        </p>
      </div>

      <!-- Game Mode Selector Tabs -->
      <div class="flex justify-center gap-4 mb-12 flex-wrap">
        <button 
          @click="activeGame = 'roulette'"
          :class="activeGame === 'roulette' ? 'bg-[#F0B90B] text-black font-black scale-105' : 'bg-white/5 text-gray-400 hover:text-white'"
          class="px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
        >
          🎲 Platinum Roulette
        </button>
        <button 
          @click="activeGame = 'crash'"
          :class="activeGame === 'crash' ? 'bg-[#F0B90B] text-black font-black scale-105' : 'bg-white/5 text-gray-400 hover:text-white'"
          class="px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
        >
          🚀 Rocket Crash
        </button>
        <button 
          @click="activeGame = 'mines'"
          :class="activeGame === 'mines' ? 'bg-[#F0B90B] text-black font-black scale-105' : 'bg-white/5 text-gray-400 hover:text-white'"
          class="px-8 py-3.5 rounded-2xl text-xs uppercase tracking-widest transition-all shadow-lg flex items-center gap-2"
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
        <div class="xl:col-span-3 relative rounded-[50px] overflow-hidden border border-white/10 aspect-video group shadow-2xl bg-black/80 flex flex-col items-center justify-center p-8">
          <img src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=1200&auto=format&fit=crop" loading="lazy" class="absolute inset-0 w-full h-full object-cover brightness-[0.25] transition-all duration-1000 scale-105" alt="Casino Live">
          
          <div class="absolute top-8 left-8 flex items-center gap-4 z-10">
            <div class="bg-[#F6465D] px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest animate-pulse shadow-lg">LIVE HD</div>
            <div class="bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-lg text-[10px] font-bold text-gray-300 border border-white/5 uppercase tracking-[0.2em]">Platinum Roulette #04</div>
          </div>

          <!-- Wheel Animation Visual -->
          <div class="relative z-10 text-center space-y-6">
            <div 
              class="w-48 h-48 md:w-56 md:h-56 rounded-full border-8 border-[#F0B90B] flex items-center justify-center text-6xl font-black bg-gradient-to-br from-red-600 via-black to-red-600 shadow-[0_0_80px_rgba(240,185,11,0.5)] transition-all duration-[3000ms]"
              :style="{ transform: isSpinning ? 'rotate(1440deg)' : 'rotate(0deg)' }"
            >
              <span class="text-white drop-shadow-2xl">{{ displayNum !== null ? displayNum : '🎯' }}</span>
            </div>
            <div class="text-xs font-black uppercase tracking-widest text-[#F0B90B]">
              {{ isSpinning ? 'SPINNING WHEEL...' : displayNum !== null ? `RESULT: NUMBER ${displayNum}` : 'PLACE YOUR BET & SPIN' }}
            </div>
          </div>

          <!-- Recent Numbers History -->
          <div class="absolute bottom-8 left-8 right-8 flex justify-between items-end z-10">
            <div>
              <div class="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em]">24H VOLUME</div>
              <div class="text-2xl md:text-3xl font-black text-white font-mono">$1,842,500.00</div>
            </div>
            <div class="flex gap-2">
              <div v-for="(num, idx) in history" :key="idx" class="w-10 h-10 rounded-full flex items-center justify-center font-black text-xs border border-white/20 shadow-xl" :class="num === 0 ? 'bg-green-600 text-white' : num % 2 === 0 ? 'bg-[#F6465D] text-white' : 'bg-black text-white'">
                {{ num }}
              </div>
            </div>
          </div>
        </div>

        <!-- Roulette Betting Terminal -->
        <div class="glass rounded-[50px] p-8 flex flex-col justify-between border-[#F0B90B]/20 shadow-2xl relative overflow-hidden bg-[#161618]">
          <div class="space-y-6">
            <div class="flex justify-between items-center border-b border-white/5 pb-4">
              <h3 class="font-black text-xs uppercase tracking-[0.3em] text-gray-400">Terminal 01</h3>
              <div class="w-2 h-2 bg-[#0ECB81] rounded-full animate-ping"></div>
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-3">
                <button 
                  @click="selectedBet = 'red'"
                  class="border-2 py-5 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-lg"
                  :class="selectedBet === 'red' ? 'bg-[#F6465D] border-white text-white scale-105' : 'bg-[#F6465D]/20 border-[#F6465D]/40 text-[#F6465D] hover:bg-[#F6465D]/40'"
                >RED (2x)</button>
                <button 
                  @click="selectedBet = 'black'"
                  class="border-2 py-5 rounded-2xl font-black transition-all text-xs uppercase tracking-widest shadow-lg"
                  :class="selectedBet === 'black' ? 'bg-white border-white text-black scale-105' : 'bg-black border-white/20 text-white hover:bg-white/10'"
                >BLACK (2x)</button>
              </div>

              <div>
                <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Chip Wager ($)</label>
                <div class="relative">
                  <input type="number" min="1" v-model.number="wager" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-[#F0B90B] text-xl text-white">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[#F0B90B] font-black text-xl">$</span>
                </div>
              </div>

              <div class="grid grid-cols-4 gap-2">
                <button v-for="c in [10, 50, 100, 500]" :key="c" @click="wager = c" class="py-2 bg-white/5 hover:bg-[#F0B90B] hover:text-black rounded-xl text-xs font-black transition-all border border-white/5">
                  ${{ c }}
                </button>
              </div>
            </div>
          </div>

          <button 
            @click="spinRoulette" 
            :disabled="isSpinning || !selectedBet"
            class="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em] shadow-[#F0B90B]/30 disabled:opacity-30 disabled:cursor-not-allowed mt-8"
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

const activeGame = ref('roulette') // 'roulette', 'crash', 'mines'
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
      window.Swal.fire({ title: 'Insufficient Balance', text: 'Please deposit funds to place bets.', icon: 'error', background: '#0B0E11', color: '#fff', confirmButtonColor: '#F0B90B' })
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
        window.Swal.fire({ title: '🎯 ROULETTE WIN!', text: `Number ${num} (${color.toUpperCase()})! Won $${winAmt}!`, icon: 'success', background: '#0B0E11', color: '#fff', confirmButtonColor: '#F0B90B' })
      }
    } else {
      playSound(150, 0.3, 'sawtooth')
      if (typeof window.Swal !== 'undefined') {
        window.Swal.fire({ title: 'BET LOST', text: `Number ${num} (${color.toUpperCase()}).`, icon: 'error', background: '#0B0E11', color: '#fff', confirmButtonColor: '#F0B90B' })
      }
    }
  }, 2500)
}
</script>
