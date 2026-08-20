<template>
  <div v-if="blog" class="pt-32 pb-24 container mx-auto px-4 max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 font-outfit">
    <!-- Top Breadcrumbs & Back Navigation -->
    <div class="flex items-center justify-between mb-8 pb-4 border-b border-white/10 text-xs">
      <nav class="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-wider">
        <router-link to="/" class="hover:text-[#F0B90B] transition-colors">Home</router-link>
        <span class="text-gray-600">/</span>
        <router-link to="/magazine" class="hover:text-[#F0B90B] transition-colors">Magazine</router-link>
        <span class="text-gray-600">/</span>
        <span class="text-[#F0B90B] truncate max-w-[200px] sm:max-w-xs">{{ blog.category }}</span>
      </nav>

      <button 
        @click="$router.push('/magazine')" 
        class="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 text-gray-400 hover:text-[#F0B90B] transition-all group px-4 py-2 rounded-full bg-white/5 border border-white/10"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span> Return to Articles
      </button>
    </div>

    <!-- Header Section -->
    <header class="mb-12">
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <span class="px-4 py-1.5 bg-[#F0B90B]/10 text-[#F0B90B] text-xs font-black uppercase tracking-widest rounded-full border border-[#F0B90B]/30">
          {{ blog.category }}
        </span>
        <span class="text-xs text-gray-500 font-bold uppercase tracking-widest">
          <i class="fa-regular fa-calendar mr-1"></i> {{ blog.date }}
        </span>
        <span class="text-xs text-gray-500 font-bold uppercase tracking-widest">
          <i class="fa-regular fa-clock mr-1"></i> 5 MIN READ
        </span>
        <span class="text-xs text-[#0ECB81] font-bold uppercase tracking-widest bg-[#0ECB81]/10 px-3 py-1 rounded-full border border-[#0ECB81]/20">
          <i class="fa-solid fa-gem mr-1"></i> VIP EXCLUSIVE
        </span>
      </div>

      <h1 class="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight leading-[0.95] text-white mb-8">
        {{ blog.title }}
      </h1>

      <p class="text-lg md:text-xl text-gray-300 font-sans font-normal leading-relaxed italic border-l-4 border-[#F0B90B] pl-6 py-2 bg-gradient-to-r from-[#F0B90B]/10 to-transparent rounded-r-2xl">
        {{ blog.excerpt }}
      </p>
    </header>

    <!-- Luxury Romance Rating Grid Banner -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
      <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-red-500/10 text-red-400 flex items-center justify-center text-lg flex-shrink-0">
          <i class="fa-solid fa-fire"></i>
        </div>
        <div>
          <div class="text-[10px] text-gray-500 uppercase font-black tracking-widest">Romance Index</div>
          <div class="text-sm font-black text-white">98% Allure</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-[#F0B90B]/10 text-[#F0B90B] flex items-center justify-center text-lg flex-shrink-0">
          <i class="fa-solid fa-crown"></i>
        </div>
        <div>
          <div class="text-[10px] text-gray-500 uppercase font-black tracking-widest">Luxury Tier</div>
          <div class="text-sm font-black text-[#F0B90B]">Manhattan VIP</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center text-lg flex-shrink-0">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div>
          <div class="text-[10px] text-gray-500 uppercase font-black tracking-widest">High Stakes</div>
          <div class="text-sm font-black text-white">High Frequency</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-lg flex-shrink-0">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <div>
          <div class="text-[10px] text-gray-500 uppercase font-black tracking-widest">Moodboard</div>
          <button @click="pinToMoodboard" class="text-xs font-black text-[#F0B90B] hover:underline uppercase">
            + Pick Story
          </button>
        </div>
      </div>
    </div>

    <!-- Main Hero Image with Draggable & Lightbox Controls -->
    <div 
      draggable="true"
      @dragstart="handleDragStart"
      class="relative rounded-[40px] md:rounded-[55px] overflow-hidden aspect-[16/9] mb-16 glass group border border-white/10 cursor-grab active:cursor-grabbing shadow-2xl bg-black"
    >
      <img 
        :src="blog.image" 
        :alt="blog.title + ' - NexYork Luxury Romance & Casino Nightlife'" 
        loading="lazy" 
        width="1200" 
        height="675" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-80"></div>

      <!-- Quick Action Overlay Buttons -->
      <div class="absolute top-6 right-6 flex items-center gap-3">
        <button 
          @click="openImageLightbox" 
          class="px-4 py-2 rounded-full bg-black/60 hover:bg-[#F0B90B] hover:text-black backdrop-blur-md text-white text-xs font-black uppercase tracking-wider border border-white/20 transition-all shadow-lg flex items-center gap-2"
          title="Open Romance Photo Lightbox"
        >
          <i class="fa-solid fa-expand"></i> Lightbox
        </button>
        <button 
          @click="pinToMoodboard" 
          class="px-4 py-2 rounded-full bg-[#F0B90B] text-black text-xs font-black uppercase tracking-wider transition-all shadow-lg hover:scale-105 flex items-center gap-2"
          title="Pick and Drop to VIP Moodboard"
        >
          <i class="fa-solid fa-thumbtack"></i> Pick to Board
        </button>
      </div>

      <!-- Author badge -->
      <div class="absolute bottom-8 left-8 md:bottom-12 md:left-12 flex items-center gap-4">
        <div class="w-14 h-14 rounded-2xl border-2 border-[#F0B90B] overflow-hidden bg-black flex-shrink-0 shadow-xl">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Author" width="56" height="56" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-[#F0B90B]">Exclusive Report by</div>
          <div class="text-base font-black text-white">Vivienne De La Croix</div>
          <div class="text-[10px] text-gray-400 font-mono">Senior Luxury & Nightlife Editor • Manhattan Bureau</div>
        </div>
      </div>

      <!-- Drag Hint -->
      <div class="absolute bottom-8 right-8 hidden md:flex items-center gap-2 bg-black/70 px-3 py-1.5 rounded-full text-[10px] text-gray-400 border border-white/10">
        <i class="fa-solid fa-hand-pointer text-[#F0B90B]"></i> Drag photo to Moodboard
      </div>
    </div>

    <!-- Article Body Section -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
      
      <!-- Main Long-Form Narrative Column -->
      <div class="lg:col-span-8 font-sans text-gray-300 text-base md:text-lg leading-relaxed space-y-8 select-text">
        <p class="first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-[#F0B90B] font-outfit">
          {{ blog.content || "In the deep shadows of the NexYork arena, where the scent of rare oud and vintage champagne mingles with the ambient pulse of high-frequency cryptocurrency orderbooks, a new standard of nightlife has taken root. It is not merely about chips on green felt or digital tokens deposited in cold vaults—it is about the captivating allure of social dominance, high-stakes romance, and the electric thrill that ignites when fortune favors the audacious." }}
        </p>

        <p>
          New York City after midnight operates on an unspoken frequency. From the velvet-curtained penthouses of Tribeca to the clandestine high-roller salons overlooking Central Park, the contemporary elite have discovered that wagering on high-variance moments is the ultimate sensory experience. Here, every bluff carries personal weight, every winning streak draws admiring glances, and every All-In wager becomes an intimate declaration of power.
        </p>

        <!-- Quotable Lavish Highlight Box with 1-Click Pin -->
        <blockquote 
          draggable="true" 
          @dragstart="handleQuoteDragStart" 
          class="glass rounded-3xl p-8 border-l-4 border-[#F0B90B] bg-[#161618] my-8 relative group"
        >
          <div class="text-xs font-black uppercase tracking-widest text-[#F0B90B] mb-2 flex items-center justify-between">
            <span><i class="fa-solid fa-quote-left mr-2"></i> Lavish NYC Philosophy</span>
            <button @click="copyQuote" class="text-[10px] text-gray-400 hover:text-white uppercase font-mono">
              <i class="fa-regular fa-copy mr-1"></i> Copy Quote
            </button>
          </div>
          <p class="font-outfit text-xl font-bold text-white leading-snug">
            "In high-stakes gaming and elite romance, the risk is not what you forfeit if you lose—it is the exhilaration of daring to possess what ordinary players never dream to touch."
          </p>
          <div class="mt-4 flex items-center justify-between text-xs text-gray-500 font-bold uppercase tracking-wider">
            <span>— NexYork VIP High Roller Gazette</span>
            <button @click="pinQuote" class="text-[#F0B90B] hover:underline text-[11px] font-black">
              + Pin Quote to Board
            </button>
          </div>
        </blockquote>

        <h2 class="font-outfit text-3xl font-black uppercase tracking-tight text-white pt-4">
          The Neurological Surge: Why Risk & Romance Collide
        </h2>

        <p>
          Scientific neuro-imaging studies have repeatedly shown that the adrenaline cascade during high-stakes decision-making triggers dopamine receptors in a pattern indistinguishable from the sudden spark of intense romantic attraction. When navigating the tables at the <router-link to="/arena" class="text-[#F0B90B] underline font-bold hover:text-white">NexYork Live Arena</router-link>, players are interacting with a multi-layered social hierarchy where confidence, style, and financial fearlessness command immediate deference.
        </p>

        <!-- Key Takeaways & Strategic Summary (SEO Featured Snippet Box) -->
        <div class="p-8 rounded-3xl bg-gradient-to-br from-[#1a1d24] to-[#121418] border border-[#F0B90B]/30 shadow-xl">
          <h3 class="font-outfit text-xl font-black uppercase tracking-wide text-[#F0B90B] mb-4 flex items-center gap-2">
            <i class="fa-solid fa-lightbulb"></i> Key Lavish Takeaways & Nightlife Protocols
          </h3>
          <ul class="space-y-3 text-sm text-gray-300 font-sans">
            <li class="flex items-start gap-3">
              <span class="text-[#F0B90B] font-bold text-base">✓</span>
              <span><strong>The Psychology of Poise:</strong> Maintaining composed body language at high-limit roulette and baccarat tables signals social mastery.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#F0B90B] font-bold text-base">✓</span>
              <span><strong>Liquidity as Lifestyle:</strong> Instant crypto deposits via the <router-link to="/wallet" class="text-[#F0B90B] underline">NexYork Multi-Chain Wallet</router-link> allow seamless transitions between digital portfolios and luxury recreation.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#F0B90B] font-bold text-base">✓</span>
              <span><strong>VIP Affiliate & Network Allure:</strong> Leveraging the <router-link to="/earn" class="text-[#F0B90B] underline">20% Affiliate Earn Center</router-link> turns social circles into lucrative passive rewards.</span>
            </li>
          </ul>
        </div>

        <h3 class="font-outfit text-2xl font-black uppercase tracking-tight text-white pt-4">
          The Curated Manhattan After-Hours Itinerary
        </h3>

        <p>
          Whether ending the evening over bespoke martinis in SoHo or monitoring live sports odds from a private skyline terrace, the modern gaming lifestyle seamlessly unites luxury dining, haute couture fashion, and blockchain-backed wagering. Explore our verified citations to <a href="https://gaming.ny.gov" target="_blank" rel="noopener noreferrer" class="text-[#F0B90B] underline hover:text-white">New York State Gaming standards</a> and <a href="https://www.nyctourism.com" target="_blank" rel="noopener noreferrer" class="text-[#F0B90B] underline hover:text-white">NYC Tourism luxury hotspots</a> for compliant and exhilarating experiences.
        </p>
      </div>

      <!-- Right Sticky VIP Sidebar & Quick Internal Links -->
      <aside class="lg:col-span-4 space-y-6">
        
        <!-- Interactive VIP CTA Card -->
        <div class="glass p-6 rounded-3xl border border-[#F0B90B]/30 bg-[#161618] relative overflow-hidden shadow-xl">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#F0B90B]/10 rounded-full blur-2xl pointer-events-none"></div>
          <div class="text-xs font-black uppercase text-[#F0B90B] tracking-widest mb-2 flex items-center gap-2">
            <i class="fa-solid fa-crown"></i> NEXYORK VIP EXPERIENCE
          </div>
          <h4 class="font-outfit font-black text-xl text-white uppercase mb-2">Step Into The Live Arena</h4>
          <p class="text-xs text-gray-400 leading-relaxed mb-6 font-sans">
            Experience real-time sports betting, Provably Fair Crash & Mines games, and VIP rewards with instant crypto payouts.
          </p>
          <router-link to="/arena" class="w-full btn-primary py-3.5 px-4 text-xs uppercase tracking-widest text-center block shadow-lg">
            ENTER ARENA NOW ➜
          </router-link>
        </div>

        <!-- Earn Affiliate Program Box -->
        <div class="glass p-6 rounded-3xl border border-white/10 bg-[#161618]">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 rounded-xl bg-[#0ECB81]/10 text-[#0ECB81] flex items-center justify-center font-black">
              💰
            </div>
            <div>
              <div class="text-[10px] font-black uppercase text-[#0ECB81] tracking-widest">Affiliate Program</div>
              <h5 class="text-sm font-black text-white uppercase">Earn 20% Lifetime Commission</h5>
            </div>
          </div>
          <p class="text-xs text-gray-400 leading-relaxed mb-4">
            Invite fellow high-rollers and earn automated commissions on every single arena round.
          </p>
          <router-link to="/earn" class="text-xs font-black text-[#F0B90B] hover:underline uppercase flex items-center gap-1">
            Access Earn Center ➜
          </router-link>
        </div>

        <!-- Social Share & Backlink Copy -->
        <div class="glass p-6 rounded-3xl border border-white/10 bg-[#161618] space-y-4">
          <h5 class="text-xs font-black uppercase tracking-widest text-gray-400">Share & Embed Story</h5>
          <div class="grid grid-cols-2 gap-2">
            <button @click="shareArticle" class="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-xs font-bold text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-all">
              <i class="fa-solid fa-link text-[#F0B90B]"></i> Copy URL
            </button>
            <button @click="shareTelegram" class="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-[#0088cc] text-xs font-bold text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-all">
              <i class="fa-brands fa-telegram"></i> Telegram
            </button>
            <button @click="shareTwitter" class="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-black text-xs font-bold text-gray-300 hover:text-white flex items-center justify-center gap-2 transition-all">
              <i class="fa-brands fa-x-twitter"></i> Post on X
            </button>
            <button @click="pinToMoodboard" class="py-2.5 px-3 rounded-xl bg-[#F0B90B]/10 hover:bg-[#F0B90B] text-[#F0B90B] hover:text-black text-xs font-black flex items-center justify-center gap-2 transition-all">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Moodboard
            </button>
          </div>
        </div>

      </aside>
    </div>

    <!-- Interactive Comments & Reactions Section -->
    <div class="glass rounded-[40px] p-8 md:p-12 border border-white/10 mb-20 relative overflow-hidden bg-[#161618]">
      <div class="flex flex-col md:flex-row items-center justify-between gap-8 pb-10 border-b border-white/10">
        <div>
          <h4 class="text-2xl md:text-3xl font-black uppercase tracking-tight mb-2 text-white">Did this article inspire you?</h4>
          <p class="text-gray-400 text-xs font-bold uppercase tracking-widest font-sans">
            Connect with the underground VIP community & share feedback
          </p>
        </div>

        <div class="flex items-center gap-4">
          <!-- Like Button -->
          <button @click="toggleLike" class="flex items-center gap-3 px-6 py-3.5 rounded-2xl transition-all" :class="isLiked ? 'bg-red-500 text-white shadow-lg' : 'bg-white/5 hover:bg-white/10 text-gray-400'">
            <i class="fa-solid fa-heart text-lg" :class="{ 'animate-ping': isLiked }"></i>
            <span class="text-xs font-black uppercase tracking-wider">{{ likesCount }} LIKES</span>
          </button>

          <!-- Pin to Moodboard -->
          <button @click="pinToMoodboard" class="flex items-center gap-3 px-6 py-3.5 rounded-2xl bg-[#F0B90B] text-black font-black text-xs uppercase tracking-wider hover:scale-105 transition-transform shadow-lg">
            <i class="fa-solid fa-thumbtack"></i> PIN ARTICLE
          </button>
        </div>
      </div>

      <!-- Comments Stream -->
      <div class="mt-10">
        <h5 class="text-xs font-black uppercase tracking-[0.2em] mb-6 text-[#F0B90B]">Community Discussion ({{ comments.length }})</h5>
        
        <div class="space-y-4 mb-8">
          <div v-for="(comment, index) in comments" :key="index" class="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-[#F0B90B]/30 to-transparent border border-[#F0B90B]/30 flex items-center justify-center font-black text-xs text-[#F0B90B] flex-shrink-0">
              {{ comment.user.charAt(0) }}
            </div>
            <div class="flex-grow">
              <div class="flex justify-between items-center mb-1">
                <span class="text-xs font-black uppercase text-[#F0B90B] tracking-wider">{{ comment.user }}</span>
                <span class="text-[10px] text-gray-500 font-bold uppercase font-mono">{{ comment.time }}</span>
              </div>
              <p class="text-xs text-gray-300 font-sans leading-relaxed">{{ comment.text }}</p>
            </div>
          </div>
        </div>

        <!-- Add Comment Input -->
        <div class="relative">
          <input 
            v-model="newComment" 
            @keyup.enter="addComment"
            aria-label="Add a comment"
            placeholder="LEAVE YOUR VIP THOUGHTS ON THIS STORY..." 
            class="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 pr-14 text-xs font-bold tracking-wider focus:outline-none focus:border-[#F0B90B] transition-all uppercase placeholder:text-gray-600 text-white"
          >
          <button @click="addComment" aria-label="Submit Comment" class="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#F0B90B] rounded-xl text-black flex items-center justify-center hover:scale-110 transition-all font-black text-sm">
            ➜
          </button>
        </div>
      </div>
    </div>

    <!-- Related Lavish Articles Grid -->
    <div class="mb-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <div class="text-[10px] font-black uppercase text-[#F0B90B] tracking-widest mb-1">CONTINUE READING</div>
          <h3 class="text-2xl md:text-3xl font-black uppercase text-white tracking-tight">
            Related <span class="text-gradient">Lavish Stories</span>
          </h3>
        </div>
        <router-link to="/magazine" class="text-xs font-black text-[#F0B90B] hover:underline uppercase">
          VIEW ALL 75+ STORIES ➜
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article 
          v-for="rel in relatedBlogs" 
          :key="rel.id"
          @click="$router.push(`/magazine/${rel.slug}`)"
          class="glass rounded-3xl overflow-hidden border border-white/10 hover:border-[#F0B90B]/40 transition-all group cursor-pointer bg-[#161618] flex flex-col justify-between shadow-xl"
        >
          <div>
            <div class="h-44 relative overflow-hidden">
              <img :src="rel.image" :alt="rel.title" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute top-3 left-3 bg-black/70 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-black text-[#F0B90B] border border-white/10 uppercase">
                {{ rel.category }}
              </div>
            </div>
            <div class="p-5">
              <div class="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-2">{{ rel.date }}</div>
              <h4 class="text-sm font-black uppercase leading-snug text-white group-hover:text-[#F0B90B] transition-colors line-clamp-2">{{ rel.title }}</h4>
            </div>
          </div>
          <div class="p-5 pt-0 flex items-center justify-between border-t border-white/5 mt-2">
            <span class="text-[10px] font-black text-gray-400 uppercase">Read Story</span>
            <span class="text-xs text-[#F0B90B] font-bold group-hover:translate-x-1 transition-transform">➜</span>
          </div>
        </article>
      </div>
    </div>

    <!-- Verified Authority Backlinks Directory -->
    <AuthorityBacklinks />

  </div>
  <div v-else class="h-screen flex items-center justify-center font-outfit">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-[#F0B90B] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <p class="text-xs font-black uppercase tracking-[0.4em] text-gray-500">Accessing Exclusive Archives...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { blogs } from '../data/blogs'
import AuthorityBacklinks from '../components/AuthorityBacklinks.vue'

const route = useRoute()
const blog = computed(() => blogs.find(b => b.slug === route.params.slug) || blogs[0])

const isLiked = ref(false)
const likesCount = ref(Math.floor(Math.random() * 400) + 180)
const newComment = ref('')
const comments = ref([
  { user: 'ViperX', text: 'This hit a little too close to home. The rush of the All-In bluff is addictive.', time: '2h ago' },
  { user: 'CasinoQueen', text: 'Luxury is just the skin. The strategic nerve is the soul.', time: '5h ago' },
  { user: 'ManhattanWhale', text: 'Top tier nightlife analysis. The live arena tables in NYC are unmatched.', time: '1d ago' }
])

const relatedBlogs = computed(() => {
  if (!blog.value) return blogs.slice(0, 3)
  return blogs.filter(b => b.slug !== blog.value.slug && b.category === blog.value.category).slice(0, 3).length === 3 
    ? blogs.filter(b => b.slug !== blog.value.slug && b.category === blog.value.category).slice(0, 3)
    : blogs.filter(b => b.slug !== blog.value.slug).slice(0, 3)
})

const toggleLike = () => {
  isLiked.value = !isLiked.value
  likesCount.value += isLiked.value ? 1 : -1
}

const addComment = () => {
  if (!newComment.value.trim()) return
  comments.value.push({
    user: 'VIP_GUEST',
    text: newComment.value,
    time: 'Just now'
  })
  newComment.value = ''
}

// Moodboard Pick & Drop Actions
const pinToMoodboard = () => {
  if (!blog.value) return
  window.dispatchEvent(new CustomEvent('nexyork:pick-item', {
    detail: {
      title: blog.value.title,
      category: blog.value.category,
      excerpt: blog.value.excerpt,
      image: blog.value.image,
      slug: blog.value.slug,
      type: 'STORY'
    }
  }))
}

const pinQuote = () => {
  window.dispatchEvent(new CustomEvent('nexyork:pick-item', {
    detail: {
      title: '"In high-stakes gaming and elite romance, the risk is the exhilaration..."',
      category: 'QUOTE',
      type: 'QUOTE',
      slug: blog.value?.slug || ''
    }
  }))
}

const openImageLightbox = () => {
  if (!blog.value) return
  window.dispatchEvent(new CustomEvent('nexyork:open-lightbox', {
    detail: {
      image: blog.value.image,
      title: blog.value.title
    }
  }))
}

const handleDragStart = (e) => {
  if (!blog.value) return
  const itemData = {
    title: blog.value.title,
    category: blog.value.category,
    excerpt: blog.value.excerpt,
    image: blog.value.image,
    slug: blog.value.slug,
    type: 'PHOTO'
  }
  e.dataTransfer.setData('application/json', JSON.stringify(itemData))
  e.dataTransfer.setData('text/plain', `${blog.value.title} - https://nexyorkcasino.vercel.app/magazine/${blog.value.slug}`)
}

const handleQuoteDragStart = (e) => {
  const quoteText = `"In high-stakes gaming and elite romance, the risk is the exhilaration..." - NexYork Luxury Magazine`
  e.dataTransfer.setData('text/plain', quoteText)
}

const copyQuote = () => {
  const quote = `"In high-stakes gaming and elite romance, the risk is not what you forfeit if you lose—it is the exhilaration of daring to possess what ordinary players never dream to touch." — NexYork Magazine (https://nexyorkcasino.vercel.app/magazine/${blog.value?.slug})`
  navigator.clipboard.writeText(quote)
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'QUOTE COPIED',
      text: 'Quote copied with source backlink citation.',
      icon: 'success',
      timer: 1800,
      showConfirmButton: false,
      background: '#0B0E11',
      color: '#fff'
    })
  }
}

const shareArticle = () => {
  navigator.clipboard.writeText(window.location.href)
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'LINK COPIED',
      text: 'Share this exclusive report with your VIP circle.',
      icon: 'success',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B'
    })
  }
}

const shareTelegram = () => {
  const text = encodeURIComponent(`${blog.value.title} - NexYork Luxury Nightlife & Casino Gazette`)
  const url = encodeURIComponent(window.location.href)
  window.open(`https://t.me/share/url?url=${url}&text=${text}`, '_blank')
}

const shareTwitter = () => {
  const text = encodeURIComponent(`Reading "${blog.value.title}" on @NexYorkCasino 🍸✨`)
  const url = encodeURIComponent(window.location.href)
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

// Dynamic Schema Injection for Google SEO
const injectStructuredData = () => {
  if (!blog.value) return
  
  // Remove existing dynamic schemas
  document.querySelectorAll('script[data-dynamic-schema="true"]').forEach(el => el.remove())

  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://nexyorkcasino.vercel.app/magazine/${blog.value.slug}`
    },
    "headline": blog.value.title,
    "description": blog.value.excerpt,
    "image": [blog.value.image],
    "datePublished": "2026-05-04T08:00:00+08:00",
    "dateModified": "2026-08-20T08:00:00+08:00",
    "author": {
      "@type": "Person",
      "name": "Vivienne De La Croix",
      "jobTitle": "Senior Luxury & Nightlife Editor"
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexYork Elite Casino & Sports Exchange",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nexyorkcasino.vercel.app/favicon.png"
      }
    }
  }

  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.setAttribute('data-dynamic-schema', 'true')
  script.textContent = JSON.stringify(schema)
  document.head.appendChild(script)
}

watch(() => route.params.slug, () => {
  window.scrollTo({ top: 0, behavior: 'smooth' })
  injectStructuredData()
})

onMounted(() => {
  window.scrollTo(0, 0)
  injectStructuredData()
})
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #F0B90B 0%, #ff8800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
