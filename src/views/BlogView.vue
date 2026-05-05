<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in fade-in duration-1000">
    <header class="mb-16 text-center">
      <h1 class="text-6xl font-black font-outfit uppercase tracking-tighter">THE <span class="text-gradient">MAGAZINE</span></h1>
      <p class="text-gray-500 text-xs font-black uppercase tracking-[0.4em] mt-4">Luxury Lifestyle & High Stakes Strategy</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <article v-for="blog in blogs" :key="blog.id" class="glass rounded-[50px] overflow-hidden flex flex-col md:flex-row hover:border-primary/30 transition-all group cursor-pointer" @click="$router.push(`/magazine/${blog.slug}`)">
        <div class="md:w-1/2 h-80 md:h-auto relative overflow-hidden">
          <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
          <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        <div class="md:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <div class="text-primary font-black text-[10px] uppercase tracking-widest mb-4">{{ blog.category }}</div>
            <h2 class="text-2xl font-black mb-4 uppercase leading-tight font-outfit">{{ blog.title }}</h2>
            <p class="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">{{ blog.excerpt }}</p>
          </div>
          
          <div class="flex items-center justify-between mt-auto">
            <div class="flex items-center gap-4 text-gray-600">
              <span class="flex items-center gap-1.5 text-[10px] font-black"><i class="fa-solid fa-heart text-primary/60"></i> {{ Math.floor(Math.random() * 200) + 50 }}</span>
              <span class="flex items-center gap-1.5 text-[10px] font-black"><i class="fa-solid fa-comment text-gray-700"></i> {{ Math.floor(Math.random() * 20) + 5 }}</span>
            </div>
            <button class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-primary hover:text-black transition-all">
              ➜
            </button>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { blogs } from '../data/blogs'
</script>
