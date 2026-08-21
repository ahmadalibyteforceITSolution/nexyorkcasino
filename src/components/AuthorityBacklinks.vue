<template>
  <section class="my-16 rounded-[35px] border border-[#E2D9CE] p-8 md:p-12 relative overflow-hidden bg-white font-outfit shadow-lg">
    <div class="absolute -top-24 -right-24 w-72 h-72 bg-orange-100/30 rounded-full blur-[90px] pointer-events-none"></div>

    <div class="relative z-10">
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div class="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-[#FF7A00] text-[10px] font-black uppercase tracking-widest mb-3">
            <i class="fa-solid fa-link"></i> VERIFIED AUTHORITY & INDUSTRY DIRECTORY
          </div>
          <h3 class="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#1A202C] font-outfit">
            Official Regulatory, Market & <span class="text-gradient">Tourism Citations</span>
          </h3>
        </div>
        <p class="text-xs text-[#5A6474] max-w-md font-sans leading-relaxed">
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
          class="group p-5 rounded-2xl bg-[#FAF8F5] border border-[#EAE2D7] hover:border-orange-300 hover:bg-orange-50/40 transition-all duration-300 flex flex-col justify-between shadow-2xs"
        >
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="text-lg text-[#FF7A00] group-hover:scale-110 transition-transform">
                <i :class="link.icon"></i>
              </span>
              <span class="text-[9px] font-black uppercase tracking-widest text-[#718096] bg-white px-2 py-0.5 rounded border border-[#E2D9CE] group-hover:text-[#1A202C]">
                {{ link.badge }}
              </span>
            </div>
            <h4 class="text-sm font-black uppercase text-[#1A202C] group-hover:text-[#FF7A00] transition-colors mb-1.5 line-clamp-1">
              {{ link.title }}
            </h4>
            <p class="text-[11px] text-[#5A6474] font-sans leading-relaxed line-clamp-2">
              {{ link.description }}
            </p>
          </div>

          <div class="mt-4 pt-3 border-t border-[#EFE8DF] flex items-center justify-between text-[10px] font-bold text-[#718096] uppercase tracking-wider">
            <span class="group-hover:text-[#1A202C] transition-colors">Official Source</span>
            <span class="text-[#FF7A00] group-hover:translate-x-1 transition-transform font-black">↗</span>
          </div>
        </a>
      </div>

      <!-- Internal Quick Link Anchors -->
      <div class="mt-10 pt-8 border-t border-[#EFE8DF] flex flex-wrap items-center justify-between gap-4 text-xs">
        <div class="text-[11px] font-bold text-[#718096] uppercase tracking-wider">
          <i class="fa-solid fa-compass text-[#FF7A00] mr-2"></i> QUICK INTERNAL DIRECTORY:
        </div>
        <div class="flex flex-wrap gap-2.5">
          <router-link to="/arena" class="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-orange-50 text-[#4A5568] hover:text-[#FF7A00] text-[11px] font-bold transition-all border border-[#E2D9CE]">
            🎰 Live Arena Tables
          </router-link>
          <router-link to="/earn" class="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-orange-50 text-[#4A5568] hover:text-[#FF7A00] text-[11px] font-bold transition-all border border-[#E2D9CE]">
            💰 20% Affiliate Program
          </router-link>
          <router-link to="/rewards" class="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-orange-50 text-[#4A5568] hover:text-[#FF7A00] text-[11px] font-bold transition-all border border-[#E2D9CE]">
            👑 VIP Platinum Lounge
          </router-link>
          <router-link to="/wallet" class="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-orange-50 text-[#4A5568] hover:text-[#FF7A00] text-[11px] font-bold transition-all border border-[#E2D9CE]">
            ⚡ Multi-Chain Cold Vault
          </router-link>
          <router-link to="/magazine" class="px-3.5 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-orange-50 text-[#4A5568] hover:text-[#FF7A00] text-[11px] font-bold transition-all border border-[#E2D9CE]">
            📰 1000+ Articles Magazine
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
