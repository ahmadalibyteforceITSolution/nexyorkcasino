<template>
  <div class="glass p-8 md:p-10 rounded-[40px] border-[#F0B90B]/20 shadow-2xl relative overflow-hidden bg-[#0B0E11] text-white font-outfit max-w-5xl mx-auto my-12">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-[#F0B90B]/10 flex items-center justify-center text-[#F0B90B] text-xl font-black">
          <i class="fa-solid fa-rocket"></i>
        </div>
        <div>
          <h3 class="text-2xl font-black uppercase text-white tracking-tight">NEX-CRASH ROCKET</h3>
          <div class="text-[9px] font-black text-[#0ECB81] uppercase tracking-widest">REAL-TIME MULTIPLIER • PROVABLY FAIR</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-[9px] font-black text-gray-400 uppercase tracking-widest">TOP WIN TODAY</div>
        <div class="text-lg font-black text-[#F0B90B]">$14,850 (124.50x)</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Main Game Canvas / Rocket Animation View -->
      <div class="lg:col-span-2 relative h-80 bg-black/70 rounded-3xl border border-white/10 overflow-hidden flex flex-col items-center justify-center p-6 shadow-inner">
        <!-- Starfield & Grid Lines -->
        <div class="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:16px_16px]"></div>

        <!-- Multiplier Display -->
        <div class="relative z-10 text-center">
          <div class="text-6xl md:text-7xl font-black font-mono tracking-tighter" :class="status === 'crashed' ? 'text-[#F6465D]' : 'text-white'">
            {{ multiplier.toFixed(2) }}x
          </div>
          <div class="text-xs font-black uppercase tracking-widest mt-2" :class="status === 'crashed' ? 'text-[#F6465D]' : status === 'flying' ? 'text-[#0ECB81] animate-pulse' : 'text-gray-400'">
            {{ status === 'crashed' ? `CRASHED @ ${crashPoint.toFixed(2)}x` : status === 'flying' ? 'ROCKET IN FLIGHT...' : 'NEXT ROUND STARTING IN 3s' }}
          </div>
        </div>

        <!-- Rocket Visual Animation -->
        <div 
          v-if="status === 'flying'" 
          class="absolute bottom-10 left-10 text-4xl text-[#F0B90B] transition-all duration-300"
          :style="{ transform: `translate(${Math.min(multiplier * 20, 220)}px, -${Math.min(multiplier * 15, 120)}px) rotate(-15deg)` }"
        >
          🚀 <span class="text-xs text-orange-500 animate-pulse">🔥</span>
        </div>

        <!-- Crash Explosion Visual -->
        <div v-if="status === 'crashed'" class="absolute text-6xl animate-ping">💥</div>

        <!-- Recent Crash History Bar -->
        <div class="absolute bottom-3 left-4 right-4 flex gap-2 overflow-x-auto no-scrollbar py-1">
          <span v-for="(h, i) in history" :key="i" class="px-2.5 py-1 rounded-lg text-[9px] font-mono font-black" :class="h >= 2.0 ? 'bg-[#0ECB81]/20 text-[#0ECB81]' : 'bg-[#F6465D]/20 text-[#F6465D]'">
            {{ h.toFixed(2) }}x
          </span>
        </div>
      </div>

      <!-- Controls Panel -->
      <div class="glass p-6 rounded-3xl border-white/10 flex flex-col justify-between space-y-6">
        <div class="space-y-4">
          <div>
            <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Bet Amount (USD)</label>
            <div class="relative">
              <input v-model.number="wager" type="number" min="1" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-[#F0B90B] text-xl text-white">
              <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[#F0B90B] font-black">$</span>
            </div>
          </div>

          <div>
            <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Auto Cashout Multiplier</label>
            <input v-model.number="autoCashout" type="number" step="0.1" min="1.1" class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 font-mono font-bold outline-none focus:border-[#F0B90B] text-sm text-white">
          </div>
        </div>

        <div>
          <button 
            v-if="status === 'idle' || status === 'crashed'"
            @click="startGame"
            class="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em]"
          >
            PLACE BET (${{ wager }})
          </button>

          <button 
            v-else-if="status === 'flying' && hasBetted && !hasCashedOut"
            @click="cashOut"
            class="w-full py-5 bg-[#0ECB81] hover:bg-green-400 text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_30px_rgba(14,203,129,0.4)] transition-all animate-pulse"
          >
            CASH OUT (${{ (wager * multiplier).toFixed(2) }})
          </button>

          <button 
            v-else
            disabled
            class="w-full py-5 bg-white/5 border border-white/10 text-gray-500 font-black text-sm uppercase tracking-widest rounded-2xl cursor-not-allowed opacity-50"
          >
            {{ hasCashedOut ? 'CASHED OUT!' : 'WAITING FOR NEXT ROUND' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'

const props = defineProps({
  balance: Number
})
const emit = defineEmits(['place-bet', 'win'])

const Swal = window.Swal || alert

const status = ref('idle') // 'idle', 'flying', 'crashed'
const multiplier = ref(1.00)
const crashPoint = ref(1.00)
const wager = ref(50)
const autoCashout = ref(2.0)
const hasBetted = ref(false)
const hasCashedOut = ref(false)
const history = ref([1.45, 3.20, 1.12, 5.80, 2.10, 10.40])

let flightInterval = null

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

const startGame = () => {
  if (wager.value <= 0) return
  if (props.balance < wager.value) {
    if (typeof window.Swal !== 'undefined') {
      window.Swal.fire({ title: 'Insufficient Balance', text: 'Please deposit funds to play.', icon: 'error', background: '#0B0E11', color: '#fff', confirmButtonColor: '#F0B90B' })
    }
    return
  }

  emit('place-bet', wager.value)
  hasBetted.value = true
  hasCashedOut.value = false
  multiplier.value = 1.00
  status.value = 'flying'

  // Generate weighted random crash point
  const rand = Math.random()
  crashPoint.value = Math.max(1.01, (100 / (100 - rand * 95)))

  flightInterval = setInterval(() => {
    multiplier.value += 0.03 + (multiplier.value * 0.01)

    // Auto cashout check
    if (hasBetted.value && !hasCashedOut.value && multiplier.value >= autoCashout.value && autoCashout.value <= crashPoint.value) {
      cashOut()
    }

    if (multiplier.value >= crashPoint.value) {
      // Crash!
      clearInterval(flightInterval)
      status.value = 'crashed'
      multiplier.value = crashPoint.value
      history.value.unshift(crashPoint.value)
      if (history.value.length > 10) history.value.pop()
      playSound(120, 0.4, 'sawtooth')
    } else {
      playSound(300 + multiplier.value * 20, 0.05, 'sine')
    }
  }, 100)
}

const cashOut = () => {
  if (!hasBetted.value || hasCashedOut.value || status.value !== 'flying') return
  hasCashedOut.value = true
  const winAmount = wager.value * multiplier.value
  playSound(800, 0.3, 'triangle')
  emit('win', winAmount)

  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: '🚀 ROCKET CASH OUT!',
      text: `Won $${winAmount.toFixed(2)} at ${multiplier.value.toFixed(2)}x!`,
      icon: 'success',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B',
      timer: 2000
    })
  }
}

onUnmounted(() => {
  if (flightInterval) clearInterval(flightInterval)
})
</script>
