<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in fade-in duration-1000">
    <header class="mb-16 text-center">
      <h1 class="text-6xl font-black font-outfit uppercase tracking-tighter">THE <span class="text-gradient">MAGAZINE</span></h1>
      <p class="text-gray-500 text-xs font-black uppercase tracking-[0.4em] mt-4">Luxury Lifestyle & High Stakes Strategy</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
      <article v-for="blog in blogs" :key="blog.id" class="glass rounded-[50px] overflow-hidden flex flex-col md:flex-row hover:border-primary/30 transition-all group">
        <div class="md:w-1/2 h-80 md:h-auto relative overflow-hidden">
          <img :src="blog.image" :alt="blog.title" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000">
          <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </div>
        
        <div class="md:w-1/2 p-10 flex flex-col justify-between">
          <div>
            <div class="text-primary font-black text-[10px] uppercase tracking-widest mb-4">{{ blog.category }}</div>
            <h2 class="text-2xl font-black mb-4 uppercase leading-tight font-outfit">{{ blog.title }}</h2>
            <p class="text-gray-400 text-sm leading-relaxed mb-6">{{ blog.excerpt }}</p>
          </div>
          
          <div class="flex items-center justify-between mt-auto">
            <span class="text-[10px] text-gray-600 font-bold uppercase">{{ blog.date }}</span>
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
const blogs = [
  {
    id: 1,
    title: "The Art of High-Stakes Betting",
    category: "Strategy",
    date: "May 04, 2026",
    excerpt: "Master the psychology of the floor. Learn how the world's top players manage risk and dominate the odds.",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "New York's Sexiest Rooftop Bars",
    category: "Lifestyle",
    date: "May 03, 2026",
    excerpt: "From Manhattan to Brooklyn, we've curated the most glamorous spots to watch the sunset with a VIP view.",
    image: "https://images.unsplash.com/photo-1511193311914-0346f16efe90?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Crypto Wins: The BTC Surge",
    category: "Market",
    date: "May 02, 2026",
    excerpt: "How Bitcoin is revolutionizing the digital arena. A deep dive into the future of decentralized betting.",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?q=80&w=800&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Elite Fashion: Dress to Dominate",
    category: "Style",
    date: "May 01, 2026",
    excerpt: "What to wear for a high-stakes night in New York. The ultimate style guide for the modern gladiator.",
    image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=800&auto=format&fit=crop"
  }
];
</script>
