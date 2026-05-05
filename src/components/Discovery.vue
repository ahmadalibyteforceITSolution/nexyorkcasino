<template>
  <section id="discover" class="py-32 container mx-auto px-4">
    <div class="text-center mb-24">
      <div class="text-primary font-black text-xs tracking-[0.5em] uppercase mb-4">The VIP Guide</div>
      <h2 class="font-outfit text-6xl md:text-7xl font-black mb-4 uppercase leading-none">CITY <span class="text-gradient">GLAMOUR</span></h2>
      <p class="text-gray-400 max-w-xl mx-auto text-lg">Discover New York's most exclusive destinations for the elite.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div v-for="place in places" :key="place.id" class="glass rounded-[40px] overflow-hidden hover:scale-[1.05] transition-all duration-700 group shadow-2xl relative">
        <div class="h-[550px] w-full bg-dark-card overflow-hidden">
          <img 
            :src="place.image" 
            :alt="place.name" 
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 brightness-75"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent"></div>
          
          <div class="absolute top-8 left-8 flex flex-col gap-2">
            <span class="px-4 py-1.5 bg-primary text-black text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg">{{ place.category }}</span>
            <span v-if="place.vip" class="px-4 py-1.5 bg-white/10 backdrop-blur-md text-white text-[10px] font-black rounded-full uppercase tracking-widest border border-white/10">VIP EXCLUSIVE</span>
          </div>

          <div class="absolute bottom-8 left-8 right-8">
            <h3 class="text-3xl font-black mb-2 uppercase tracking-tight font-outfit">{{ place.name }}</h3>
            <p class="text-gray-300 text-sm font-medium leading-relaxed group-hover:text-white transition-colors">
              {{ place.desc }}
            </p>
            <router-link :to="`/discovery/${place.id}`" class="mt-6 text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all inline-block">
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
