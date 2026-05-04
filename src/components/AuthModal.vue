<template>
  <div class="fixed inset-0 z-[200] flex items-center justify-center p-4">
    <div class="absolute inset-0 bg-black/80 backdrop-blur-md"></div>
    
    <div class="relative w-full max-w-md glass p-10 rounded-[40px] border-primary/20 text-center animate-in zoom-in duration-300 shadow-2xl">
      <div class="text-gradient font-outfit font-black text-4xl tracking-widest mb-2">NEXYORK</div>
      <p class="text-[10px] font-black text-gray-500 uppercase tracking-[0.4em] mb-10">
        {{ view === 'login' ? 'Sign in to your account' : view === 'register' ? 'Join the elite arena' : 'Recover your account' }}
      </p>
      
      <div class="space-y-4">
        <div v-if="view === 'register'" class="relative">
          <i class="fa-solid fa-user absolute left-5 top-1/2 -translate-y-1/2 text-gray-600"></i>
          <input v-model="form.username" type="text" placeholder="USERNAME" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 font-black outline-none focus:border-primary transition-all placeholder:text-gray-700 text-sm tracking-widest uppercase">
        </div>
        <div class="relative">
          <i class="fa-solid fa-envelope absolute left-5 top-1/2 -translate-y-1/2 text-gray-600"></i>
          <input v-model="form.email" type="email" placeholder="EMAIL ADDRESS" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 font-black outline-none focus:border-primary transition-all placeholder:text-gray-700 text-sm tracking-widest uppercase">
        </div>
        <div v-if="view !== 'forgot'" class="relative">
          <i class="fa-solid fa-lock absolute left-5 top-1/2 -translate-y-1/2 text-gray-600"></i>
          <input v-model="form.password" type="password" placeholder="PASSWORD" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 font-black outline-none focus:border-primary transition-all placeholder:text-gray-700 text-sm tracking-widest uppercase">
        </div>
        <div v-if="view === 'reset'" class="relative">
          <i class="fa-solid fa-key absolute left-5 top-1/2 -translate-y-1/2 text-gray-600"></i>
          <input v-model="form.newPassword" type="password" placeholder="NEW PASSWORD" class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 font-black outline-none focus:border-primary transition-all placeholder:text-gray-700 text-sm tracking-widest uppercase">
        </div>
        
        <div v-if="error" class="text-red-500 text-[10px] font-black uppercase tracking-widest animate-pulse flex items-center justify-center gap-2"><i class="fa-solid fa-circle-exclamation"></i> {{ error }}</div>

        <button 
          @click="handleSubmit"
          :disabled="loading"
          class="btn-primary w-full py-5 text-sm uppercase tracking-widest mt-6"
        >
          <i class="fa-solid fa-right-to-bracket mr-2" v-if="view === 'login' && !loading"></i>
          <i class="fa-solid fa-user-plus mr-2" v-if="view === 'register' && !loading"></i>
          <i class="fa-solid fa-paper-plane mr-2" v-if="view === 'forgot' && !loading"></i>
          <i class="fa-solid fa-shield-halved mr-2" v-if="view === 'reset' && !loading"></i>
          {{ loading ? 'PROCESSING...' : (view === 'login' ? 'ENTER ARENA' : view === 'register' ? 'CREATE ACCOUNT' : view === 'forgot' ? 'SEND RESET LINK' : 'UPDATE PASSWORD') }}
        </button>
      </div>
      
      <div class="mt-8 flex flex-col gap-3">
        <p v-if="view !== 'forgot'" class="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
          {{ view === 'login' ? "Don't have an account?" : "Already a member?" }} 
          <span @click="view = view === 'login' ? 'register' : 'login'" class="text-primary cursor-pointer hover:underline">{{ view === 'login' ? 'SIGN UP' : 'LOG IN' }}</span>
        </p>
        <p v-if="view === 'login'" @click="view = 'forgot'" class="text-[9px] text-gray-600 font-black cursor-pointer hover:text-white uppercase tracking-widest"><i class="fa-solid fa-circle-question mr-1"></i>Forgot Password?</p>
        <p v-if="view === 'forgot' || view === 'reset'" @click="view = 'login'" class="text-[9px] text-gray-600 font-black cursor-pointer hover:text-white uppercase tracking-widest"><i class="fa-solid fa-arrow-left mr-1"></i> Back to Login</p>
      </div>

      <div class="mt-8 pt-8 border-t border-white/5 flex items-center justify-center gap-4">
        <div class="flex items-center gap-2">
          <i class="fa-solid fa-shield-halved text-green-500 text-xs"></i>
          <span class="text-[9px] font-black text-gray-600 uppercase tracking-widest">256-bit SSL Encrypted</span>
        </div>
        <div class="w-1 h-1 bg-white/20 rounded-full"></div>
        <div class="flex items-center gap-2">
          <span class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          <span class="text-[9px] font-black text-gray-600 uppercase tracking-widest">{{ userCount }} LIVE PLAYERS</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { apiService } from '../services/api'

defineProps({
  userCount: Number
})

const emit = defineEmits(['login-success'])

const view = ref('login') // 'login', 'register', 'forgot', 'reset'
const loading = ref(false)
const error = ref('')
const form = reactive({
  username: '',
  email: '',
  password: '',
  newPassword: ''
})

const Swal = window.Swal

const handleSubmit = async () => {
  loading.value = true
  error.value = ''
  
  try {
    if (view.value === 'login') {
      const res = await apiService.login({ email: form.email, password: form.password })
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      emit('login-success', res.data.user)
    } else if (view.value === 'register') {
      const res = await apiService.register(form)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      emit('login-success', res.data.user)
    } else if (view.value === 'forgot') {
      const res = await apiService.forgotPassword(form.email)
      Swal.fire({ title: 'Success', text: res.data.message, icon: 'success', background: '#111', color: '#fff' })
      view.value = 'reset' // For demo, jump to reset
    } else if (view.value === 'reset') {
      const res = await apiService.resetPassword(form.email, form.newPassword)
      Swal.fire({ title: 'Success', text: res.data.message, icon: 'success', background: '#111', color: '#fff' })
      view.value = 'login'
    }
  } catch (err) {
    error.value = err.response?.data?.error || 'Authentication failed'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
</style>
