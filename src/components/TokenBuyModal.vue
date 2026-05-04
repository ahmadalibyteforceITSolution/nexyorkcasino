<template>
  <div class="fixed inset-0 z-[250] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="$emit('close')"></div>
    
    <div class="relative w-full max-w-4xl glass p-10 rounded-[40px] border-primary/20 text-center animate-in zoom-in duration-300 shadow-2xl overflow-hidden">
      <button v-if="step !== 'success'" @click="$emit('close')" class="absolute top-6 right-8 text-gray-500 hover:text-white font-bold text-xl z-10">✕</button>
      <button v-if="step === 'payment'" @click="step = 'packages'" class="absolute top-6 left-8 text-gray-500 hover:text-white font-bold text-sm z-10">← BACK</button>
      
      <div v-if="step === 'packages'" class="animate-in fade-in slide-in-from-left-10 duration-500">
        <div class="text-gradient font-outfit font-black text-4xl tracking-widest mb-2">NEXYORK BANK</div>
        <p class="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-10">Purchase Casino Tokens to play in the Elite Arena</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="pkg in packages" :key="pkg.id" class="glass p-8 rounded-3xl border-white/5 hover:border-primary/40 transition-all group relative overflow-hidden flex flex-col items-center cursor-pointer" @click="selectPackage(pkg)">
            <div v-if="pkg.popular" class="absolute top-0 w-full bg-primary text-black text-[9px] font-black py-1 uppercase tracking-widest">Most Popular</div>
            <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform shadow-[0_0_30px_rgba(245,197,24,0.15)]">
              <i class="fa-solid fa-coins text-4xl text-primary"></i>
            </div>
            <h3 class="text-2xl font-black font-outfit text-white mb-2">{{ pkg.tokens.toLocaleString() }} TOKENS</h3>
            <div class="text-xs text-gray-500 font-bold uppercase tracking-widest mb-8">Play Value</div>
            <div class="btn-primary w-full py-4 text-sm font-black tracking-widest mt-auto">BUY FOR ${{ pkg.price }}</div>
          </div>
        </div>
      </div>

      <div v-else-if="step === 'payment'" class="max-w-md mx-auto animate-in fade-in slide-in-from-right-10 duration-500">
        <h3 class="text-2xl font-black mb-6 uppercase font-outfit">Secure Checkout</h3>
        <div class="mb-8 p-4 bg-primary/10 border border-primary/20 rounded-2xl flex justify-between items-center">
          <div class="text-left">
            <div class="text-[10px] text-primary font-black uppercase tracking-widest">Selected Package</div>
            <div class="font-bold text-lg">{{ selectedPackage.tokens.toLocaleString() }} Tokens</div>
          </div>
          <div class="text-xl font-black">${{ selectedPackage.price }}</div>
        </div>
        
        <div class="space-y-4 text-left">
          <div>
            <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Cardholder Name</label>
            <input type="text" placeholder="ALEXANDER VIP" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all tracking-widest uppercase text-sm">
          </div>
          <div>
            <label class="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2 block">Card Details</label>
            <input type="text" placeholder="XXXX XXXX XXXX XXXX" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all tracking-widest text-sm mb-4 text-center">
            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="MM/YY" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-center">
              <input type="text" placeholder="CVV" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 font-black outline-none focus:border-primary transition-all text-center">
            </div>
          </div>
        </div>
        <button @click="handleBuy" :disabled="loading" class="btn-primary w-full py-6 text-sm uppercase tracking-[0.3em] mt-8">
          {{ loading ? 'AUTHORIZING...' : 'PAY NOW' }}
        </button>
      </div>

      <div v-else-if="step === 'success'" class="max-w-md mx-auto py-10 animate-in zoom-in duration-500">
        <div class="w-24 h-24 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center text-5xl mx-auto mb-6"><i class="fa-solid fa-check"></i></div>
        <h3 class="text-3xl font-black mb-2 uppercase font-outfit text-white">Tokens Received!</h3>
        <p class="text-gray-400 font-bold mb-8">+{{ selectedPackage.tokens.toLocaleString() }} TKN added to your balance.</p>
        
        <div class="flex items-center justify-center gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl mb-8">
          <i class="fa-solid fa-envelope text-xl"></i>
          <span class="text-xs font-black text-gray-300 uppercase tracking-widest">Receipt sent to your Gmail</span>
        </div>
        
        <button @click="$emit('close')" class="btn-primary w-full py-5 text-sm uppercase tracking-widest">Return to Arena</button>
      </div>
      
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

const emit = defineEmits(['close', 'purchase-success'])
const loading = ref(false)
const step = ref('packages') // 'packages', 'payment', 'success'
const selectedPackage = ref(null)

const packages = [
  { id: 1, tokens: 1000, price: 10, popular: false },
  { id: 2, tokens: 5000, price: 45, popular: true },
  { id: 3, tokens: 15000, price: 120, popular: false }
]

const selectPackage = (pkg) => {
  selectedPackage.value = pkg
  step.value = 'payment'
}

const handleBuy = async () => {
  loading.value = true
  try {
    const token = localStorage.getItem('token')
    const res = await axios.post('http://localhost:5000/api/buy-tokens', { amount: selectedPackage.value.price, tokens: selectedPackage.value.tokens }, {
      headers: { 'x-auth-token': token }
    })
    
    const user = JSON.parse(localStorage.getItem('user'))
    user.tokens = res.data.tokens
    localStorage.setItem('user', JSON.stringify(user))
    
    emit('purchase-success', res.data.tokens)
    step.value = 'success'
  } catch (err) {
    alert(err.response?.data?.error || 'Purchase failed')
  } finally {
    loading.value = false
  }
}
</script>
