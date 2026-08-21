<template>
  <div class="fixed inset-0 z-[250] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-md" @click="$emit('close')"></div>
    
    <div class="relative w-full max-w-4xl bg-white p-10 rounded-[40px] border border-orange-200 text-center animate-in zoom-in duration-300 shadow-2xl overflow-hidden font-outfit">
      <button v-if="step !== 'success'" @click="$emit('close')" class="absolute top-6 right-8 text-[#718096] hover:text-[#1A202C] font-bold text-xl z-10 cursor-pointer">✕</button>
      <button v-if="step === 'payment'" @click="step = 'packages'" class="absolute top-6 left-8 text-[#718096] hover:text-[#1A202C] font-bold text-sm z-10 cursor-pointer">← BACK</button>
      
      <div v-if="step === 'packages'" class="animate-in fade-in slide-in-from-left-10 duration-500">
        <div class="text-gradient font-outfit font-black text-4xl tracking-widest mb-2">NEXYORK BANK</div>
        <p class="text-[10px] font-black text-[#718096] uppercase tracking-[0.4em] mb-10">Purchase Casino Tokens to play in the Elite Arena</p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="pkg in packages" :key="pkg.id" class="bg-[#FAF8F5] p-8 rounded-3xl border border-[#EAE2D7] hover:border-orange-300 transition-all group relative overflow-hidden flex flex-col items-center cursor-pointer shadow-xs hover:shadow-lg" @click="selectPackage(pkg)">
            <div v-if="pkg.popular" class="absolute top-0 w-full bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white text-[9px] font-black py-1 uppercase tracking-widest">Most Popular</div>
            <div class="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mb-6 mt-4 group-hover:scale-110 transition-transform shadow-xs border border-orange-200">
              <i class="fa-solid fa-coins text-4xl text-[#FF7A00]"></i>
            </div>
            <h3 class="text-2xl font-black font-outfit text-[#1A202C] mb-2">{{ pkg.tokens.toLocaleString() }} TOKENS</h3>
            <div class="text-xs text-[#718096] font-bold uppercase tracking-widest mb-8">Play Value</div>
            <div class="btn-primary w-full py-3.5 text-xs font-black tracking-widest mt-auto">BUY FOR ${{ pkg.price }}</div>
          </div>
        </div>
      </div>

      <div v-else-if="step === 'payment'" class="max-w-md mx-auto animate-in fade-in slide-in-from-right-10 duration-500">
        <h3 class="text-2xl font-black mb-6 uppercase font-outfit text-[#1A202C]">Secure Checkout</h3>
        <div class="mb-8 p-4 bg-orange-50 border border-orange-200 rounded-2xl flex justify-between items-center">
          <div class="text-left">
            <div class="text-[10px] text-[#FF7A00] font-black uppercase tracking-widest">Selected Package</div>
            <div class="font-bold text-lg text-[#1A202C]">{{ selectedPackage.tokens.toLocaleString() }} Tokens</div>
          </div>
          <div class="text-xl font-black text-[#FF7A00]">${{ selectedPackage.price }}</div>
        </div>
        
        <div class="space-y-4 text-left">
          <div>
            <label class="text-[10px] text-[#718096] font-black uppercase tracking-widest mb-2 block">Cardholder Name</label>
            <input type="text" placeholder="ALEXANDER VIP" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 px-5 font-black outline-none focus:border-[#FF7A00] transition-all tracking-widest uppercase text-sm text-[#1A202C]">
          </div>
          <div>
            <label class="text-[10px] text-[#718096] font-black uppercase tracking-widest mb-2 block">Card Details</label>
            <input type="text" placeholder="XXXX XXXX XXXX XXXX" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 px-5 font-black outline-none focus:border-[#FF7A00] transition-all tracking-widest text-sm mb-4 text-center text-[#1A202C]">
            <div class="grid grid-cols-2 gap-4">
              <input type="text" placeholder="MM/YY" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 px-5 font-black outline-none focus:border-[#FF7A00] transition-all text-center text-[#1A202C]">
              <input type="text" placeholder="CVV" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 px-5 font-black outline-none focus:border-[#FF7A00] transition-all text-center text-[#1A202C]">
            </div>
          </div>
        </div>
        <button @click="handleBuy" :disabled="loading" class="btn-primary w-full py-4 text-xs uppercase tracking-[0.25em] mt-8 cursor-pointer">
          {{ loading ? 'AUTHORIZING...' : 'PAY NOW' }}
        </button>
      </div>

      <div v-else-if="step === 'success'" class="max-w-md mx-auto py-10 animate-in zoom-in duration-500">
        <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-6"><i class="fa-solid fa-check"></i></div>
        <h3 class="text-2xl font-black mb-2 uppercase font-outfit text-[#1A202C]">Tokens Received!</h3>
        <p class="text-[#5A6474] font-bold mb-8">+{{ selectedPackage.tokens.toLocaleString() }} TKN added to your balance.</p>
        
        <button @click="finish" class="btn-primary w-full py-3.5 text-xs font-black tracking-widest uppercase cursor-pointer">
          RETURN TO CASINO
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['close', 'purchase-success'])

const step = ref('packages')
const selectedPackage = ref(null)
const loading = ref(false)

const packages = [
  { id: 1, tokens: 1000, price: 10, popular: false },
  { id: 2, tokens: 5500, price: 50, popular: true },
  { id: 3, tokens: 12000, price: 100, popular: false }
]

const selectPackage = (pkg) => {
  selectedPackage.value = pkg
  step.value = 'payment'
}

const handleBuy = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    step.value = 'success'
  }, 1200)
}

const finish = () => {
  emit('purchase-success', selectedPackage.value.tokens)
  emit('close')
}
</script>
