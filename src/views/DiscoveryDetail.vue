<template>
  <div class="pt-32 pb-20 container mx-auto px-4 animate-in slide-in-from-bottom-10 duration-700 min-h-screen">
    <div v-if="place">
      <header class="mb-12">
        <button @click="$router.push('/')" class="text-gray-500 hover:text-white font-black text-[10px] uppercase tracking-widest mb-6 inline-flex items-center gap-2">
          <span>←</span> Back to Hub
        </button>
        <div class="flex items-center gap-4 mb-4">
          <span class="px-4 py-1.5 bg-primary text-black text-[10px] font-black rounded-full uppercase tracking-widest">{{ place.category }}</span>
          <span v-if="place.vip" class="px-4 py-1.5 bg-white/10 text-white text-[10px] font-black rounded-full uppercase tracking-widest">VIP EXCLUSIVE</span>
        </div>
        <h1 class="text-6xl font-black font-outfit uppercase tracking-tighter">{{ place.name }}</h1>
      </header>

      <div class="relative w-full h-[500px] rounded-[50px] overflow-hidden mb-12 shadow-2xl">
        <img :src="place.image" :alt="place.name" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent"></div>
      </div>

      <div class="max-w-4xl mx-auto glass p-12 rounded-[50px] border-primary/20">
        <h2 class="text-2xl font-black mb-6 uppercase font-outfit text-primary">About this Location</h2>
        <p class="text-gray-300 text-lg leading-relaxed mb-8">{{ place.desc }}</p>
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div class="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
            <i class="fa-solid fa-martini-glass-citrus text-2xl mb-2 text-primary"></i>
            <div class="text-[10px] font-black uppercase tracking-widest text-gray-400">Dress Code</div>
            <div class="text-sm font-bold mt-1">Strict / Elegant</div>
          </div>
          <div class="bg-white/5 p-6 rounded-3xl text-center border border-white/5">
            <i class="fa-regular fa-gem text-2xl mb-2 text-blue-400"></i>
            <div class="text-[10px] font-black uppercase tracking-widest text-gray-400">Entry</div>
            <div class="text-sm font-bold mt-1">Token Required</div>
          </div>
        </div>

        <button 
          @click="handleBookVip" 
          :disabled="isBooking"
          class="btn-primary w-full py-6 text-sm uppercase tracking-[0.2em]"
        >
          {{ isBooking ? 'Processing Reservation...' : 'Book VIP Table' }}
        </button>
      </div>
    </div>
    <div v-else class="text-center py-32 text-gray-500 font-black uppercase tracking-widest">
      Location Not Found
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { apiService } from '../services/api'

const route = useRoute()

// Re-defining data here for simplicity, ideally fetched from an API/Store
const places = [
  {
    id: 1,
    name: "Sky High Penthouse",
    category: "Lounge",
    vip: true,
    image: "https://images.unsplash.com/photo-1574091678382-3e1901bb7473?q=80&w=1200&auto=format&fit=crop",
    desc: "A breathtaking observation experience where the city skyline meets high-fashion luxury. Enjoy panoramic views of the Manhattan skyline while sipping on signature cocktails crafted by world-renowned mixologists."
  },
  {
    id: 2,
    name: "The Velvet Room",
    category: "Club",
    vip: true,
    image: "https://images.unsplash.com/photo-1578736641330-3155e606cd40?q=80&w=1200&auto=format&fit=crop",
    desc: "The most exclusive underground club in Manhattan, reserved for the city's top players. Step into a world of opulent velvet decor, pulsating basslines, and high-stakes privacy."
  },
  {
    id: 3,
    name: "Neon Nights Hub",
    category: "Nightlife",
    vip: false,
    image: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=1200&auto=format&fit=crop",
    desc: "Experience the vibrant, high-energy nightlife of Times Square from a VIP perspective. Neon lights, immersive sound systems, and a dance floor that never sleeps."
  }
];

const place = computed(() => places.find(p => p.id === parseInt(route.params.id)))

const isBooking = ref(false)
const Swal = window.Swal

const handleBookVip = async () => {
  if (!localStorage.getItem('token')) {
    return Swal.fire({ title: 'Access Denied', text: 'Please login to book a VIP table.', icon: 'warning', background: '#111', color: '#fff' })
  }

  isBooking.value = true
  try {
    const res = await apiService.bookVip({ placeName: place.value.name })
    
    // Update local storage user data
    const user = JSON.parse(localStorage.getItem('user'))
    user.tokens = res.data.tokens
    user.bookings = res.data.bookings
    localStorage.setItem('user', JSON.stringify(user))
    
    Swal.fire({
      title: 'Reservation Confirmed!',
      html: `
        <div class="text-center p-4">
          <p class="text-gray-400 mb-6 font-bold uppercase tracking-widest text-[10px]">Your VIP Access is Secured</p>
          <div class="glass p-6 rounded-3xl border border-primary/20 mb-6">
            <div class="text-[9px] text-primary font-black uppercase tracking-[0.2em] mb-2">Location</div>
            <div class="text-xl font-black uppercase text-white">${place.value.name}</div>
          </div>
          <p class="text-xs text-gray-500 font-bold uppercase tracking-widest">50 Tokens deducted from your vault.</p>
        </div>
      `,
      icon: 'success',
      background: '#111',
      color: '#fff',
      confirmButtonColor: '#F5C518',
      confirmButtonText: 'VIEW MY ACCESS'
    }).then(() => {
      window.location.reload() // Refresh to update header and sync dashboard
    })
  } catch (err) {
    Swal.fire({
      title: 'Booking Failed',
      text: err.response?.data?.error || 'An error occurred during booking.',
      icon: 'error',
      background: '#111',
      color: '#fff'
    })
  } finally {
    isBooking.value = false
  }
}
</script>
