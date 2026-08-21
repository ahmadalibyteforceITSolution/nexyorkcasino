<template>
  <div class="pt-28 pb-24 container mx-auto px-4 font-outfit max-w-7xl animate-in fade-in duration-700 select-none">
    <!-- Top Header -->
    <header class="mb-12 text-center relative">
      <div class="inline-flex items-center gap-2 bg-orange-100/70 border border-orange-200 px-5 py-2 rounded-full text-xs font-black text-[#FF7A00] tracking-widest uppercase mb-4 shadow-xs">
        <i class="fa-solid fa-newspaper"></i>
        NEXYORK VIP CRYPTO, CASINO & ROMANCE MAGAZINE (1,000+ INDEXED ARTICLES)
      </div>
      <h1 class="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter text-[#1A202C]">
        THE <span class="text-gradient">MAGAZINE</span>
      </h1>
      <p class="text-[#5A6474] text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-widest mt-3 font-sans font-medium">
        High-stakes trading strategies, crypto liquidity indices, and lavish Manhattan romance & nightlife.
      </p>

      <!-- Pick & Drop Info Ribbon -->
      <div class="mt-6 inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-white border border-[#E2D9CE] text-[11px] text-[#4A5568] font-sans shadow-xs">
        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
        <span><strong>Interactive VIP Feature:</strong> Drag & drop any story or click <strong>"Pin to Board"</strong> to curate your custom Moodboard!</span>
      </div>
    </header>

    <!-- Search & Category Filters -->
    <div class="max-w-4xl mx-auto mb-12 space-y-6">
      <div class="relative">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search 1,000+ stories: Bitcoin NY, Roulette, Manhattan Penthouse, Live ESPN, Romance..." 
          class="w-full bg-white border border-[#E2D9CE] rounded-2xl py-4 px-6 pl-12 font-bold text-sm text-[#1A202C] outline-none focus:border-[#FF7A00] transition-all shadow-sm focus:shadow-md"
        >
        <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-[#718096]"></i>
        <button 
          v-if="searchQuery" 
          @click="searchQuery = ''"
          class="absolute right-5 top-1/2 -translate-y-1/2 text-xs font-bold text-gray-400 hover:text-gray-600 bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>
      </div>

      <!-- Categories Pills -->
      <div class="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="changeCategory(cat)"
          class="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border cursor-pointer"
          :class="selectedCategory === cat ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] border-orange-300 text-white scale-103 shadow-md' : 'bg-white border-[#E2D9CE] text-[#5A6474] hover:text-[#1A202C] hover:border-orange-200'"
        >
          {{ cat }}
        </button>
      </div>

      <!-- Live Count Stats -->
      <div class="flex items-center justify-between text-xs text-[#718096] font-bold px-2">
        <span>Showing {{ paginatedBlogs.length }} of {{ filteredBlogs.length }} articles (Page {{ currentPage }} of {{ totalPages }})</span>
        <span class="text-[#FF7A00] font-black">1,000 Total Indexed Pages</span>
      </div>
    </div>

    <!-- Featured Top Article (3D Card with Drag & Drop) -->
    <div v-if="featuredBlog && !searchQuery && selectedCategory === 'ALL' && currentPage === 1" class="perspective-3d mb-14">
      <div 
        draggable="true"
        @dragstart="(e) => handleCardDragStart(e, featuredBlog)"
        class="card-3d rounded-[35px] border border-orange-200 overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group bg-white shadow-lg relative hover:shadow-2xl transition-all"
      >
        <div class="lg:col-span-7 h-80 lg:h-auto relative overflow-hidden" @click="$router.push(`/magazine/${featuredBlog.slug}`)">
          <img :src="featuredBlog.image" :alt="featuredBlog.title" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000">
          <div class="absolute top-6 left-6 bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-md">
            FEATURED COVER STORY
          </div>
          <div class="absolute bottom-6 left-6 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[10px] text-white border border-white/10">
            <i class="fa-solid fa-hand-pointer text-[#FFA15C]"></i> Drag to Moodboard
          </div>
        </div>
        <div class="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
          <div @click="$router.push(`/magazine/${featuredBlog.slug}`)">
            <div class="text-[#FF7A00] font-black text-xs uppercase tracking-widest mb-3">{{ featuredBlog.category }} • {{ featuredBlog.date }}</div>
            <h2 class="text-2xl lg:text-3xl font-black mb-4 uppercase leading-tight font-outfit text-[#1A202C] group-hover:text-[#FF7A00] transition-colors">{{ featuredBlog.title }}</h2>
            <p class="text-[#5A6474] text-sm leading-relaxed mb-6 font-medium font-sans">{{ featuredBlog.excerpt }}</p>
          </div>
          <div class="flex items-center justify-between gap-3 pt-4 border-t border-[#EFE8DF]">
            <button 
              @click.stop="pinArticle(featuredBlog)"
              class="px-4 py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF7A00] text-xs font-black uppercase tracking-wider transition-all border border-orange-200 flex items-center gap-1.5 cursor-pointer"
            >
              <i class="fa-solid fa-thumbtack"></i> Pin to Board
            </button>
            <button @click="$router.push(`/magazine/${featuredBlog.slug}`)" class="btn-primary py-2.5 px-6 text-xs uppercase tracking-widest cursor-pointer">
              READ STORY ➜
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Articles Grid with 3D Card Animations & Drag and Drop -->
    <div v-if="paginatedBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-3d mb-12">
      <article 
        v-for="blog in paginatedBlogs" 
        :key="blog.id" 
        draggable="true"
        @dragstart="(e) => handleCardDragStart(e, blog)"
        class="card-3d bg-white rounded-[30px] overflow-hidden border border-[#EAE2D7] hover:border-orange-300 transition-all group flex flex-col justify-between shadow-sm hover:shadow-xl relative"
      >
        <div class="cursor-pointer" @click="$router.push(`/magazine/${blog.slug}`)">
          <div class="h-52 relative overflow-hidden">
            <img :src="blog.image" :alt="blog.title" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-[#FF7A00] border border-orange-200 uppercase tracking-widest shadow-xs">
              {{ blog.category }}
            </div>

            <!-- 1-Click Pin Button Overlay -->
            <button 
              @click.stop="pinArticle(blog)"
              class="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/90 hover:bg-[#FF7A00] text-[#1A202C] hover:text-white backdrop-blur text-xs flex items-center justify-center transition-all border border-orange-200 shadow-sm cursor-pointer"
              title="Pin to Moodboard"
            >
              <i class="fa-solid fa-thumbtack"></i>
            </button>
          </div>
          
          <div class="p-6">
            <div class="text-[10px] text-[#718096] font-bold uppercase tracking-widest mb-2 flex items-center justify-between">
              <span>{{ blog.date }}</span>
              <span class="text-[#FF7A00] font-mono font-black">5 MIN READ</span>
            </div>
            <h3 class="text-lg font-black mb-2.5 uppercase leading-snug font-outfit text-[#1A202C] group-hover:text-[#FF7A00] transition-colors line-clamp-2">{{ blog.title }}</h3>
            <p class="text-[#5A6474] text-xs leading-relaxed line-clamp-3 font-medium font-sans">{{ blog.excerpt }}</p>
          </div>
        </div>
        
        <div class="p-6 pt-0 flex items-center justify-between border-t border-[#EFE8DF] mt-3">
          <button 
            @click.stop="pinArticle(blog)" 
            class="text-[10px] font-black text-[#718096] hover:text-[#FF7A00] uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer"
          >
            <i class="fa-solid fa-plus text-[#FF7A00]"></i> MOODBOARD
          </button>
          <div 
            @click="$router.push(`/magazine/${blog.slug}`)"
            class="cursor-pointer w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center group-hover:bg-[#FF7A00] group-hover:text-white transition-colors text-xs font-bold text-[#FF7A00]"
          >
            ➜
          </div>
        </div>
      </article>
    </div>

    <!-- Empty Search State -->
    <div v-else class="h-64 flex flex-col items-center justify-center text-center bg-white rounded-3xl border-dashed border-2 border-[#E2D9CE] mb-20 shadow-xs">
      <i class="fa-solid fa-magnifying-glass text-5xl mb-4 text-[#FF7A00]/50"></i>
      <div class="text-sm font-black uppercase tracking-widest text-[#1A202C]">No articles found for "{{ searchQuery }}"</div>
      <button @click="searchQuery = ''; selectedCategory = 'ALL'" class="mt-4 text-xs font-bold text-[#FF7A00] underline">Reset filters</button>
    </div>

    <!-- Global Pagination Controls -->
    <div v-if="totalPages > 1" class="flex flex-wrap items-center justify-center gap-2 mb-20">
      <button 
        @click="goToPage(currentPage - 1)" 
        :disabled="currentPage === 1"
        class="px-4 py-2 rounded-xl bg-white border border-[#E2D9CE] text-xs font-black uppercase tracking-wider text-[#5A6474] hover:text-[#1A202C] hover:border-orange-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs transition-all"
      >
        ◀ Prev
      </button>

      <div class="flex items-center gap-1">
        <button 
          v-for="page in visiblePages" 
          :key="page"
          @click="goToPage(page)"
          class="w-10 h-10 rounded-xl text-xs font-black transition-all border cursor-pointer"
          :class="currentPage === page ? 'bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white border-orange-300 shadow-sm' : 'bg-white text-[#5A6474] border-[#E2D9CE] hover:border-orange-200'"
        >
          {{ page }}
        </button>
      </div>

      <button 
        @click="goToPage(currentPage + 1)" 
        :disabled="currentPage === totalPages"
        class="px-4 py-2 rounded-xl bg-white border border-[#E2D9CE] text-xs font-black uppercase tracking-wider text-[#5A6474] hover:text-[#1A202C] hover:border-orange-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer shadow-xs transition-all"
      >
        Next ▶
      </button>
    </div>

    <!-- Verified Authority Backlinks Directory Section -->
    <AuthorityBacklinks />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { blogs } from '../data/blogs'
import AuthorityBacklinks from '../components/AuthorityBacklinks.vue'

const searchQuery = ref('')
const selectedCategory = ref('ALL')
const currentPage = ref(1)
const itemsPerPage = 24

const categories = ['ALL', 'Crypto', 'Casino', 'Sports', 'Lifestyle', 'Romance', 'Strategy', 'Gaming', 'Finance']

const featuredBlog = computed(() => blogs[0])

const filteredBlogs = computed(() => {
  return blogs.filter(b => {
    const matchesCat = selectedCategory.value === 'ALL' || b.category.toLowerCase() === selectedCategory.value.toLowerCase()
    const matchesQuery = !searchQuery.value || b.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || b.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCat && matchesQuery
  })
})

const totalPages = computed(() => Math.ceil(filteredBlogs.value.length / itemsPerPage))

const paginatedBlogs = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredBlogs.value.slice(start, start + itemsPerPage)
})

const visiblePages = computed(() => {
  const pages = []
  const maxButtons = 7
  let start = Math.max(1, currentPage.value - 3)
  let end = Math.min(totalPages.value, start + maxButtons - 1)
  
  if (end - start < maxButtons - 1) {
    start = Math.max(1, end - maxButtons + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }
  return pages
})

const changeCategory = (cat) => {
  selectedCategory.value = cat
  currentPage.value = 1
}

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    window.scrollTo({ top: 400, behavior: 'smooth' })
  }
}

watch(searchQuery, () => {
  currentPage.value = 1
})

const pinArticle = (article) => {
  window.dispatchEvent(new CustomEvent('nexyork:pick-item', {
    detail: {
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      image: article.image,
      slug: article.slug,
      type: 'STORY'
    }
  }))
}

const handleCardDragStart = (e, article) => {
  const itemData = {
    title: article.title,
    category: article.category,
    excerpt: article.excerpt,
    image: article.image,
    slug: article.slug,
    type: 'STORY'
  }
  e.dataTransfer.setData('application/json', JSON.stringify(itemData))
  e.dataTransfer.setData('text/plain', `${article.title} - https://nexyorkcasino.vercel.app/magazine/${article.slug}`)
}
</script>

<style scoped>
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
