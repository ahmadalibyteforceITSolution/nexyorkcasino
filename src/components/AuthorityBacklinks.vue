<template>
  <section class="my-16 glass rounded-[35px] border border-white/10 p-8 md:p-12 relative overflow-hidden bg-[#161618]/90 font-outfit shadow-2xl">
    <div class="absolute -top-24 -right-24 w-72 h-72 bg-[#F0B90B]/5 rounded-full blur-[90px] pointer-events-none"></div>

    <div class="relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#F0B90B]/10 border border-[#F0B90B]/30 text-[#F0B90B] text-[10px] font-black uppercase tracking-widest mb-3">
            <i class="fa-solid fa-link"></i> VERIFIED AUTHORITY & INDUSTRY DIRECTORY
          </div>
          <h3 class="text-2xl md:text-3xl font-black uppercase tracking-tight text-white font-outfit">
            Official Regulatory, Market & <span class="text-gradient">Tourism Citations</span>
          </h3>
        </div>
        <p class="text-xs text-gray-400 max-w-md font-sans leading-relaxed">
          NexYork partners with leading global web3 institutions, state gaming commissions, and luxury travel networks for maximum transparency and verifiable odds.
        </p>
      </div>

      <!-- Links Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <a 
          v-for="link in authorityLinks" 
          :key="link.title"
          :href="link.url"
          target="_blank"
          rel="noopener noreferrer"
          class="group p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-[#F0B90B]/40 hover:bg-[#1f222a] transition-all duration-300 flex flex-col justify-between"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-lg text-[#F0B90B] group-hover:scale-110 transition-transform">
                <i :class="link.icon"></i>
              </span>
              <span class="text-[9px] font-black uppercase tracking-widest text-gray-500 bg-white/5 px-2 py-0.5 rounded border border-white/5 group-hover:text-white">
                {{ link.badge }}
              </span>
            </div>
            <h4 class="text-sm font-black uppercase text-white group-hover:text-[#F0B90B] transition-colors mb-1.5 line-clamp-1">
              {{ link.title }}
            </h4>
            <p class="text-[11px] text-gray-400 font-sans leading-relaxed line-clamp-2">
              {{ link.description }}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-bold text-gray-500 uppercase tracking-wider">
            <span class="group-hover:text-white transition-colors">Official Source</span>
            <span class="text-[#F0B90B] group-hover:translate-x-1 transition-transform">↗</span>
          </div>
        </a>
      </div>

      <!-- Internal Quick Link Anchors -->
      <div class="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs">
        <div class="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          <i class="fa-solid fa-compass text-[#F0B90B] mr-2"></i> QUICK INTERNAL DIRECTORY:
        </div>
        <div class="flex flex-wrap gap-3">
          <router-link to="/arena" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#F0B90B] text-[11px] font-bold transition-all border border-white/5">
            🎰 Live Arena Tables
          </router-link>
          <router-link to="/earn" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#F0B90B] text-[11px] font-bold transition-all border border-white/5">
            💰 20% Affiliate Program
          </router-link>
          <router-link to="/rewards" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#F0B90B] text-[11px] font-bold transition-all border border-white/5">
            👑 VIP Platinum Lounge
          </router-link>
          <router-link to="/wallet" class="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-[#F0B90B] text-[11px] font-bold transition-all border border-white/5">
            ⚡ Multi-Chain Cold Vault
          </router-link>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const authorityLinks = [
  {
    title: "NY State Gaming Commission",
    url: "https://gaming.ny.gov",
    badge: "Government / Regulatory",
    icon: "fa-solid fa-building-columns",
    description: "Official New York State regulatory guidelines and compliance framework for responsible betting."
  },
  {
    title: "NYC Tourism & Conventions",
    url: "https://www.nyctourism.com",
    badge: "Manhattan & Brooklyn",
    icon: "fa-solid fa-city",
    description: "Official travel guide to Manhattan after-hours lounges, premier rooftop venues, and dining."
  },
  {
    title: "Bloomberg Crypto & Markets",
    url: "https://www.bloomberg.com/crypto",
    badge: "Market Liquidity",
    icon: "fa-solid fa-chart-line",
    description: "Institutional market coverage, high-frequency blockchain orderbooks, and liquidity data."
  },
  {
    title: "CoinMarketCap Data Indices",
    url: "https://coinmarketcap.com",
    badge: "Crypto Indices",
    icon: "fa-solid fa-coins",
    description: "Real-time market capitalizations, volume trackers, and multi-chain liquidity indexes."
  },
  {
    title: "Binance Academy & Research",
    url: "https://academy.binance.com",
    badge: "Web3 Academy",
    icon: "fa-solid fa-graduation-cap",
    description: "Educational resources on cryptographic security, SAFU proof of reserves, and risk hedging."
  },
  {
    title: "ESPN Real-Time Sports",
    url: "https://www.espn.com",
    badge: "Live Sports Data",
    icon: "fa-solid fa-trophy",
    description: "Global sports live scoring APIs, NBA/EPL/MLB point spreads, and in-depth player statistics."
  },
  {
    title: "Forbes Luxury Lifestyle",
    url: "https://www.forbes.com/lifestyle",
    badge: "Elite Living",
    icon: "fa-solid fa-gem",
    description: "World-class luxury trends, high-roller penthouse suites, and custom haute horlogerie."
  },
  {
    title: "Vogue High Fashion",
    url: "https://www.vogue.com",
    badge: "Style & Culture",
    icon: "fa-solid fa-glasses",
    description: "Haute couture evening wear, VIP dress codes, and bespoke Manhattan fashion aesthetics."
  }
]
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(135deg, #F0B90B 0%, #ff8800 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
</style>
