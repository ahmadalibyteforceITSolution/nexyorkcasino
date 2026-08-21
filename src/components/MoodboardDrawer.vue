<template>
  <div>
    <!-- Floating Moodboard Toggle Button -->
    <button 
      @click="isOpen = !isOpen"
      @dragover.prevent="isDragHovering = true"
      @dragleave="isDragHovering = false"
      @drop="handleDropOnButton"
      class="fixed bottom-6 right-6 z-40 group flex items-center gap-3 px-5 py-3 rounded-full font-black text-xs tracking-widest uppercase transition-all duration-500 shadow-[0_10px_35px_rgba(255,122,0,0.35)] border border-orange-300 cursor-pointer"
      :class="[
        isOpen ? 'bg-white text-[#FF7A00]' : 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white hover:scale-105',
        isDragHovering ? 'scale-125 ring-4 ring-[#FF7A00] animate-pulse' : ''
      ]"
      title="Pick & Drop VIP Moodboard"
      aria-label="Toggle Moodboard"
    >
      <div class="relative flex items-center justify-center">
        <i class="fa-solid fa-wand-magic-sparkles text-sm" :class="{ 'animate-spin': isDragHovering }"></i>
        <span 
          v-if="pinnedItems.length > 0"
          class="absolute -top-3 -right-3 w-5 h-5 bg-rose-600 text-white rounded-full text-[10px] flex items-center justify-center font-black border-2 border-white shadow"
        >
          {{ pinnedItems.length }}
        </span>
      </div>
      <span class="hidden sm:inline font-outfit">{{ isOpen ? 'CLOSE VIP BOARD' : 'VIP MOODBOARD' }}</span>
      <span class="text-[9px] bg-white/30 px-2 py-0.5 rounded-full font-mono font-extrabold hidden md:inline text-white" v-if="!isOpen">
        PICK & DROP
      </span>
    </button>

    <!-- Slide-over Drawer / Canvas -->
    <div 
      v-if="isOpen"
      class="fixed inset-0 z-50 overflow-hidden backdrop-blur-sm bg-black/40 transition-opacity"
      @click.self="isOpen = false"
    >
      <div class="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div 
          @dragover.prevent="isDragHovering = true"
          @dragleave="isDragHovering = false"
          @drop="handleDrop"
          class="w-screen max-w-md bg-[#FAF8F5] border-l border-[#E2D9CE] p-6 md:p-8 flex flex-col justify-between shadow-2xl relative overflow-y-auto"
          :class="{ 'ring-4 ring-[#FF7A00]/50 bg-orange-50/50': isDragHovering }"
        >
          <!-- Top Header -->
          <div>
            <div class="flex items-center justify-between pb-6 border-b border-[#EFE8DF]">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-2xl bg-orange-100 border border-orange-200 flex items-center justify-center text-[#FF7A00]">
                  <i class="fa-solid fa-gem text-lg"></i>
                </div>
                <div>
                  <h3 class="font-outfit font-black text-lg uppercase tracking-tight text-[#1A202C] flex items-center gap-2">
                    VIP Moodboard <span class="text-[10px] text-[#FF7A00] px-2 py-0.5 rounded-full bg-orange-100/70 border border-orange-200">PRO</span>
                  </h3>
                  <p class="text-[10px] text-[#718096] font-bold uppercase tracking-widest">
                    Pick, Drag & Drop Your Curated Luxury
                  </p>
                </div>
              </div>
              <button 
                @click="isOpen = false" 
                class="w-9 h-9 rounded-xl bg-white hover:bg-orange-50 text-[#718096] hover:text-[#1A202C] flex items-center justify-center text-sm transition-all border border-[#E2D9CE] cursor-pointer"
              >
                ✕
              </button>
            </div>

            <!-- Drag & Drop Dropzone Banner -->
            <div 
              class="mt-6 p-4 rounded-2xl border-2 border-dashed transition-all flex items-center gap-3 text-left"
              :class="isDragHovering ? 'border-[#FF7A00] bg-orange-100/50 scale-103' : 'border-orange-200 bg-white shadow-2xs'"
            >
              <div class="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#FF7A00] text-base flex-shrink-0 border border-orange-200">
                <i class="fa-solid fa-hand-pointer animate-bounce"></i>
              </div>
              <div>
                <div class="text-xs font-black uppercase text-[#1A202C] tracking-wide">
                  {{ isDragHovering ? 'Release to Drop into Board!' : 'Drop Photos & Stories Here' }}
                </div>
                <div class="text-[10px] text-[#718096]">
                  Drag any blog image, VIP card, or quote into this panel.
                </div>
              </div>
            </div>

            <!-- Items List -->
            <div class="mt-6 space-y-4">
              <div class="flex items-center justify-between text-[11px] font-bold text-[#718096] uppercase tracking-wider">
                <span>Pinned Items ({{ pinnedItems.length }})</span>
                <button 
                  v-if="pinnedItems.length > 0"
                  @click="clearAll" 
                  class="text-rose-500 hover:underline text-[10px] font-black cursor-pointer"
                >
                  Clear All
                </button>
              </div>

              <!-- Empty State -->
              <div v-if="pinnedItems.length === 0" class="text-center py-12 px-4 rounded-3xl border border-[#E2D9CE] bg-white shadow-2xs">
                <i class="fa-regular fa-images text-4xl text-[#FFA15C] mb-3 block"></i>
                <h4 class="text-xs font-black uppercase text-[#1A202C] mb-1">Your Moodboard is Empty</h4>
                <p class="text-[10px] text-[#718096] max-w-xs mx-auto leading-relaxed">
                  Hover over any magazine story or photo and click <span class="text-[#FF7A00] font-bold">"Pin to Board"</span> or drag & drop items right onto this panel.
                </p>
              </div>

              <!-- Pinned Cards -->
              <div 
                v-for="(item, idx) in pinnedItems" 
                :key="item.id || idx"
                class="group relative rounded-2xl bg-white border border-[#E2D9CE] p-3.5 flex gap-3.5 items-center hover:border-orange-300 transition-all shadow-xs hover:shadow-md"
              >
                <!-- Thumbnail / Image -->
                <div 
                  v-if="item.image"
                  @click="openLightbox(item.image, item.title)"
                  class="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer relative group/img border border-[#E2D9CE]"
                >
                  <img :src="item.image" :alt="item.title" class="w-full h-full object-cover group-hover/img:scale-110 transition-transform">
                  <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity text-white text-xs">
                    <i class="fa-solid fa-magnifying-glass-plus"></i>
                  </div>
                </div>

                <!-- Content text -->
                <div class="flex-grow min-w-0">
                  <div class="flex items-center gap-2 mb-1">
                    <span class="text-[9px] font-black uppercase text-[#FF7A00] bg-orange-50 px-2 py-0.5 rounded border border-orange-200">
                      {{ item.category || 'VIP LUXURY' }}
                    </span>
                    <span class="text-[9px] text-[#718096] font-mono">{{ item.type || 'STORY' }}</span>
                  </div>
                  <h5 class="text-xs font-bold text-[#1A202C] truncate group-hover:text-[#FF7A00] transition-colors">
                    {{ item.title }}
                  </h5>
                  <p v-if="item.excerpt" class="text-[10px] text-[#718096] line-clamp-1 mt-0.5">
                    {{ item.excerpt }}
                  </p>
                </div>

                <!-- Remove item -->
                <button 
                  @click="removeItem(idx)" 
                  class="w-7 h-7 rounded-lg bg-[#FAF8F5] hover:bg-rose-100 text-[#718096] hover:text-rose-600 flex items-center justify-center text-xs flex-shrink-0 transition-colors border border-[#E2D9CE] cursor-pointer"
                  title="Remove from board"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>

          <!-- Bottom Actions -->
          <div class="pt-6 mt-6 border-t border-[#EFE8DF] space-y-3">
            <button 
              @click="copyMoodboardSummary" 
              :disabled="pinnedItems.length === 0"
              class="w-full btn-primary py-3.5 px-4 text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-md disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              <i class="fa-solid fa-share-nodes"></i>
              SHARE & EXPORT MOODBOARD
            </button>
            <div class="text-[9px] text-center text-[#718096] uppercase tracking-widest font-mono">
              Auto-saves to browser memory & includes SEO citations
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Image Romance Lightbox Modal -->
    <div 
      v-if="lightboxImage" 
      class="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
      @click.self="lightboxImage = null"
    >
      <div class="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden border border-orange-200 shadow-2xl">
        <button 
          @click="lightboxImage = null" 
          class="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/70 hover:bg-[#FF7A00] text-white flex items-center justify-center text-sm transition-all cursor-pointer"
        >
          ✕
        </button>
        <div class="relative aspect-video max-h-[70vh] overflow-hidden bg-[#1A202C]">
          <img :src="lightboxImage" :alt="lightboxTitle" class="w-full h-full object-contain">
        </div>
        <div class="p-6 bg-[#FAF8F5] flex items-center justify-between border-t border-[#EFE8DF]">
          <div>
            <div class="text-[10px] font-black uppercase tracking-widest text-[#FF7A00] mb-1">Aesthetic Romance & Luxury Gallery</div>
            <h4 class="text-sm font-black text-[#1A202C] uppercase">{{ lightboxTitle }}</h4>
          </div>
          <div class="flex gap-3">
            <button 
              @click="pinLightboxImage"
              class="btn-primary px-4 py-2 text-xs font-black uppercase rounded-xl tracking-wider cursor-pointer"
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

onMounted(() => {
  try {
    const saved = localStorage.getItem('nexyork_vip_moodboard')
    if (saved) {
      pinnedItems.value = JSON.parse(saved)
    }
  } catch (err) {}

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
    if (typeof window.Swal !== 'undefined') {
      window.Swal.fire({
        title: '👑 PINNED TO VIP MOODBOARD!',
        text: `"${event.detail.title}" is saved in your VIP Moodboard.`,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false,
        background: '#FFFFFF',
        color: '#1A202C'
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
      html: '<p class="text-xs text-gray-600">Your curated luxury collection and SEO backlinks are ready to paste and share on Telegram, X, Discord, or Instagram!</p>',
      icon: 'success',
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00'
    })
  }
}
</script>
