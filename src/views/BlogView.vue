<template>
  <div class="pt-28 pb-20 container mx-auto px-4 font-outfit max-w-7xl animate-in fade-in duration-700 select-none">
    <header class="mb-12 text-center relative">
      <div class="inline-flex items-center gap-2 bg-[#F0B90B]/10 border border-[#F0B90B]/30 px-4 py-1.5 rounded-full text-xs font-black text-[#F0B90B] tracking-widest uppercase mb-4">
        <i class="fa-solid fa-newspaper"></i>
        BINANCE CRYPTO & LIFESTYLE MAGAZINE
      </div>
      <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter">
        THE <span class="text-gradient">MAGAZINE</span>
      </h1>
      <p class="text-gray-400 text-xs md:text-sm max-w-xl mx-auto uppercase tracking-widest mt-3">
        High-stakes trading strategies, crypto market insights, and NYC luxury nightlife.
      </p>
    </header>

    <!-- Search & Category Filters -->
    <div class="max-w-4xl mx-auto mb-12 space-y-6">
      <div class="relative">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search 75+ articles, Bitcoin, Strategy, Casino, Nightlife..." 
          class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pl-12 font-bold text-sm text-white outline-none focus:border-[#F0B90B] transition-all shadow-xl"
        >
        <i class="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"></i>
      </div>

      <!-- Categories Pills -->
      <div class="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar py-2">
        <button 
          v-for="cat in categories" 
          :key="cat"
          @click="selectedCategory = cat"
          class="px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all border"
          :class="selectedCategory === cat ? 'bg-[#F0B90B] border-[#F0B90B] text-black scale-105 shadow-lg' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'"
        >
          {{ cat }}
        </button>
      </div>
    </div>

    <!-- Featured Top Article (3D Card) -->
    <div v-if="featuredBlog && !searchQuery && selectedCategory === 'ALL'" class="perspective-3d mb-12">
      <div 
        @click="$router.push(`/magazine/${featuredBlog.slug}`)"
        class="card-3d glass rounded-[40px] border-[#F0B90B]/30 overflow-hidden grid grid-cols-1 lg:grid-cols-12 cursor-pointer group bg-[#161618] shadow-2xl"
      >
        <div class="lg:col-span-7 h-80 lg:h-auto relative overflow-hidden">
          <img :src="featuredBlog.image" :alt="featuredBlog.title" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000">
          <div class="absolute top-6 left-6 bg-[#F0B90B] text-black text-[9px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest shadow-lg">FEATURED STORY</div>
        </div>
        <div class="lg:col-span-5 p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <div class="text-[#F0B90B] font-black text-xs uppercase tracking-widest mb-3">{{ featuredBlog.category }} • {{ featuredBlog.date }}</div>
            <h2 class="text-3xl lg:text-4xl font-black mb-4 uppercase leading-tight font-outfit text-white group-hover:text-[#F0B90B] transition-colors">{{ featuredBlog.title }}</h2>
            <p class="text-gray-400 text-sm leading-relaxed mb-6 font-medium">{{ featuredBlog.excerpt }}</p>
          </div>
          <div class="flex items-center justify-between">
            <span class="text-xs font-black text-gray-400 uppercase tracking-widest">5 MIN READ</span>
            <button class="btn-primary py-3 px-6 text-xs uppercase tracking-widest">READ ARTICLE ➜</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Articles Grid with 3D Card Animations -->
    <div v-if="filteredBlogs.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-3d">
      <article 
        v-for="blog in filteredBlogs" 
        :key="blog.id" 
        @click="$router.push(`/magazine/${blog.slug}`)"
        class="card-3d glass rounded-[35px] overflow-hidden border border-white/10 hover:border-[#F0B90B]/40 transition-all group cursor-pointer bg-[#161618] flex flex-col justify-between shadow-xl"
      >
        <div>
          <div class="h-56 relative overflow-hidden">
            <img :src="blog.image" :alt="blog.title" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
            <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-lg text-[9px] font-black text-[#F0B90B] border border-white/10 uppercase tracking-widest">
              {{ blog.category }}
            </div>
          </div>
          
          <div class="p-6">
            <div class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{{ blog.date }}</div>
            <h3 class="text-xl font-black mb-3 uppercase leading-snug font-outfit text-white group-hover:text-[#F0B90B] transition-colors line-clamp-2">{{ blog.title }}</h3>
            <p class="text-gray-400 text-xs leading-relaxed line-clamp-3 font-medium">{{ blog.excerpt }}</p>
          </div>
        </div>
        
        <div class="p-6 pt-0 flex items-center justify-between border-t border-white/5 mt-4">
          <span class="text-[10px] font-black text-gray-500 uppercase tracking-wider"><i class="fa-solid fa-book-open mr-1"></i> READ MORE</span>
          <div class="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F0B90B] group-hover:text-black transition-colors text-xs font-bold">
            ➜
          </div>
        </div>
      </article>
    </div>

    <div v-else class="h-64 flex flex-col items-center justify-center text-center glass rounded-3xl opacity-50 border-dashed border-2 border-white/10">
      <i class="fa-solid fa-magnifying-glass text-5xl mb-4 text-gray-500"></i>
      <div class="text-xs font-black uppercase tracking-widest">No articles found for "{{ searchQuery }}"</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { blogs } from '../data/blogs'

const searchQuery = ref('')
const selectedCategory = ref('ALL')

const categories = ['ALL', 'Lifestyle', 'Strategy', 'Market', 'Style', 'Gaming', 'Tech', 'Finance']

const featuredBlog = computed(() => blogs[0])

const filteredBlogs = computed(() => {
  return blogs.filter(b => {
    const matchesCat = selectedCategory.value === 'ALL' || b.category.toLowerCase() === selectedCategory.value.toLowerCase()
    const matchesQuery = !searchQuery.value || b.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || b.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesCat && matchesQuery
  })
})
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
