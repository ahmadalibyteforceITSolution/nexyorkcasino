<template>
  <footer class="bg-[#FFF9F3] border-t border-[#EFE8DF] text-[#1E2329] font-outfit select-none relative overflow-hidden pt-16 pb-12 z-20">
    <!-- Glowing 3D Background Lighting -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-80 bg-orange-200/20 blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
      
      <!-- Top Newsletter & Branding Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-[#EFE8DF]">
        <div class="lg:col-span-6 space-y-4">
          <router-link to="/" class="flex items-center gap-3 font-outfit font-black text-2xl tracking-widest group">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#FF7A00] to-[#FFA15C] flex items-center justify-center text-white font-black text-xl shadow-[0_4px_15px_rgba(255,122,0,0.35)] group-hover:rotate-12 transition-transform">
              <VueIcon name="zap" size="1.2em" />
            </div>
            <div>
              <span class="text-[#FF7A00]">NEX</span>YORK <span class="text-xs font-black text-[#FF7A00] bg-orange-100/70 px-2.5 py-1 rounded-full border border-orange-200 ml-1">BINANCE EXCHANGE</span>
            </div>
          </router-link>
          <p class="text-[#5A6474] text-xs max-w-md font-medium leading-relaxed font-sans">
            The premier digital crypto exchange, luxury romance magazine (1,000+ pages) & high-stakes arena in New York City. Multi-chain liquidity, SAFU vault protection, and 24/7 VIP concierge.
          </p>
        </div>

        <!-- Newsletter Subscription Form -->
        <div class="lg:col-span-6 p-6 rounded-3xl border border-orange-200 bg-white shadow-md">
          <div class="text-xs font-black text-[#FF7A00] uppercase tracking-widest mb-2 flex items-center gap-2">
            <VueIcon name="envelope" size="1.2em" /> VIP MARKET & ROMANCE GAZETTE NEWSLETTER
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Enter your VIP Gmail / Email address..." 
              class="flex-1 bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-3 px-5 text-xs text-[#1A202C] outline-none focus:border-[#FF7A00] transition-all font-mono"
            >
            <button @click="subscribeNewsletter" class="btn-primary py-3 px-6 text-xs uppercase tracking-widest whitespace-nowrap cursor-pointer">
              SUBSCRIBE ➜
            </button>
          </div>
        </div>
      </div>

      <!-- Main Navigation Columns -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans">
        <div>
          <h4 class="font-black text-[#FF7A00] text-xs uppercase tracking-[0.2em] mb-4 font-outfit">PLATFORM PRODUCTS</h4>
          <ul class="space-y-2.5 font-bold text-[#5A6474]">
            <li><router-link to="/arena" class="hover:text-[#FF7A00] transition-colors">Global Live Arena</router-link></li>
            <li><router-link to="/" class="hover:text-[#FF7A00] transition-colors">Spot & Futures Exchange</router-link></li>
            <li><router-link to="/earn" class="hover:text-[#FF7A00] transition-colors text-[#FF7A00]">Earn 20% Affiliate</router-link></li>
            <li><router-link to="/wallet" class="hover:text-[#FF7A00] transition-colors">Crypto & Cold Wallet</router-link></li>
            <li><router-link to="/rewards" class="hover:text-[#FF7A00] transition-colors">VIP Platinum Perks</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="font-black text-[#FF7A00] text-xs uppercase tracking-[0.2em] mb-4 font-outfit">NEXYORK MAGAZINE</h4>
          <ul class="space-y-2.5 font-bold text-[#5A6474]">
            <li><router-link to="/magazine" class="hover:text-[#FF7A00] transition-colors">Explore All 1,000+ Stories</router-link></li>
            <li><router-link to="/magazine/the-definitive-manhattan-penthouse-soirees-high-rollers-the-elite-connoisseur-guide" class="hover:text-[#FF7A00] transition-colors">Manhattan VIP Nightlife</router-link></li>
            <li><router-link to="/magazine/the-definitive-vip-blackjack-single-deck-strategies-mathematical-mastery" class="hover:text-[#FF7A00] transition-colors">VIP Blackjack Mastery</router-link></li>
            <li><router-link to="/magazine/the-definitive-the-allure-of-the-high-stakes-boudoir-bet-a-provocative-chronicle" class="hover:text-[#FF7A00] transition-colors">Romance & Casino Allure</router-link></li>
            <li><router-link to="/magazine/the-definitive-bitcoin-new-york-spot-liquidity-deep-dive-analysis" class="hover:text-[#FF7A00] transition-colors">Bitcoin NYC Liquidity</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="font-black text-[#FF7A00] text-xs uppercase tracking-[0.2em] mb-4 font-outfit">AUTHORITY & CITATIONS</h4>
          <ul class="space-y-2.5 font-bold text-[#5A6474]">
            <li><a href="https://gaming.ny.gov" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF7A00] transition-colors flex items-center justify-between"><span>NY State Gaming Comm.</span> <span>↗</span></a></li>
            <li><a href="https://www.nyctourism.com" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF7A00] transition-colors flex items-center justify-between"><span>NYC Tourism Bureau</span> <span>↗</span></a></li>
            <li><a href="https://www.bloomberg.com/crypto" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF7A00] transition-colors flex items-center justify-between"><span>Bloomberg Crypto</span> <span>↗</span></a></li>
            <li><a href="https://coinmarketcap.com" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF7A00] transition-colors flex items-center justify-between"><span>CoinMarketCap Index</span> <span>↗</span></a></li>
            <li><a href="https://academy.binance.com" target="_blank" rel="noopener noreferrer" class="hover:text-[#FF7A00] transition-colors flex items-center justify-between"><span>Binance Web3 Academy</span> <span>↗</span></a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-black text-[#FF7A00] text-xs uppercase tracking-[0.2em] mb-4 font-outfit">SECURITY & COMMUNITY</h4>
          <div class="flex gap-2.5 mb-4">
            <a href="https://twitter.com" target="_blank" aria-label="Twitter X" class="w-9 h-9 rounded-xl bg-white hover:bg-orange-500 hover:text-white border border-[#E2D9CE] flex items-center justify-center transition-all shadow-2xs">
              <VueIcon name="twitter" size="1.2em" />
            </a>
            <a href="https://telegram.org" target="_blank" aria-label="Telegram" class="w-9 h-9 rounded-xl bg-white hover:bg-[#0088cc] hover:text-white border border-[#E2D9CE] flex items-center justify-center transition-all shadow-2xs">
              <VueIcon name="telegram" size="1.2em" />
            </a>
            <a href="https://discord.com" target="_blank" aria-label="Discord" class="w-9 h-9 rounded-xl bg-white hover:bg-[#5865F2] hover:text-white border border-[#E2D9CE] flex items-center justify-center transition-all shadow-2xs">
              <VueIcon name="discord" size="1.2em" />
            </a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube" class="w-9 h-9 rounded-xl bg-white hover:bg-[#FF0000] hover:text-white border border-[#E2D9CE] flex items-center justify-center transition-all shadow-2xs">
              <VueIcon name="youtube" size="1.2em" />
            </a>
          </div>
          <div class="text-[10px] text-[#718096] uppercase font-mono space-y-1">
            <div>Cold Vault: <span class="text-emerald-700 font-bold">SAFU $1.2B Audited</span></div>
            <div>Latency: <span class="text-emerald-700 font-bold">5ms Global Route</span></div>
          </div>
        </div>
      </div>

      <!-- Legal Disclaimer & Copyright -->
      <div class="pt-8 border-t border-[#EFE8DF] text-[10px] text-[#718096] font-sans leading-relaxed space-y-4">
        <p>
          <b>REGULATORY NOTICE & RISK WARNING</b>: Digital assets trading and casino gaming involve market risk and volatility. Operating in compliance with New York State regulations under jurisdiction US-NY 10001. All 1,000+ editorial articles in the NexYork Magazine are independently curated for informational and entertainment purposes.
        </p>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-[#5A6474] font-medium">
          <div>© 2026 NexYork Elite Casino & Sports Exchange. All Rights Reserved.</div>
          <div class="flex gap-4">
            <a href="#" class="hover:underline hover:text-[#FF7A00]">Privacy Policy</a>
            <a href="#" class="hover:underline hover:text-[#FF7A00]">Terms of Service</a>
            <a href="#" class="hover:underline hover:text-[#FF7A00]">Responsible Gaming</a>
            <a href="#" class="hover:underline hover:text-[#FF7A00]">AdSense Policy</a>
          </div>
        </div>
      </div>

    </div>
  </footer>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('')
const Swal = window.Swal || alert

const subscribeNewsletter = () => {
  if (!email.value || !email.value.includes('@')) {
    if (typeof window.Swal !== 'undefined') window.Swal.fire({ title: 'Error', text: 'Enter a valid email address.', icon: 'error', background: '#FFFFFF', color: '#1A202C', confirmButtonColor: '#FF7A00' })
    return
  }
  const userEmail = email.value
  email.value = ''
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'SUBSCRIBED!',
      text: `Exclusive market updates & VIP bonus drops will be sent to ${userEmail}!`,
      icon: 'success',
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00'
    })
  } else {
    alert('Subscribed successfully!')
  }
}
</script>
