<template>
  <div>
    <!-- Floating Moodboard Toggle Button -->
    <button 
      @click="isOpen = !isOpen"
      @dragover.prevent="isDragHovering = true"
      @dragleave="isDragHovering = false"
      @drop="handleDropOnButton"
      class="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-5 py-3 rounded-full font-black text-xs tracking-widest uppercase transition-all duration-500 shadow-[0_10px_35px_rgba(240,185,11,0.35)] border border-[#F0B90B]/40"
      :class="[
        isOpen ? 'bg-[#161618] text-[#F0B90B]' : 'bg-gradient-to-r from-[#F0B90B] to-[#ffaa00] text-black hover:scale-105',
        isDragHovering ? 'scale-125 ring-4 ring-[#F0B90B] animate-pulse' : ''
      ]"
      title="Pick & Drop VIP Moodboard"
      aria-label="Toggle Moodboard"
    >
      <div class="relative flex items-center justify-center">
        <i class="fa-solid fa-wand-magic-sparkles text-sm" :class="{ 'animate-spin': isDragHovering }"></i>
        <span 
          v-if="pinnedItems.length > 0"
          class="absolute -top-3 -right-3 w-5 h-5 bg-red-600 text-white rounded-full text-[10px] flex items-center justify-center font-black border border-black shadow"
        >
          {{ pinnedItems.length }}
        </span>
      </div>
      <span class="hidden sm:inline font-outfit">{{ isOpen ? 'CLOSE VIP BOARD' : 'VIP MOODBOARD' }}</span>
      <span class="text-[9px] bg-black/20 px-2 py-0.5 rounded-full font-mono text-black font-extrabold hidden md:inline" v-if="!isOpen">
        PICK & DROP
      </span>
    </button>

    <!-- Slide-over Drawer / Canvas -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm bg-black/60 transition-opacity"
      @click.self="isOpen = false"
    >
      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          @dragover.prevent="isDragHovering = true"
          @dragleave="isDragHovering = false"
          @drop="handleDrop"
          class="w-screen max-w-md bg-[#121418] border-l border-white/10 p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-y-auto"
          :class="{ 'ring-4 ring-[#F0B90B]/50 bg-[#1a1d24]': isDragHovering }"
        >
          <!-- Top Header -->
          <div>
            <div class="flex items-center justify-between pb-6 border-b border-white/10">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-[#F0B90B]/20 border border-[#F0B90B]/30 flex items-center justify-center text-[#F0B90B]">
                  <i class="fa-solid fa-gem text-lg"></i>
                </div>
                <div>
                  <h3 class="font-outfit font-black text-lg uppercase tracking-tight text-white flex items-center gap-2">
                    VIP Moodboard <span class="text-[10px] text-[#F0B90B] px-2 py-0.5 rounded bg-[#F0B90B]/10 border border-[#F0B90B]/20">PRO</span>
                  </h3>
                  <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    Pick, Drag & Drop Your Curated Luxury
                  </p>
                </div>
              </div>
              <button 
                @click="isOpen = false" 
                class="w-9 h-9 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white flex items-center justify-center text-sm transition-all"
              >
                ✕
              </button>
            </div>

            <!-- Drag & Drop Dropzone Banner -->
            <div 
              class="mt-6 p-4 rounded-2xl border-2 border-dashed transition-all flex items-center gap-3 text-left"
              :class="isDragHovering ? 'border-[#F0B90B] bg-[#F0B90B]/10 scale-105' : 'border-white/10 bg-white/5'"
            >
              <div class="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#F0B90B] text-base flex-shrink-0">
                <i class="fa-solid fa-hand-pointer animate-bounce"></i>
              </div>
              <div>
                <div class="text-xs font-black uppercase text-white tracking-wide">
                  {{ isDragHovering ? 'Release to Drop into Board!' : 'Drop Photos & Stories Here' }}
                </div>
                <div class="text-[10px] text-gray-400">
                  Drag any blog image, VIP card, or quote into this panel.
                </div>
              </div>
            </div>

            <!-- Items List -->
            <div class="mt-6 space-y-4">
              <div class="flex items-center justify-between text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                <span>Pinned Items ({{ pinnedItems.length }})</span>
                <button 
                  v-if="pinnedItems.length > 0"
                  @click="clearAll" 
                  class="text-red-400 hover:underline text-[10px]"
                >
                  Clear All
                </button>
              </div>

              <!-- Empty State -->
              <div v-if="pinnedItems.length === 0" class="text-center py-12 px-4 rounded-3xl border border-white/5 bg-white/5">
                <i class="fa-regular fa-images text-4xl text-gray-600 mb-3 block"></i>
                <h4 class="text-xs font-black uppercase text-gray-300 mb-1">Your Moodboard is Empty</h4>
                <p class="text-[10px] text-gray-500 max-w-xs mx-auto leading-relaxed">
                  Hover over any magazine story or photo and click <span class="text-[#F0B90B] font-bold">"Pick & Pin"</span> or simply drag & drop items right onto this panel.
                </p>
              </div>

              <!-- Pinned Cards -->
              <div 
                v-for="(item, idx) in pinnedItems" 
                :key="item.id || idx"
                class="group relative rounded-2xl bg-[#1c1f26] border border-white/10 p-3.5 flex gap-3.5 items-center hover:border-[#F0B90B]/50 transition-all shadow-lg"
              >
                <!-- Thumbnail / Image -->
                <div 
                  v-if="item.image"
                  @click="openLightbox(item.image, item.title)"
                  class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer relative group/img border border-white/10"
                >
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover group-hover/img:scale-110 transition-transform">
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-xs">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                  </div>
                </div>

                <!-- Content text -->
                <div class="flex-grow min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[9px] font-black uppercase text-[#F0B90B] bg-[#F0B90B]/10 px-2 py-0.5 rounded">
                      {{ item.category || 'VIP LUXURY' }}
                    </span>
                    <span class="text-[9px] text-gray-500 font-mono">{{ item.type || 'STORY' }}</span>
                  </div>
                  <h5 class="text-xs font-bold text-white truncate group-hover:text-[#F0B90B] transition-colors">
                    {{ item.title }}
                  </h5>
                  <p v-if="item.excerpt" class="text-[10px] text-gray-400 line-clamp-1 mt-0.5">
                    {{ item.excerpt }}
                  </p>
                </div>

                <!-- Remove item -->
                <button 
                  @click="removeItem(idx)" 
                  class="w-7 h-7 rounded-lg bg-white/5 hover:bg-red-500/20 text-gray-500 hover:text-red-400 flex items-center justify-center text-xs flex-shrink-0 transition-colors"
                  title="Remove from board"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-6 mt-6 border-t border-white/10 space-y-3">
            <button 
              @click="copyMoodboardSummary" 
              :disabled="pinnedItems.length === 0"
              class="w-full btn-primary py-3.5 px-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <i class="fa-solid fa-share-nodes"></i>
              SHARE & EXPORT MOODBOARD
            </button>
            <div class="text-[9px] text-center text-gray-500 uppercase tracking-widest font-mono">
              Auto-saves to browser memory & includes SEO citations
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Romance Lightbox Modal -->
    <div 
      v-if="lightboxImage" 
      class="fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
      @click.self="lightboxImage = null"
    >
      <div class="relative max-w-4xl w-full bg-[#121418] rounded-3xl overflow-hidden border border-[#F0B90B]/30 shadow-[0_0_50px_rgba(240,185,11,0.2)]">
        <button 
          @click="lightboxImage = null" 
          class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-[#F0B90B] text-white hover:text-black flex items-center justify-center text-sm transition-all"
        >
          ✕
        </button>
        <div class="relative aspect-video max-h-[70vh] overflow-hidden bg-black">
          <img :src="lightboxImage" :alt="lightboxTitle" class="w-full h-full object-contain">
        </div>
        <div class="p-6 bg-[#161618] flex items-center justify-between">
          <div>
            <div class="text-[10px] font-black uppercase tracking-widest text-[#F0B90B] mb-1">Aesthetic Romance & Luxury Gallery</div>
            <h4 class="text-sm font-black text-white uppercase">{{ lightboxTitle }}</h4>
          </div>
          <div class="flex gap-3">
            <button 
              @click="pinLightboxImage"
              class="px-4 py-2 bg-[#F0B90B] text-black text-xs font-black uppercase rounded-xl tracking-wider hover:scale-105 transition-transform"
            >
              <i class="fa-solid fa-thumbtack mr-1"></i> Pin to Board
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isOpen = ref(false)
const isDragHovering = ref(false)
const pinnedItems = ref([])
const lightboxImage = ref(null)
const lightboxTitle = ref('')

const Swal = window.Swal

// Load saved pins from localStorage
onMounted(() => {
  try {
    const saved = localStorage.getItem('nexyork_vip_moodboard')
    if (saved) {
      pinnedItems.value = JSON.parse(saved)
    }
  } catch (err) {}

  // Global event listener for 1-click pin from any component
  window.addEventListener('nexyork:pick-item', handleExternalPick)
  window.addEventListener('nexyork:open-lightbox', handleExternalLightbox)
})

onUnmounted(() => {
  window.removeEventListener('nexyork:pick-item', handleExternalPick)
  window.removeEventListener('nexyork:open-lightbox', handleExternalLightbox)
})

const saveToStorage = () => {
  try {
    localStorage.setItem('nexyork_vip_moodboard', JSON.stringify(pinnedItems.value))
  } catch (err) {}
}

const handleExternalPick = (event) => {
  if (event.detail) {
    addItem(event.detail)
    // Flash toast
    if (typeof window.Swal !== 'undefined') {
      window.Swal.fire({
        title: '👑 PINNED TO VIP MOODBOARD!',
        text: `"${event.detail.title}" is saved in your VIP Moodboard.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#0B0E11',
        color: '#fff'
      })
    }
  }
}

const handleExternalLightbox = (event) => {
  if (event.detail) {
    openLightbox(event.detail.image, event.detail.title)
  }
}

const addItem = (item) => {
  const exists = pinnedItems.value.some(i => i.title === item.title || (i.slug && i.slug === item.slug))
  if (!exists) {
    pinnedItems.value.unshift({
      id: Date.now(),
      title: item.title || 'Exclusive Romance Story',
      category: item.category || 'Lifestyle',
      excerpt: item.excerpt || '',
      image: item.image || '',
      type: item.type || 'STORY',
      slug: item.slug || ''
    })
    saveToStorage()
  }
}

const removeItem = (idx) => {
  pinnedItems.value.splice(idx, 1)
  saveToStorage()
}

const clearAll = () => {
  pinnedItems.value = []
  saveToStorage()
}

// Drag & Drop handlers
const handleDrop = (e) => {
  isDragHovering.value = false
  e.preventDefault()
  try {
    const rawData = e.dataTransfer.getData('application/json')
    if (rawData) {
      const data = JSON.parse(rawData)
      addItem(data)
      return
    }
    const textData = e.dataTransfer.getData('text/plain')
    if (textData) {
      addItem({ title: textData, type: 'QUOTE' })
    }
  } catch (err) {}
}

const handleDropOnButton = (e) => {
  isDragHovering.value = false
  e.preventDefault()
  handleDrop(e)
  isOpen.value = true
}

const openLightbox = (img, title) => {
  lightboxImage.value = img
  lightboxTitle.value = title
}

const pinLightboxImage = () => {
  if (lightboxImage.value) {
    addItem({
      title: lightboxTitle.value || 'Romantic NYC Photography',
      image: lightboxImage.value,
      type: 'PHOTO'
    })
    lightboxImage.value = null
  }
}

const copyMoodboardSummary = () => {
  if (pinnedItems.value.length === 0) return

  const baseUrl = 'https://nexyorkcasino.vercel.app'
  let summary = `🌟 NEXYORK VIP CURATED MOODBOARD & LUXURY PICKS:\n\n`
  pinnedItems.value.forEach((item, i) => {
    summary += `${i + 1}. [${item.category || 'VIP'}] ${item.title}\n`
    if (item.slug) {
      summary += `   Read: ${baseUrl}/magazine/${item.slug}\n`
    }
    if (item.image) {
      summary += `   Visual: ${item.image}\n`
    }
    summary += `\n`
  })
  summary += `Curated at NexYork Elite Casino & Sports Exchange (${baseUrl})`

  navigator.clipboard.writeText(summary)

  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: '📋 MOODBOARD COPIED!',
      html: '<p class="text-xs text-gray-300">Your curated luxury collection and SEO backlinks are ready to paste and share on Telegram, X, Discord, or Instagram!</p>',
      icon: 'success',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B'
    })
  }
}
</script>
