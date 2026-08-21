<template>
  <div class="fixed bottom-10 left-10 z-[150] flex flex-col items-start gap-4 pointer-events-none font-outfit">
    <!-- Activity Feed -->
    <div class="w-72 space-y-2">
      <transition-group name="list">
        <div v-for="bet in recentBets" :key="bet.id" class="bg-white/95 p-3.5 rounded-2xl border border-orange-200 pointer-events-auto animate-in slide-in-from-left duration-500 shadow-md">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center text-[10px] font-black text-[#FF7A00] uppercase">{{ bet.user[0] }}</div>
            <div class="flex-1 min-w-0">
              <div class="text-[10px] font-black text-[#718096] uppercase truncate">{{ bet.user }} PLACED BET</div>
              <div class="text-xs font-black text-[#1A202C] truncate">${{ bet.amount }} on {{ bet.selection }}</div>
            </div>
          </div>
        </div>
      </transition-group>
    </div>

    <!-- Chat Toggle -->
    <button @click="showChat = !showChat" class="w-13 h-13 bg-gradient-to-tr from-[#FF7A00] to-[#FFA15C] rounded-full shadow-[0_8px_25px_rgba(255,122,0,0.4)] flex items-center justify-center pointer-events-auto hover:scale-105 transition-transform cursor-pointer text-white">
      <i class="fa-solid fa-comments text-xl"></i>
    </button>

    <!-- Chat Window -->
    <div v-if="showChat" class="w-80 h-[450px] bg-white rounded-[32px] border border-orange-200 flex flex-col pointer-events-auto animate-in slide-in-from-bottom-10 duration-300 shadow-2xl overflow-hidden">
      <div class="p-4 border-b border-[#EFE8DF] flex justify-between items-center bg-orange-50/80">
        <div class="flex gap-4">
          <button @click="activeTab = 'chat'" :class="activeTab === 'chat' ? 'text-[#FF7A00] font-black' : 'text-[#718096]'" class="text-xs uppercase tracking-widest transition-colors cursor-pointer">Global Lounge</button>
          <button @click="activeTab = 'players'" :class="activeTab === 'players' ? 'text-[#FF7A00] font-black' : 'text-[#718096]'" class="text-xs uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer">Players <span class="bg-orange-100 text-[#FF7A00] px-1.5 py-0.5 rounded text-[8px] font-black">{{ onlineUsers?.length || 0 }}</span></button>
        </div>
        <button @click="showChat = false" class="text-[#718096] hover:text-[#1A202C] cursor-pointer">✕</button>
      </div>
      
      <div v-if="activeTab === 'chat'" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar" ref="chatBox">
        <div v-for="msg in messages" :key="msg.id" class="flex flex-col" :class="msg.user === currentUser ? 'items-end' : 'items-start'">
          <div class="text-[8px] font-black text-[#718096] uppercase mb-1">{{ msg.user }} • {{ msg.time }}</div>
          <div class="px-3.5 py-2 rounded-2xl text-xs max-w-[80%]" :class="msg.user === currentUser ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white font-bold' : msg.user === 'SYSTEM' ? 'bg-blue-50 border border-blue-200 text-blue-700 font-bold' : 'bg-[#FAF8F5] border border-[#E2D9CE] text-[#1A202C]'">
            {{ msg.text }}
          </div>
        </div>
      </div>

      <div v-if="activeTab === 'chat'" class="p-3 border-t border-[#EFE8DF] bg-[#FAF8F5]">
        <input 
          v-model="newMessage" 
          @keyup.enter="send" 
          type="text" 
          placeholder="Say something in live lounge..." 
          class="w-full bg-white border border-[#E2D9CE] rounded-xl py-2.5 px-3.5 text-xs font-bold outline-none focus:border-[#FF7A00] transition-all text-[#1A202C]"
        >
      </div>

      <div v-if="activeTab === 'players'" class="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        <div class="text-[10px] text-[#718096] font-bold uppercase mb-3 tracking-widest">Active Players in Arena</div>
        <div v-for="user in onlineUsers" :key="user" class="flex justify-between items-center bg-[#FAF8F5] p-3 rounded-xl border border-[#EAE2D7]">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            <span class="text-xs font-black" :class="user === currentUser ? 'text-[#FF7A00]' : 'text-[#1A202C]'">{{ user }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'

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
  if (!newMessage.value.trim()) return
  emit('send', newMessage.value)
  newMessage.value = ''
}

watch(() => props.messages?.length, async () => {
  await nextTick()
  if (chatBox.value) chatBox.value.scrollTop = chatBox.value.scrollHeight
})
</script>
