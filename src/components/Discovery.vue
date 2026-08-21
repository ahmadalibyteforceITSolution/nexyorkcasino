<template>
  <section id="discover" class="py-24 container mx-auto px-4 max-w-7xl">
    <div class="text-center mb-16">
      <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-[#FF7A00] font-black text-xs tracking-[0.3em] uppercase mb-3">
        <i class="fa-solid fa-compass"></i> THE MANHATTAN VIP GUIDE
      </div>
      <h2 class="font-outfit text-4xl md:text-6xl font-black mb-3 uppercase leading-tight text-[#1A202C]">
        CITY <span class="text-gradient">GLAMOUR</span>
      </h2>
      <p class="text-[#5A6474] max-w-xl mx-auto text-base">Discover New York's most exclusive destinations for high-stakes players and VIPs.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div 
        v-for="place in places" 
        :key="place.id" 
        class="bg-white rounded-[35px] overflow-hidden hover:scale-[1.03] transition-all duration-500 group shadow-md hover:shadow-2xl relative border border-[#E2D9CE]"
      >
        <div class="h-[480px] w-full bg-[#1A202C] overflow-hidden relative">
          <img 
            :src="place.image" 
            :alt="place.name" 
            loading="lazy"
            width="800"
            height="1200"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-90"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          
          <div class="absolute top-6 left-6 flex flex-col gap-2">
            <span class="px-3.5 py-1.5 bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-md">{{ place.category }}</span>
            <span v-if="place.vip" class="px-3.5 py-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/20">VIP EXCLUSIVE</span>
          </div>

          <div class="absolute bottom-6 left-6 right-6">
            <h3 class="text-2xl font-black mb-2 uppercase tracking-tight font-outfit text-white">{{ place.name }}</h3>
            <p class="text-gray-200 text-xs font-medium leading-relaxed group-hover:text-white transition-colors">
              {{ place.desc }}
            </p>
            <router-link :to="`/discovery/${place.id}`" class="mt-4 text-[#FFA15C] hover:text-[#FF7A00] font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all inline-block">
              EXPLORE HUB <span>➜</span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const places = [
  {
    id: 1,
    name: "Sky High Penthouse",
    category: "Lounge",
    vip: true,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    desc: "A breathtaking observation experience where the city skyline meets high-fashion luxury."
  },
  {
    id: 2,
    name: "The Velvet Room",
    category: "Club",
    vip: true,
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=800&auto=format&fit=crop",
    desc: "The most exclusive underground club in Manhattan, reserved for the city's top players."
  },
  {
    id: 3,
    name: "Neon Nights Hub",
    category: "Nightlife",
    vip: false,
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop",
    desc: "Experience the vibrant, high-energy nightlife of Times Square from a VIP perspective."
  }
];
</script>
