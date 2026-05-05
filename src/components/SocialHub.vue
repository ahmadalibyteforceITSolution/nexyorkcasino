<template>
  <div class="fixed bottom-10 right-10 z-[150] flex flex-col items-end gap-4 pointer-events-none">
    <!-- Activity Feed -->
    <div class="w-72 space-y-2">
      <transition-group name="list">
        <div v-for="bet in recentBets" :key="bet.id" class="glass p-4 rounded-2xl border-primary/20 pointer-events-auto animate-in slide-in-from-right duration-500">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center text-[10px] font-black text-primary uppercase">{{ bet.user[0] }}</div>
            <div class="flex-1 min-w-0">
              <div class="text-[10px] font-black text-gray-500 uppercase truncate">{{ bet.user }} PLACED BET</div>
              <div class="text-xs font-bold text-white truncate">${{ bet.amount }} on {{ bet.selection }}</div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Chat Toggle -->
    <button @click="showChat = !showChat" class="w-14 h-14 bg-primary rounded-full shadow-[0_10px_30px_rgba(245,197,24,0.5)] flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform">
      <i class="fa-solid fa-comments text-2xl text-black"></i>
    </button>

    <!-- Chat Window -->
    <div v-if="showChat" class="w-80 h-[450px] glass rounded-[32px] border-primary/20 flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 duration-300">
      <div class="p-5 border-b border-white/5 flex justify-between items-center bg-primary/5 rounded-t-[32px]">
        <div class="flex gap-4">
          <button @click="activeTab = 'chat'" :class="activeTab === 'chat' ? 'text-primary' : 'text-gray-500'" class="font-black text-xs uppercase tracking-widest transition-colors">Global Lounge</button>
          <button @click="activeTab = 'players'" :class="activeTab === 'players' ? 'text-primary' : 'text-gray-500'" class="font-black text-xs uppercase tracking-widest transition-colors flex items-center gap-1">Players <span class="bg-primary text-black px-1.5 py-0.5 rounded text-[8px]">{{ onlineUsers?.length || 0 }}</span></button>
        </div>
        <button @click="showChat = false" class="text-gray-500 hover:text-white">✕</button>
      </div>
      
      <div v-if="activeTab === 'chat'" class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar" ref="chatBox">
        <div v-for="msg in messages" :key="msg.id" class="flex flex-col" :class="msg.user === currentUser ? 'items-end' : 'items-start'">
          <div class="text-[8px] font-black text-gray-500 uppercase mb-1">{{ msg.user }} • {{ msg.time }}</div>
          <div class="px-4 py-2 rounded-2xl text-xs max-w-[80%]" :class="msg.user === currentUser ? 'bg-primary text-black font-bold' : msg.user === 'SYSTEM' ? 'bg-blue-600 border border-blue-500 text-white font-bold' : 'bg-white/5 border border-white/5 text-gray-300'">
            {{ msg.text }}
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'chat'" class="p-4 border-t border-white/5">
        <input 
          v-model="newMessage" 
          @keyup.enter="send" 
          type="text" 
          placeholder="Say something..." 
          class="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-xs font-bold outline-none focus:border-primary transition-all"
        >
      </div>

      <div v-if="activeTab === 'players'" class="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
        <div class="text-[10px] text-gray-400 font-bold uppercase mb-4 tracking-widest">Challenge players to a 50/50 Match</div>
        <div v-for="user in onlineUsers" :key="user" class="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/10">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span class="text-xs font-black" :class="user === currentUser ? 'text-primary' : 'text-white'">{{ user }}</span>
          </div>
          <button v-if="user !== currentUser" @click="challengeUser(user)" class="text-[9px] bg-white/10 hover:bg-primary hover:text-black transition-colors px-3 py-1.5 rounded uppercase font-black tracking-wider">Challenge</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import socket from '../socket'
import { apiService } from '../services/api'

const props = defineProps({
  messages: Array,
  recentBets: Array,
  currentUser: String,
  onlineUsers: Array
})

const emit = defineEmits(['send'])
const showChat = ref(false)
const activeTab = ref('chat')
const newMessage = ref('')
const chatBox = ref(null)

const send = () => {
  if (newMessage.value.trim()) {
    emit('send', newMessage.value)
    newMessage.value = ''
  }
}

const Swal = window.Swal

const challengeUser = async (targetUser) => {
  const { value: amount } = await Swal?.fire({
    title: `Challenge ${targetUser}`,
    text: 'Enter wager amount for a 50/50 Match',
    input: 'number',
    background: '#111', color: '#fff', confirmButtonColor: '#F5C518',
    showCancelButton: true
  })
  if (amount) {
    try {
      await apiService.sendChallenge(targetUser, amount)
      Swal.fire({ title: 'Challenge Sent!', icon: 'success', background: '#111', color: '#fff', showConfirmButton: false, timer: 1500 })
    } catch(err) {
      Swal.fire({ title: 'Error', text: err.response?.data?.error || 'Failed to challenge', icon: 'error', background: '#111', color: '#fff' })
    }
  }
}

watch(() => props.messages.length, async () => {
  await nextTick()
  if (chatBox.value && activeTab.value === 'chat') {
    chatBox.value.scrollTop = chatBox.value.scrollHeight
  }
})

// Listen for challenges directed at us
socket.on('newChallenge', async (challenge) => {
  if (challenge.target === props.currentUser) {
    const res = await Swal.fire({
      title: '⚔️ NEW P2P MATCH!',
      text: `${challenge.challenger} challenged you for $${challenge.amount}!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ACCEPT MATCH',
      cancelButtonText: 'Decline',
      background: '#111', color: '#fff', confirmButtonColor: '#F5C518'
    })
    
    if (res.isConfirmed) {
      try {
        const response = await apiService.acceptChallenge(challenge.id)
        
        Swal.fire({
          title: response.data.winner === props.currentUser ? 'YOU WON! 🏆' : 'YOU LOST 💸',
          text: `The match is over. Result broadcasted to Global Lounge!`,
          icon: response.data.winner === props.currentUser ? 'success' : 'error',
          background: '#111', color: '#fff', confirmButtonColor: '#F5C518'
        })
      } catch(err) {
        Swal.fire({ title: 'Error', text: err.response?.data?.error || 'Failed to accept', icon: 'error', background: '#111', color: '#fff' })
      }
    }
  }
})
</script>

<style scoped>
.list-enter-active, .list-leave-active { transition: all 0.5s ease; }
.list-enter-from { opacity: 0; transform: translateX(30px); }
.list-leave-to { opacity: 0; transform: translateY(-30px); }

.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; }
</style>
