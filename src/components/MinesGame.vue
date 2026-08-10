<template>
  <div class="glass p-8 md:p-10 rounded-[40px] border-[#F0B90B]/20 shadow-2xl relative overflow-hidden bg-[#0B0E11] text-white font-outfit max-w-5xl mx-auto my-12">
    <div class="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
      <div class="flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 text-xl font-black">
          <i class="fa-solid fa-bomb"></i>
        </div>
        <div>
          <h3 class="text-2xl font-black uppercase text-white tracking-tight">VIP MINESWEEPER</h3>
          <div class="text-[9px] font-black text-purple-400 uppercase tracking-widest">REVEAL GEMS • ESCALATING MULTIPLIER</div>
        </div>
      </div>
      <div class="text-right">
        <div class="text-[9px] font-black text-gray-400 uppercase tracking-widest">CURRENT MULTIPLIER</div>
        <div class="text-2xl font-black text-[#F0B90B]">{{ currentMultiplier.toFixed(2) }}x</div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- 5x5 Mine Grid -->
      <div class="lg:col-span-2 grid grid-cols-5 gap-3 p-4 bg-black/60 rounded-3xl border border-white/10 shadow-inner">
        <button 
          v-for="(tile, idx) in tiles" 
          :key="idx"
          @click="revealTile(idx)"
          :disabled="gameStatus !== 'playing' || tile.revealed"
          class="aspect-square rounded-2xl border transition-all duration-300 flex items-center justify-center text-2xl font-black select-none shadow-lg cursor-pointer"
          :class="tile.revealed 
            ? (tile.isMine ? 'bg-[#F6465D]/20 border-[#F6465D] animate-bounce' : 'bg-[#0ECB81]/20 border-[#0ECB81] scale-95') 
            : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-[#F0B90B]'"
        >
          <span v-if="tile.revealed">{{ tile.isMine ? '💣' : '💎' }}</span>
          <span v-else class="text-gray-600 text-xs font-bold">{{ idx + 1 }}</span>
        </button>
      </div>

      <!-- Control Panel -->
      <div class="glass p-6 rounded-3xl border-white/10 flex flex-col justify-between space-y-6">
        <div class="space-y-4">
          <div>
            <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Bet Wager ($)</label>
            <div class="relative">
              <input v-model.number="wager" type="number" min="1" :disabled="gameStatus === 'playing'" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-[#F0B90B] text-xl text-white">
              <span class="absolute right-6 top-1/2 -translate-y-1/2 text-[#F0B90B] font-black">$</span>
            </div>
          </div>

          <div>
            <label class="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-2 block">Number of Mines (1 - 24)</label>
            <select v-model.number="mineCount" :disabled="gameStatus === 'playing'" class="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 font-bold text-sm text-white outline-none focus:border-[#F0B90B]">
              <option v-for="n in [1,3,5,10,15,20]" :key="n" :value="n">{{ n }} Mines ({{ ((25-n)/25*100).toFixed(0) }}% Win Chance)</option>
            </select>
          </div>
        </div>

        <div>
          <button 
            v-if="gameStatus !== 'playing'"
            @click="startNewGame"
            class="btn-primary w-full py-5 text-sm uppercase tracking-[0.2em]"
          >
            START MINES GAME (${{ wager }})
          </button>

          <button 
            v-else
            @click="cashOut"
            :disabled="gemsFound === 0"
            class="w-full py-5 bg-[#0ECB81] hover:bg-green-400 text-black font-black text-sm uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_30px_rgba(14,203,129,0.4)] transition-all disabled:opacity-30"
          >
            CASH OUT (${{ (wager * currentMultiplier).toFixed(2) }})
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  balance: Number
})
const emit = defineEmits(['place-bet', 'win'])

const wager = ref(50)
const mineCount = ref(3)
const gameStatus = ref('idle') // 'idle', 'playing', 'won', 'lost'
const tiles = ref(Array.from({ length: 25 }, () => ({ revealed: false, isMine: false })))
const gemsFound = ref(0)
const currentMultiplier = ref(1.00)

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

const startNewGame = () => {
  if (wager.value <= 0) return
  if (props.balance < wager.value) {
    if (typeof window.Swal !== 'undefined') {
      window.Swal.fire({ title: 'Insufficient Balance', text: 'Please deposit funds to play.', icon: 'error', background: '#0B0E11', color: '#fff', confirmButtonColor: '#F0B90B' })
    }
    return
  }

  emit('place-bet', wager.value)

  // Place mines randomly
  const newTiles = Array.from({ length: 25 }, () => ({ revealed: false, isMine: false }))
  let placed = 0
  while (placed < mineCount.value) {
    const r = Math.floor(Math.random() * 25)
    if (!newTiles[r].isMine) {
      newTiles[r].isMine = true
      placed++
    }
  }

  tiles.value = newTiles
  gemsFound.value = 0
  currentMultiplier.value = 1.00
  gameStatus.value = 'playing'
}

const revealTile = (idx) => {
  if (gameStatus.value !== 'playing' || tiles.value[idx].revealed) return

  tiles.value[idx].revealed = true

  if (tiles.value[idx].isMine) {
    // Game lost! Reveal all mines
    gameStatus.value = 'lost'
    tiles.value.forEach(t => t.revealed = true)
    playSound(150, 0.4, 'sawtooth')
    if (typeof window.Swal !== 'undefined') {
      window.Swal.fire({ title: '💥 BOOM! MINE HIT', text: `Lost $${wager.value}`, icon: 'error', background: '#0B0E11', color: '#fff', confirmButtonColor: '#F0B90B' })
    }
  } else {
    // Gem found!
    gemsFound.value++
    currentMultiplier.value = 1 + (gemsFound.value * (mineCount.value * 0.15))
    playSound(600 + gemsFound.value * 100, 0.1, 'triangle')
  }
}

const cashOut = () => {
  if (gameStatus.value !== 'playing' || gemsFound.value === 0) return
  gameStatus.value = 'won'
  const winAmount = wager.value * currentMultiplier.value
  playSound(900, 0.3, 'sine')
  emit('win', winAmount)

  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: '💎 MINES CASH OUT!',
      text: `Won $${winAmount.toFixed(2)} (${currentMultiplier.value.toFixed(2)}x)!`,
      icon: 'success',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B'
    })
  }
}
</script>
