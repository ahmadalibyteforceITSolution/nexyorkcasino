<template>
  <div class="fixed inset-0 z-[300] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md" @click="$emit('close')"></div>

    <div class="relative w-full max-w-md glass p-8 rounded-[35px] border-[#F0B90B]/30 text-center animate-in zoom-in duration-300 shadow-2xl bg-[#0B0E11]">
      <button @click="$emit('close')" class="absolute top-6 right-6 text-gray-500 hover:text-white font-bold text-lg">✕</button>

      <div class="w-16 h-16 bg-[#F0B90B]/10 text-[#F0B90B] rounded-full flex items-center justify-center text-3xl mx-auto mb-4 border border-[#F0B90B]/20">
        <i class="fa-solid fa-shield-halved text-[#F0B90B]"></i>
      </div>

      <h3 class="text-2xl font-black uppercase text-white font-outfit mb-2">2FA Security Check</h3>
      <p class="text-gray-400 text-xs font-medium mb-6">
        Enter the 6-digit Google Authenticator code sent to your registered device to authorize this transaction.
      </p>

      <div class="flex justify-center gap-2 mb-6">
        <input 
          v-for="(digit, idx) in otp" 
          :key="idx"
          :ref="el => inputRefs[idx] = el"
          v-model="otp[idx]"
          type="text"
          maxLength="1"
          class="w-12 h-14 bg-white/5 border border-white/10 rounded-xl text-center text-2xl font-black font-mono text-[#F0B90B] focus:border-[#F0B90B] outline-none transition-all"
          @input="handleInput(idx, $event)"
          @keydown.delete="handleDelete(idx, $event)"
        />
      </div>

      <button 
        @click="verifyPin" 
        :disabled="isVerifying || otp.join('').length < 6"
        class="btn-primary w-full py-4 text-xs uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed"
      >
        {{ isVerifying ? 'VERIFYING...' : 'VERIFY & AUTHORIZE' }}
      </button>

      <div class="mt-4 text-[10px] text-gray-500 font-bold uppercase tracking-wider">
        Protected by Binance Multi-Factor Vault
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick } from 'vue'

const emit = defineEmits(['close', 'verified'])

const otp = reactive(['', '', '', '', '', ''])
const inputRefs = reactive([])
const isVerifying = ref(false)

const handleInput = (idx, event) => {
  const val = event.target.value
  if (val && idx < 5) {
    nextTick(() => {
      inputRefs[idx + 1]?.focus()
    })
  }
}

const handleDelete = (idx, event) => {
  if (!otp[idx] && idx > 0) {
    nextTick(() => {
      inputRefs[idx - 1]?.focus()
    })
  }
}

const verifyPin = () => {
  isVerifying.value = true
  setTimeout(() => {
    isVerifying.value = false
    emit('verified', otp.join(''))
  }, 1000)
}
</script>
