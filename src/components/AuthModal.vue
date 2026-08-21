<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/50 backdrop-blur-md" @click="$emit('close')"></div>
    
    <div class="relative w-full max-w-md bg-white p-10 rounded-[40px] border border-orange-200 text-center animate-in zoom-in duration-300 shadow-2xl">
      <button @click="$emit('close')" aria-label="Close Authentication" class="absolute right-6 top-6 w-9 h-9 bg-[#FAF8F5] border border-[#E2D9CE] rounded-full flex items-center justify-center hover:bg-rose-100 hover:text-rose-600 transition-all cursor-pointer">
        ✕
      </button>

      <div class="text-gradient font-outfit font-black text-4xl tracking-widest mb-2">NEXYORK</div>
      <p class="text-[10px] font-black text-[#718096] uppercase tracking-[0.4em] mb-8">
        {{ view === 'login' ? 'Sign in to your account' : view === 'register' ? 'Join the elite arena' : 'Recover your account' }}
      </p>
      
      <div class="space-y-4">
        <div v-if="view === 'register'" class="relative">
          <i class="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-[#718096]"></i>
          <input v-model="form.username" type="text" aria-label="Username" placeholder="USERNAME" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 pl-12 pr-6 font-black outline-none focus:border-[#FF7A00] transition-all placeholder:text-[#A0AEC0] text-sm tracking-widest uppercase text-[#1A202C]">
        </div>
        <div class="relative">
          <i class="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-[#718096]"></i>
          <input v-model="form.email" type="email" aria-label="Email Address" placeholder="EMAIL ADDRESS" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 pl-12 pr-6 font-black outline-none focus:border-[#FF7A00] transition-all placeholder:text-[#A0AEC0] text-sm tracking-widest uppercase text-[#1A202C]">
        </div>
        <div v-if="view !== 'forgot'" class="relative">
          <i class="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-[#718096]"></i>
          <input v-model="form.password" type="password" aria-label="Password" placeholder="PASSWORD" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 pl-12 pr-6 font-black outline-none focus:border-[#FF7A00] transition-all placeholder:text-[#A0AEC0] text-sm tracking-widest uppercase text-[#1A202C]">
        </div>
        <div v-if="view === 'reset'" class="relative">
          <i class="fa-solid fa-key absolute left-5 top-1/2 -translate-y-1/2 text-[#718096]"></i>
          <input v-model="form.newPassword" type="password" aria-label="New Password" placeholder="NEW PASSWORD" class="w-full bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3.5 pl-12 pr-6 font-black outline-none focus:border-[#FF7A00] transition-all placeholder:text-[#A0AEC0] text-sm tracking-widest uppercase text-[#1A202C]">
        </div>
        
        <div v-if="error" class="text-rose-600 text-[10px] font-black uppercase tracking-widest animate-pulse flex items-center justify-center gap-2"><i class="fa-solid fa-circle-exclamation"></i> {{ error }}</div>

        <button 
          @click="handleSubmit"
          :disabled="loading"
          class="btn-primary w-full py-4 text-xs uppercase tracking-widest mt-4 cursor-pointer"
        >
          <i class="fa-solid fa-right-to-bracket mr-2" v-if="view === 'login' && !loading"></i>
          <i class="fa-solid fa-user-plus mr-2" v-if="view === 'register' && !loading"></i>
          <i class="fa-solid fa-paper-plane mr-2" v-if="view === 'forgot' && !loading"></i>
          <i class="fa-solid fa-shield-halved mr-2" v-if="view === 'reset' && !loading"></i>
          {{ loading ? 'PROCESSING...' : (view === 'login' ? 'ENTER ARENA' : view === 'register' ? 'CREATE ACCOUNT' : view === 'forgot' ? 'SEND RESET LINK' : 'UPDATE PASSWORD') }}
        </button>
      </div>
      
      <div class="mt-6 flex flex-col gap-2">
        <p v-if="view !== 'forgot'" class="text-[10px] text-[#718096] font-bold uppercase tracking-widest">
          {{ view === 'login' ? "Don't have an account?" : "Already a member?" }} 
          <span @click="view = view === 'login' ? 'register' : 'login'" class="text-[#FF7A00] cursor-pointer hover:underline font-black">{{ view === 'login' ? 'SIGN UP' : 'LOG IN' }}</span>
        </p>
        <p v-if="view === 'login'" @click="view = 'forgot'" class="text-[9px] text-[#718096] font-black cursor-pointer hover:text-[#FF7A00] uppercase tracking-widest"><i class="fa-solid fa-circle-question mr-1"></i>Forgot Password?</p>
        <p v-if="view === 'forgot' || view === 'reset'" @click="view = 'login'" class="text-[9px] text-[#718096] font-black cursor-pointer hover:text-[#FF7A00] uppercase tracking-widest"><i class="fa-solid fa-arrow-left mr-1"></i> Back to Login</p>
      </div>

      <div class="mt-6 pt-6 border-t border-[#EFE8DF] flex items-center justify-center gap-4">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-shield-halved text-emerald-600 text-xs"></i>
          <span class="text-[9px] font-black text-[#718096] uppercase tracking-widest">256-bit SSL Encrypted</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { apiService } from '../services/api'

const emit = defineEmits(['close', 'login-success'])

const view = ref('login')
const loading = ref(false)
const error = ref('')

const form = ref({
  username: '',
  email: '',
  password: '',
  newPassword: ''
})

const handleSubmit = async () => {
  error.value = ''
  loading.value = true

  try {
    if (view.value === 'login') {
      const data = await apiService.login({ email: form.value.email, password: form.value.password })
      emit('login-success', data.user)
    } else if (view.value === 'register') {
      const data = await apiService.register({ username: form.value.username, email: form.value.email, password: form.value.password })
      emit('login-success', data.user)
    } else if (view.value === 'forgot') {
      await apiService.forgotPassword(form.value.email)
      view.value = 'reset'
    } else if (view.value === 'reset') {
      await apiService.resetPassword({ email: form.value.email, newPassword: form.value.newPassword })
      view.value = 'login'
    }
  } catch (err) {
    error.value = err.response?.data?.message || err.message || 'Operation failed'
  } finally {
    loading.value = false
  }
}
</script>
