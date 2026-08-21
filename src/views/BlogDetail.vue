<template>
  <div v-if="blog" class="pt-32 pb-24 container mx-auto px-4 max-w-5xl animate-in fade-in slide-in-from-bottom-6 duration-700 font-outfit">
    <!-- Top Breadcrumbs & Back Navigation -->
    <div class="flex items-center justify-between mb-8 pb-4 border-b border-[#EFE8DF] text-xs">
      <nav class="flex items-center gap-2 text-[#718096] font-bold uppercase tracking-wider">
        <router-link to="/" class="hover:text-[#FF7A00] transition-colors">Home</router-link>
        <span class="text-[#CBD5E0]">/</span>
        <router-link to="/magazine" class="hover:text-[#FF7A00] transition-colors">Magazine</router-link>
        <span class="text-[#CBD5E0]">/</span>
        <span class="text-[#FF7A00] truncate max-w-[200px] sm:max-w-xs">{{ blog.category }}</span>
      </nav>

      <button 
        @click="$router.push('/magazine')" 
        class="text-[11px] font-black uppercase tracking-widest flex items-center gap-2 text-[#5A6474] hover:text-[#FF7A00] transition-all group px-4 py-2 rounded-full bg-white border border-[#E2D9CE] cursor-pointer shadow-2xs"
      >
        <span class="group-hover:-translate-x-1 transition-transform">←</span> Return to 1,000+ Articles
      </button>
    </div>

    <!-- Header Section -->
    <header class="mb-12">
      <div class="flex flex-wrap items-center gap-3 mb-6">
        <span class="px-4 py-1.5 bg-orange-100/80 text-[#FF7A00] text-xs font-black uppercase tracking-widest rounded-full border border-orange-200 shadow-xs">
          {{ blog.category }}
        </span>
        <span class="text-xs text-[#718096] font-bold uppercase tracking-widest">
          <i class="fa-regular fa-calendar mr-1"></i> {{ blog.date }}
        </span>
        <span class="text-xs text-[#718096] font-bold uppercase tracking-widest">
          <i class="fa-regular fa-clock mr-1"></i> 5 MIN READ
        </span>
        <span class="text-xs text-emerald-700 font-bold uppercase tracking-widest bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
          <i class="fa-solid fa-gem mr-1"></i> VIP EXCLUSIVE
        </span>
      </div>

      <h1 class="text-3xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-[1.05] text-[#1A202C] mb-8">
        {{ blog.title }}
      </h1>

      <p class="text-base md:text-lg text-[#4A5568] font-sans font-normal leading-relaxed italic border-l-4 border-[#FF7A00] pl-6 py-3 bg-gradient-to-r from-orange-50/80 to-transparent rounded-r-2xl border border-orange-100/50">
        {{ blog.excerpt }}
      </p>
    </header>

    <!-- Luxury Romance Rating Grid Banner -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
      <div class="p-4 rounded-2xl bg-white border border-[#E2D9CE] flex items-center gap-3 shadow-xs">
        <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center text-lg flex-shrink-0">
          <i class="fa-solid fa-fire"></i>
        </div>
        <div>
          <div class="text-[10px] text-[#718096] uppercase font-black tracking-widest">Romance Index</div>
          <div class="text-sm font-black text-[#1A202C]">98% Allure</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-[#E2D9CE] flex items-center gap-3 shadow-xs">
        <div class="w-10 h-10 rounded-xl bg-orange-100 text-[#FF7A00] flex items-center justify-center text-lg flex-shrink-0">
          <i class="fa-solid fa-crown"></i>
        </div>
        <div>
          <div class="text-[10px] text-[#718096] uppercase font-black tracking-widest">Luxury Tier</div>
          <div class="text-sm font-black text-[#FF7A00]">Manhattan VIP</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-[#E2D9CE] flex items-center gap-3 shadow-xs">
        <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-lg flex-shrink-0">
          <i class="fa-solid fa-chart-line"></i>
        </div>
        <div>
          <div class="text-[10px] text-[#718096] uppercase font-black tracking-widest">High Stakes</div>
          <div class="text-sm font-black text-[#1A202C]">High Frequency</div>
        </div>
      </div>

      <div class="p-4 rounded-2xl bg-white border border-[#E2D9CE] flex items-center gap-3 shadow-xs">
        <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center text-lg flex-shrink-0">
          <i class="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <div>
          <div class="text-[10px] text-[#718096] uppercase font-black tracking-widest">Moodboard</div>
          <button @click="pinToMoodboard" class="text-xs font-black text-[#FF7A00] hover:underline uppercase cursor-pointer">
            + Pick Story
          </button>
        </div>
      </div>
    </div>

    <!-- Main Hero Image with Draggable Controls -->
    <div 
      draggable="true"
      @dragstart="handleDragStart"
      class="relative rounded-[35px] md:rounded-[45px] overflow-hidden aspect-[16/9] mb-16 group border border-[#E2D9CE] cursor-grab active:cursor-grabbing shadow-xl bg-[#1A202C]"
    >
      <img 
        :src="blog.image" 
        :alt="blog.title + ' - NexYork Luxury Romance & Casino Nightlife'" 
        loading="lazy" 
        width="1200" 
        height="675" 
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

      <!-- Quick Action Overlay Buttons -->
      <div class="absolute top-6 right-6 flex items-center gap-3">
        <button 
          @click="openImageLightbox" 
          class="px-4 py-2 rounded-full bg-white/90 hover:bg-[#FF7A00] hover:text-white backdrop-blur-md text-[#1A202C] text-xs font-black uppercase tracking-wider border border-orange-200 transition-all shadow-md flex items-center gap-2 cursor-pointer"
          title="Open Photo Lightbox"
        >
          <i class="fa-solid fa-expand"></i> Lightbox
        </button>
        <button 
          @click="pinToMoodboard" 
          class="px-4 py-2 rounded-full bg-gradient-to-r from-[#FF7A00] to-[#FFA15C] text-white text-xs font-black uppercase tracking-wider transition-all shadow-md hover:scale-105 flex items-center gap-2 cursor-pointer"
          title="Pick and Drop to VIP Moodboard"
        >
          <i class="fa-solid fa-thumbtack"></i> Pick to Board
        </button>
      </div>

      <!-- Author badge -->
      <div class="absolute bottom-8 left-8 md:bottom-10 md:left-10 flex items-center gap-4">
        <div class="w-12 h-12 rounded-2xl border-2 border-orange-400 overflow-hidden bg-black flex-shrink-0 shadow-lg">
          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" alt="Author" width="48" height="48" class="w-full h-full object-cover">
        </div>
        <div>
          <div class="text-[10px] font-black uppercase tracking-widest text-[#FFA15C]">Exclusive Report by</div>
          <div class="text-base font-black text-white">Vivienne De La Croix</div>
          <div class="text-[10px] text-gray-300 font-mono">Senior Luxury & Nightlife Editor • Manhattan Bureau</div>
        </div>
      </div>
    </div>

    <!-- Article Body Section -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
      
      <!-- Main Long-Form Narrative Column -->
      <div class="lg:col-span-8 font-sans text-[#33383F] text-base md:text-lg leading-relaxed space-y-8 select-text">
        <p class="first-letter:text-7xl first-letter:font-black first-letter:mr-3 first-letter:float-left first-letter:text-[#FF7A00] font-outfit">
          {{ blog.content }}
        </p>

        <p>
          New York City after midnight operates on an unspoken frequency. From the velvet-curtained penthouses of Tribeca to the clandestine high-roller salons overlooking Central Park, the contemporary elite have discovered that wagering on high-variance moments is the ultimate sensory experience. Here, every bluff carries personal weight, every winning streak draws admiring glances, and every All-In wager becomes an intimate declaration of power.
        </p>

        <!-- Quotable Lavish Highlight Box with 1-Click Pin -->
        <blockquote 
          draggable="true" 
          @dragstart="handleQuoteDragStart" 
          class="rounded-3xl p-8 border-l-4 border-[#FF7A00] bg-white my-8 relative group border border-[#E2D9CE] shadow-sm"
        >
          <div class="text-xs font-black uppercase tracking-widest text-[#FF7A00] mb-2 flex items-center justify-between">
            <span><i class="fa-solid fa-quote-left mr-2"></i> Lavish NYC Philosophy</span>
            <button @click="copyQuote" class="text-[10px] text-[#718096] hover:text-[#1A202C] uppercase font-mono cursor-pointer">
              <i class="fa-regular fa-copy mr-1"></i> Copy Quote
            </button>
          </div>
          <p class="font-outfit text-xl font-bold text-[#1A202C] leading-snug">
            "In high-stakes gaming and elite romance, the risk is not what you forfeit if you lose—it is the exhilaration of daring to possess what ordinary players never dream to touch."
          </p>
          <div class="mt-4 flex items-center justify-between text-xs text-[#718096] font-bold uppercase tracking-wider">
            <span>— NexYork VIP High Roller Gazette</span>
            <button @click="pinQuote" class="text-[#FF7A00] hover:underline text-[11px] font-black cursor-pointer">
              + Pin Quote to Board
            </button>
          </div>
        </blockquote>

        <h2 class="font-outfit text-2xl md:text-3xl font-black uppercase tracking-tight text-[#1A202C] pt-4">
          The Neurological Surge: Why Risk & Romance Collide
        </h2>

        <p>
          Scientific neuro-imaging studies have repeatedly shown that the adrenaline cascade during high-stakes decision-making triggers dopamine receptors in a pattern indistinguishable from the sudden spark of intense romantic attraction. When navigating the tables at the <router-link to="/arena" class="text-[#FF7A00] underline font-bold hover:text-orange-700">NexYork Live Arena</router-link>, players are interacting with a multi-layered social hierarchy where confidence, style, and financial fearlessness command immediate deference.
        </p>

        <!-- Key Takeaways & Strategic Summary (SEO Featured Snippet Box) -->
        <div class="p-8 rounded-3xl bg-gradient-to-br from-orange-50/90 to-amber-50/60 border border-orange-200 shadow-sm">
          <h3 class="font-outfit text-xl font-black uppercase tracking-wide text-[#FF7A00] mb-4 flex items-center gap-2">
            <i class="fa-solid fa-lightbulb"></i> Key Lavish Takeaways & Nightlife Protocols
          </h3>
          <ul class="space-y-3 text-sm text-[#4A5568] font-sans">
            <li class="flex items-start gap-3">
              <span class="text-[#FF7A00] font-black text-base">✓</span>
              <span><strong>The Psychology of Poise:</strong> Maintaining composed body language at high-limit roulette and baccarat tables signals social mastery.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#FF7A00] font-black text-base">✓</span>
              <span><strong>Liquidity as Lifestyle:</strong> Instant crypto deposits via the <router-link to="/wallet" class="text-[#FF7A00] underline font-bold">NexYork Multi-Chain Wallet</router-link> allow seamless transitions between digital portfolios and luxury recreation.</span>
            </li>
            <li class="flex items-start gap-3">
              <span class="text-[#FF7A00] font-black text-base">✓</span>
              <span><strong>VIP Affiliate & Network Allure:</strong> Leveraging the <router-link to="/earn" class="text-[#FF7A00] underline font-bold">20% Affiliate Earn Center</router-link> turns social circles into lucrative passive rewards.</span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Right Sticky VIP Sidebar & Quick Internal Links -->
      <aside class="lg:col-span-4 space-y-6">
        
        <!-- Interactive VIP CTA Card -->
        <div class="p-6 rounded-3xl border border-orange-200 bg-white relative overflow-hidden shadow-md">
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-orange-100/50 rounded-full blur-2xl pointer-events-none"></div>
          <div class="text-xs font-black uppercase text-[#FF7A00] tracking-widest mb-2 flex items-center gap-2">
            <i class="fa-solid fa-crown"></i> NEXYORK VIP EXPERIENCE
          </div>
          <h4 class="font-outfit font-black text-xl text-[#1A202C] uppercase mb-2">Step Into The Live Arena</h4>
          <p class="text-xs text-[#5A6474] leading-relaxed mb-6 font-sans">
            Experience real-time sports betting, Provably Fair Crash & Mines games, and VIP rewards with instant crypto payouts.
          </p>
          <router-link to="/arena" class="w-full btn-primary py-3.5 px-4 text-xs uppercase tracking-widest text-center block shadow-md">
            ENTER ARENA NOW ➜
          </router-link>
        </div>

        <!-- Earn Affiliate Program Box -->
        <div class="p-6 rounded-3xl border border-[#E2D9CE] bg-white shadow-sm">
          <div class="flex items-center gap-3 mb-3">
            <div class="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-black">
              💰
            </div>
            <div>
              <div class="text-[10px] font-black uppercase text-emerald-700 tracking-widest">Affiliate Program</div>
              <h5 class="text-sm font-black text-[#1A202C] uppercase">Earn 20% Lifetime Commission</h5>
            </div>
          </div>
          <p class="text-xs text-[#5A6474] leading-relaxed mb-4">
            Invite fellow high-rollers and earn automated commissions on every single arena round.
          </p>
          <router-link to="/earn" class="text-xs font-black text-[#FF7A00] hover:underline uppercase flex items-center gap-1">
            Access Earn Center ➜
          </router-link>
        </div>

        <!-- Social Share & Backlink Copy -->
        <div class="p-6 rounded-3xl border border-[#E2D9CE] bg-white space-y-4 shadow-sm">
          <h5 class="text-xs font-black uppercase tracking-widest text-[#718096]">Share & Embed Story</h5>
          <div class="grid grid-cols-2 gap-2">
            <button @click="shareArticle" class="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-orange-50 text-xs font-bold text-[#4A5568] hover:text-[#FF7A00] flex items-center justify-center gap-2 transition-all border border-[#E2D9CE] cursor-pointer">
              <i class="fa-solid fa-link text-[#FF7A00]"></i> Copy URL
            </button>
            <button @click="shareTelegram" class="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-sky-50 text-xs font-bold text-[#4A5568] hover:text-sky-600 flex items-center justify-center gap-2 transition-all border border-[#E2D9CE] cursor-pointer">
              <i class="fa-brands fa-telegram text-sky-500"></i> Telegram
            </button>
            <button @click="shareTwitter" class="py-2.5 px-3 rounded-xl bg-[#FAF8F5] hover:bg-stone-100 text-xs font-bold text-[#4A5568] hover:text-black flex items-center justify-center gap-2 transition-all border border-[#E2D9CE] cursor-pointer">
              <i class="fa-brands fa-x-twitter"></i> Post on X
            </button>
            <button @click="pinToMoodboard" class="py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#FF7A00] text-xs font-black flex items-center justify-center gap-2 transition-all border border-orange-200 cursor-pointer">
              <i class="fa-solid fa-wand-magic-sparkles"></i> Moodboard
            </button>
          </div>
        </div>

      </aside>
    </div>

    <!-- Related Lavish Articles Grid -->
    <div class="mb-16">
      <div class="flex items-center justify-between mb-8">
        <div>
          <div class="text-[10px] font-black uppercase text-[#FF7A00] tracking-widest mb-1">CONTINUE READING</div>
          <h3 class="text-2xl md:text-3xl font-black uppercase text-[#1A202C] tracking-tight">
            Related <span class="text-gradient">Lavish Stories</span>
          </h3>
        </div>
        <router-link to="/magazine" class="text-xs font-black text-[#FF7A00] hover:underline uppercase">
          VIEW ALL 1,000+ STORIES ➜
        </router-link>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <article 
          v-for="rel in relatedBlogs" 
          :key="rel.id"
          @click="$router.push(`/magazine/${rel.slug}`)"
          class="bg-white rounded-3xl overflow-hidden border border-[#EAE2D7] hover:border-orange-300 transition-all group cursor-pointer flex flex-col justify-between shadow-sm hover:shadow-xl"
        >
          <div>
            <div class="h-44 relative overflow-hidden">
              <img :src="rel.image" :alt="rel.title" loading="lazy" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700">
              <div class="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-lg text-[9px] font-black text-[#FF7A00] border border-orange-200 uppercase shadow-xs">
                {{ rel.category }}
              </div>
            </div>
            <div class="p-5">
              <div class="text-[10px] text-[#718096] font-bold uppercase tracking-widest mb-2">{{ rel.date }}</div>
              <h4 class="text-sm font-black uppercase leading-snug text-[#1A202C] group-hover:text-[#FF7A00] transition-colors line-clamp-2">{{ rel.title }}</h4>
            </div>
          </div>
          <div class="p-5 pt-0 flex items-center justify-between border-t border-[#EFE8DF] mt-2">
            <span class="text-[10px] font-black text-[#718096] uppercase">Read Story</span>
            <span class="text-xs text-[#FF7A00] font-bold group-hover:translate-x-1 transition-transform">➜</span>
          </div>
        </article>
      </div>
    </div>

    <!-- Verified Authority Backlinks Directory -->
    <AuthorityBacklinks />

  </div>
  <div v-else class="h-screen flex items-center justify-center font-outfit">
    <div class="text-center">
      <div class="w-16 h-16 border-4 border-[#FF7A00] border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
      <p class="text-xs font-black uppercase tracking-[0.4em] text-[#718096]">Accessing Exclusive Archives...</p>
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
      background: '#FFFFFF',
      color: '#1A202C'
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
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00'
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

const injectStructuredData = () => {
  if (!blog.value) return
  
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
