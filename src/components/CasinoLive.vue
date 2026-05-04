<template>
  <section id="casino" class="py-32 relative overflow-hidden bg-dark">
    <!-- Sexy Background Light -->
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-primary/5 blur-[150px] -z-10"></div>

    <div class="container mx-auto px-4">
      <div class="text-center mb-20">
        <div class="text-primary font-black text-xs tracking-[0.4em] uppercase mb-4">High Stakes Only</div>
        <h2 class="font-outfit text-6xl md:text-8xl font-black mb-6 uppercase leading-none">
          LIVE <span class="text-gradient">LOUNGE</span>
        </h2>
        <p class="text-gray-400 max-w-xl mx-auto text-lg">The most exclusive digital casino floor. Real-time dealers, glamorous tables, and massive wins.</p>
      </div>

      <div class="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <!-- Live Stream with Sexy Visuals -->
        <div class="xl:col-span-3 relative rounded-[60px] overflow-hidden border border-white/10 aspect-video group shadow-2xl bg-dark-card">
          <img src="https://images.unsplash.com/photo-1596838132731-3301c3fd4317?q=80&w=1200&auto=format&fit=crop" class="w-full h-full object-cover brightness-[0.4] group-hover:scale-110 transition-transform duration-1000" alt="Casino Live">
          
          <div class="absolute inset-0 bg-gradient-to-t from-dark/90 via-transparent to-transparent"></div>
          
          <div class="absolute top-10 left-10 flex items-center gap-6">
            <div class="bg-red-600 px-4 py-1.5 rounded-lg text-[10px] font-black tracking-widest animate-pulse shadow-lg shadow-red-600/30">LIVE HD</div>
            <div class="bg-black/60 backdrop-blur-xl px-4 py-1.5 rounded-lg text-[10px] font-bold text-gray-300 border border-white/5 uppercase tracking-[0.2em]">Platinum Roulette #04</div>
          </div>

          <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
            <transition name="pop">
              <div v-if="newNumber !== null" class="w-40 h-40 bg-primary rounded-full flex items-center justify-center text-7xl font-black text-black shadow-[0_0_80px_rgba(245,197,24,0.6)] border-[10px] border-white/20">
                {{ newNumber }}
              </div>
            </transition>
          </div>

          <div class="absolute bottom-10 left-10 right-10 flex justify-between items-end">
            <div class="space-y-2">
              <div class="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Table Volume</div>
              <div class="text-5xl font-black text-white tracking-tighter">$142,500.00</div>
            </div>
            <div class="flex gap-3">
              <div v-for="(num, idx) in lastNumbers" :key="idx" class="w-12 h-12 rounded-full flex items-center justify-center font-black text-sm border-2 border-white/10 transition-all duration-700 shadow-xl" :class="num % 2 === 0 ? 'bg-red-600' : 'bg-black'">
                {{ num }}
              </div>
            </div>
          </div>
        </div>

        <!-- Betting Panel -->
        <div class="glass rounded-[60px] p-10 flex flex-col justify-between border-primary/20 shadow-2xl relative overflow-hidden">
          <div v-if="betResult" class="absolute inset-0 bg-dark/95 flex flex-col items-center justify-center z-20 animate-in zoom-in duration-300 text-center p-6">
            <div class="text-6xl mb-4">
              <i v-if="betResult.win" class="fa-solid fa-trophy text-primary"></i>
              <i v-else class="fa-solid fa-sack-dollar text-red-500"></i>
            </div>
            <h4 class="text-2xl font-black mb-2 uppercase">{{ betResult.win ? 'BIG WIN!' : 'BET LOST' }}</h4>
            <p class="text-gray-400 font-bold mb-6">{{ betResult.win ? `+$${wager * 2}` : `-$${wager}` }}</p>
            <button @click="betResult = null" class="btn-primary py-3 px-8 text-xs">TRY AGAIN</button>
          </div>

          <div class="space-y-8">
            <div class="flex justify-between items-center">
              <h3 class="font-black text-xs uppercase tracking-[0.3em] text-gray-500">Terminal 01</h3>
              <div class="w-2 h-2 bg-primary rounded-full animate-ping"></div>
            </div>
            
            <div class="space-y-4">
              <div class="grid grid-cols-2 gap-4">
                <button 
                  @click="selectedColor = 'red'"
                  class="border-2 py-6 rounded-[32px] font-black transition-all text-sm uppercase tracking-widest shadow-lg"
                  :class="selectedColor === 'red' ? 'bg-red-600 border-white text-white scale-105' : 'bg-red-600/20 border-red-600/30 text-red-600 hover:bg-red-600/40'"
                >Red</button>
                <button 
                  @click="selectedColor = 'black'"
                  class="border-2 py-6 rounded-[32px] font-black transition-all text-sm uppercase tracking-widest"
                  :class="selectedColor === 'black' ? 'bg-white border-white text-black scale-105' : 'bg-black border-white/10 text-white hover:bg-white/10'"
                >Black</button>
              </div>
              
              <div class="pt-6">
                <div class="text-[10px] text-gray-500 font-black mb-3 uppercase tracking-widest">Your Wager</div>
                <div class="relative">
                  <input type="number" v-model="wager" class="w-full bg-white/5 border-2 border-white/5 rounded-2xl py-5 px-6 font-black outline-none focus:border-primary transition-all text-2xl text-white">
                  <span class="absolute right-6 top-1/2 -translate-y-1/2 text-primary font-black text-2xl">$</span>
                </div>
              </div>
            </div>
          </div>

          <button 
            @click="handlePlaceBet" 
            :disabled="isBetting || !selectedColor"
            class="btn-primary w-full py-6 mt-10 text-lg uppercase tracking-[0.2em] shadow-primary/30 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {{ isBetting ? 'BETTING...' : 'PLACE BET' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { apiService } from '../services/api'
import socket from '../socket'

const Swal = window.Swal

const lastNumbers = ref([32, 15, 19, 4, 21]);
const newNumber = ref(null);
const wager = ref(100);
const selectedColor = ref(null);
const isBetting = ref(false);
const betResult = ref(null);

const emit = defineEmits(['place-bet'])

const handlePlaceBet = async () => {
  if (wager.value <= 0) return Swal?.fire({ title: 'Error', text: 'Enter a valid wager', icon: 'error', background: '#111', color: '#fff' });
  if (!selectedColor.value) return Swal?.fire({ title: 'Error', text: 'Select Red or Black', icon: 'error', background: '#111', color: '#fff' });

  isBetting.value = true;
  try {
    const res = await apiService.placeBet({
      match: 'Platinum Roulette (Casino)',
      selection: selectedColor.value.toUpperCase(),
      odds: 2.0,
      stake: wager.value
    });
    
    // Balance is deducted by server
    const user = JSON.parse(localStorage.getItem('user'));
    user.balance = res.data.balance;
    localStorage.setItem('user', JSON.stringify(user));
    
    Swal?.fire({
      title: 'Bet Placed',
      text: 'Waiting for the wheel to spin...',
      icon: 'info',
      background: '#111',
      color: '#fff',
      showConfirmButton: false,
      timer: 2000
    });
  } catch (err) {
    Swal?.fire({ title: 'Error', text: err.response?.data?.error || 'Failed to place bet', icon: 'error', background: '#111', color: '#fff' });
    isBetting.value = false;
  }
};

onMounted(() => {
  socket.on('casinoUpdate', async (data) => {
    newNumber.value = data.number;
    lastNumbers.value.unshift(data.number);
    if (lastNumbers.value.length > 5) lastNumbers.value.pop();
    
    // Check bet result if betting
    if (isBetting.value) {
      const resultColor = data.number === 0 ? 'green' : (data.number % 2 === 0 ? 'red' : 'black');
      const win = selectedColor.value === resultColor;
      betResult.value = { win };
      isBetting.value = false;
      
      if (win) {
        try {
          const res = await apiService.resolveCasinoWin(wager.value * 2);
          
          const user = JSON.parse(localStorage.getItem('user'));
          user.balance = res.data.balance;
          localStorage.setItem('user', JSON.stringify(user));
        } catch (err) {
          console.error("Failed to credit winnings:", err);
        }
      }
    }

    setTimeout(() => {
      newNumber.value = null;
    }, 4000);
  });
});
</script>

<style scoped>
.pop-enter-active { animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.pop-leave-active { animation: pop-in 0.3s reverse ease-in; }

@keyframes pop-in {
  0% { transform: scale(0) rotate(-45deg); opacity: 0; }
  100% { transform: scale(1) rotate(0); opacity: 1; }
}
</style>
