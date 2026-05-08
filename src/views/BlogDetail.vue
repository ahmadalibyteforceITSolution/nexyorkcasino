<template>
  <div v-if="blog" class="pt-32 pb-20 container mx-auto px-4 max-w-4xl animate-in fade-in slide-in-from-bottom-10 duration-1000">
    <!-- Back Button -->
    <button @click="$router.push('/magazine')" class="mb-10 text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 text-gray-500 hover:text-primary transition-all group">
      <span class="group-hover:-translate-x-1 transition-transform">←</span> Return to Magazine
    </button>

    <!-- Header Section -->
    <header class="mb-12">
      <div class="flex items-center gap-4 mb-6">
        <span class="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase tracking-widest rounded-full border border-primary/20">{{ blog.category }}</span>
        <span class="text-[10px] text-gray-600 font-bold uppercase tracking-widest">{{ blog.date }}</span>
      </div>
      <h1 class="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-[0.9] font-outfit mb-8">{{ blog.title }}</h1>
      <p class="text-xl text-gray-400 font-medium leading-relaxed italic border-l-4 border-primary pl-8 py-2">{{ blog.excerpt }}</p>
    </header>

    <!-- Main Image -->
    <div class="relative rounded-[60px] overflow-hidden aspect-[16/9] mb-16 glass group border border-white/5">
      <img :src="blog.image" :alt="blog.title" loading="lazy" width="1200" height="675" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2000ms]">
      <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
      <div class="absolute bottom-10 left-10">
        <div class="flex items-center gap-4">
          <div class="w-12 h-12 rounded-full border-2 border-primary overflow-hidden">
            <img src="https://i.pravatar.cc/150?u=author" alt="Author" width="48" height="48">
          </div>
          <div>
            <div class="text-[10px] font-black uppercase tracking-widest text-primary">Exclusive Report by</div>
            <div class="text-sm font-bold text-white">X. Valentine</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Article Content -->
    <div class="prose prose-invert prose-xl max-w-none mb-20">
      <p class="first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-primary">
        {{ blog.content || "In the deep shadows of the NexYork arena, where the scent of expensive perfume mingles with the static charge of high-frequency trading, a new kind of game is being played. It's not just about the tokens or the jackpots anymore—it's about the social dominance that comes with every 'All-In' move. This is the world of the provocative elite, where every bet is a statement of power and every win is a seductive whisper of status." }}
      </p>
      <p>
        The city never sleeps, but it definitely dreams. From the underground poker dens of the Meatpacking District to the glass-walled penthouses of Billionaires' Row, the high-stakes lifestyle is evolving into something more visceral, more personal. We're seeing a shift from traditional gambling to an 'Experience Economy' where the thrill of the risk is the ultimate aphrodisiac.
      </p>
      <h3>The Seductive Power of the Bankroll</h3>
      <p>
        Why do the world's most successful players continue to risk it all? It's not the money—it's the neurological surge. Scientific studies have shown that the dopamine release during a high-stakes bet is identical to that of intense attraction. When you play in the NexYork arena, you're not just playing against the house; you're playing against your own limits.
      </p>
    </div>

    <!-- User Interactive Section -->
    <div class="glass rounded-[50px] p-12 border border-white/5 mb-20 relative overflow-hidden">
      <div class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] -mr-32 -mt-32"></div>
      
      <div class="flex flex-col md:flex-row items-center justify-between gap-10">
        <div class="text-center md:text-left">
          <h4 class="text-2xl font-black uppercase tracking-tight mb-2">Did this ignite your interest?</h4>
          <p class="text-gray-500 text-sm font-bold uppercase tracking-widest">Connect with the community below</p>
        </div>

        <div class="flex items-center gap-6">
          <!-- Like Button -->
          <button @click="toggleLike" class="flex flex-col items-center gap-2 group">
            <div :class="['w-20 h-20 rounded-full flex items-center justify-center transition-all duration-500 relative', isLiked ? 'bg-primary text-black' : 'bg-white/5 text-gray-500 hover:bg-white/10']">
              <i class="fa-solid fa-heart text-2xl" :class="{'animate-ping absolute opacity-50': isLiked}"></i>
              <i class="fa-solid fa-heart text-2xl relative z-10"></i>
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest">{{ likesCount }} Likes</span>
          </button>

          <!-- Share Button -->
          <button @click="shareArticle" class="flex flex-col items-center gap-2 group">
            <div class="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:bg-white/10 transition-all">
              <i class="fa-solid fa-share-nodes text-2xl"></i>
            </div>
            <span class="text-[10px] font-black uppercase tracking-widest">Share</span>
          </button>
        </div>
      </div>

      <!-- Interactive Comments -->
      <div class="mt-16 pt-16 border-t border-white/5">
        <h5 class="text-sm font-black uppercase tracking-[0.3em] mb-10 text-primary">Underground Discussion</h5>
        
        <div class="space-y-8 mb-12">
          <div v-for="(comment, index) in comments" :key="index" class="flex gap-6 animate-in slide-in-from-left duration-500">
            <div class="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 flex-shrink-0"></div>
            <div class="bg-white/5 rounded-3xl p-6 flex-grow border border-white/5">
              <div class="flex justify-between items-center mb-2">
                <span class="text-xs font-black uppercase text-primary tracking-widest">{{ comment.user }}</span>
                <span class="text-[9px] text-gray-600 font-bold uppercase">{{ comment.time }}</span>
              </div>
              <p class="text-sm text-gray-300 leading-relaxed">{{ comment.text }}</p>
            </div>
          </div>
        </div>

        <!-- Add Comment -->
        <div class="relative">
          <input 
            v-model="newComment" 
            @keyup.enter="addComment"
            aria-label="Add a comment"
            placeholder="LEAVE YOUR MARK ON THE ARENA..." 
            class="w-full bg-white/5 border border-white/10 rounded-full py-6 px-10 text-xs font-bold tracking-widest focus:outline-none focus:border-primary/50 transition-all uppercase placeholder:text-gray-700"
          >
          <button @click="addComment" aria-label="Submit Comment" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-primary rounded-full text-black flex items-center justify-center hover:scale-110 transition-all">
            ➜
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="h-screen flex items-center justify-center">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <p class="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500">Accessing Exclusive Archives...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { blogs } from '../data/blogs'

const Swal = window.Swal
const route = useRoute()
const blog = computed(() => blogs.find(b => b.slug === route.params.slug))

const isLiked = ref(false)
const likesCount = ref(Math.floor(Math.random() * 500) + 120)
const newComment = ref('')
const comments = ref([
  { user: 'ViperX', text: 'This hit a little too close to home. The rush is addictive.', time: '2h ago' },
  { user: 'CasinoQueen', text: 'Luxury is just the skin. The game is the soul.', time: '5h ago' }
])

const toggleLike = () => {
  isLiked.value = !isLiked.value
  likesCount.value += isLiked.value ? 1 : -1
}

const addComment = () => {
  if (!newComment.value.trim()) return
  comments.value.push({
    user: 'GUEST_USER',
    text: newComment.value,
    time: 'Just now'
  })
  newComment.value = ''
}

const shareArticle = () => {
  navigator.clipboard.writeText(window.location.href)
  Swal.fire({
    title: 'LINK COPIED',
    text: 'Spread the influence to your network.',
    icon: 'success',
    background: '#000',
    color: '#fff',
    confirmButtonColor: '#ffbb33',
    customClass: {
      popup: 'glass rounded-[30px] border border-white/10'
    }
  })
}

onMounted(() => {
  window.scrollTo(0, 0)
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #ffbb33 0%, #ff8800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
