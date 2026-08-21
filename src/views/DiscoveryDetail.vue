<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in slide-in-from-bottom-10 duration-700 min-h-screen max-w-5xl font-outfit">
    <div v-if="place">
      <header class="mb-12">
        <button @click="$router.push('/')" class="text-[#718096] hover:text-[#FF7A00] font-black text-xs uppercase tracking-widest mb-6 inline-flex items-center gap-2 cursor-pointer">
          <span>←</span> Back to Hub
        </button>
        <div class="flex items-center gap-4 mb-4">
          <span class="px-4 py-1.5 bg-orange-100/80 text-[#FF7A00] text-[10px] font-black rounded-full uppercase tracking-widest border border-orange-200 shadow-xs">{{ place.category }}</span>
          <span v-if="place.vip" class="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-black rounded-full uppercase tracking-widest border border-emerald-200">VIP EXCLUSIVE</span>
        </div>
        <h1 class="text-4xl md:text-6xl font-black font-outfit uppercase tracking-tight text-[#1A202C]">{{ place.name }}</h1>
      </header>

      <div class="relative w-full h-[450px] rounded-[40px] overflow-hidden mb-12 shadow-xl border border-[#E2D9CE]">
        <img :src="place.image" :alt="place.name" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      <div class="max-w-4xl mx-auto p-10 md:p-12 rounded-[40px] border border-orange-200 bg-white shadow-lg">
        <h2 class="text-2xl font-black mb-4 uppercase font-outfit text-[#FF7A00]">About this Location</h2>
        <p class="text-[#4A5568] text-base md:text-lg leading-relaxed mb-8">{{ place.desc }}</p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div class="bg-[#FAF8F5] p-5 rounded-3xl text-center border border-[#EAE2D7]">
            <i class="fa-solid fa-martini-glass-citrus text-2xl mb-2 text-[#FF7A00]"></i>
            <div class="text-[10px] font-black uppercase tracking-widest text-[#718096]">Dress Code</div>
            <div class="text-sm font-black mt-1 text-[#1A202C]">Strict / Elegant</div>
          </div>
          <div class="bg-[#FAF8F5] p-5 rounded-3xl text-center border border-[#EAE2D7]">
            <i class="fa-regular fa-gem text-2xl mb-2 text-blue-600"></i>
            <div class="text-[10px] font-black uppercase tracking-widest text-[#718096]">Entry</div>
            <div class="text-sm font-black mt-1 text-[#1A202C]">Token Required</div>
          </div>
        </div>

        <button 
          @click="handleBookVip" 
          :disabled="isBooking"
          class="btn-primary w-full py-4 text-xs uppercase tracking-[0.2em] cursor-pointer"
        >
          {{ isBooking ? 'Processing Reservation...' : 'Book VIP Table' }}
        </button>
      </div>
    </div>
    <div v-else class="text-center py-32 text-[#718096] font-black uppercase tracking-widest">
      Location Not Found
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const places = [
  {
    id: 1,
    name: "Sky High Penthouse",
    category: "Lounge",
    vip: true,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
    desc: "A breathtaking observation experience where the city skyline meets high-fashion luxury and elite gaming lounges."
  },
  {
    id: 2,
    name: "The Velvet Room",
    category: "Club",
    vip: true,
    image: "https://images.unsplash.com/photo-1606167668584-78701c57f13d?q=80&w=800&auto=format&fit=crop",
    desc: "The most exclusive underground club in Manhattan, reserved for the city's top crypto traders and VIP players."
  },
  {
    id: 3,
    name: "Neon Nights Hub",
    category: "Nightlife",
    vip: false,
    image: "https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=800&auto=format&fit=crop",
    desc: "Experience the vibrant, high-energy nightlife of Times Square from a VIP high-stakes perspective."
  }
];

const place = computed(() => places.find(p => p.id === parseInt(route.params.id)))
const isBooking = ref(false)

const handleBookVip = () => {
  isBooking.value = true
  setTimeout(() => {
    isBooking.value = false
    if (typeof window.Swal !== 'undefined') {
      window.Swal.fire({
        title: 'VIP TABLE RESERVED!',
        text: `Your private table at ${place.value.name} has been reserved. Our VIP concierge will contact you shortly.`,
        icon: 'success',
        background: '#FFFFFF',
        color: '#1A202C',
        confirmButtonColor: '#FF7A00'
      })
    }
  }, 1000)
}
</script>
