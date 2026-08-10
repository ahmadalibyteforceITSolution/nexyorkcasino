<template>
  <footer class="bg-[#0B0E11] border-t border-white/10 text-white font-outfit select-none relative overflow-hidden pt-16 pb-12 z-20">
    <!-- Glowing 3D Background Lighting -->
    <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-80 bg-[#F0B90B]/5 blur-[120px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 md:px-8 relative z-10 space-y-16">
      
      <!-- Top Newsletter & Branding Row -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pb-12 border-b border-white/10">
        <div class="lg:col-span-6 space-y-4">
          <router-link to="/" class="flex items-center gap-3 font-outfit font-black text-2xl tracking-widest group">
            <div class="w-10 h-10 rounded-xl bg-[#F0B90B] flex items-center justify-center text-black font-black text-xl shadow-[0_0_20px_rgba(240,185,11,0.5)] group-hover:rotate-12 transition-transform">
              <VueIcon name="zap" size="1.2em" />
            </div>
            <div>
              <span class="text-[#F0B90B]">NEX</span>YORK <span class="text-xs font-bold text-gray-400 bg-white/5 px-2.5 py-1 rounded border border-white/10">BINANCE EXCHANGE</span>
            </div>
          </router-link>
          <p class="text-gray-400 text-xs max-w-md font-medium leading-relaxed">
            The premier digital crypto exchange & high-stakes arena in New York City. Licensed multi-chain trading, SAFU vault protection, and 24/7 global liquidity.
          </p>
        </div>

        <!-- Newsletter Subscription Form -->
        <div class="lg:col-span-6 glass p-6 rounded-3xl border-[#F0B90B]/20 bg-[#161618]">
          <div class="text-xs font-black text-[#F0B90B] uppercase tracking-widest mb-2 flex items-center gap-2">
            <VueIcon name="envelope" size="1.2em" /> BINANCE MARKET INSIGHTS NEWSLETTER
          </div>
          <div class="flex flex-col sm:flex-row gap-3">
            <input 
              v-model="email" 
              type="email" 
              placeholder="Enter your Gmail / Email..." 
              class="flex-1 bg-white/5 border border-white/10 rounded-2xl py-3 px-5 text-xs text-white outline-none focus:border-[#F0B90B] transition-all font-mono"
            >
            <button @click="subscribeNewsletter" class="btn-primary py-3 px-6 text-xs uppercase tracking-widest whitespace-nowrap">
              SUBSCRIBE ➜
            </button>
          </div>
        </div>
      </div>

      <!-- Main Navigation Columns -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-sans">
        <div>
          <h4 class="font-black text-[#F0B90B] text-xs uppercase tracking-[0.2em] mb-4 font-outfit">PLATFORM PRODUCTS</h4>
          <ul class="space-y-2.5 font-medium text-gray-400">
            <li><router-link to="/arena" class="hover:text-white transition-colors">Global Live Arena</router-link></li>
            <li><router-link to="/" class="hover:text-white transition-colors">Spot & Futures Exchange</router-link></li>
            <li><router-link to="/earn" class="hover:text-white transition-colors text-[#F0B90B]">Earn 20% Affiliate</router-link></li>
            <li><router-link to="/wallet" class="hover:text-white transition-colors">Crypto & Fiat Wallet</router-link></li>
            <li><router-link to="/rewards" class="hover:text-white transition-colors">VIP Platinum Perks</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="font-black text-[#F0B90B] text-xs uppercase tracking-[0.2em] mb-4 font-outfit">BINANCE MAGAZINE</h4>
          <ul class="space-y-2.5 font-medium text-gray-400">
            <li><router-link to="/magazine" class="hover:text-white transition-colors">All Crypto Articles</router-link></li>
            <li><router-link to="/magazine/lust-and-luxury-nyc-nightlife" class="hover:text-white transition-colors">Lifestyle & VIP Scene</router-link></li>
            <li><router-link to="/magazine/the-psychology-of-the-all-in-bluff" class="hover:text-white transition-colors">Poker & Trading Strategy</router-link></li>
            <li><router-link to="/magazine/crypto-glamour-the-new-rich" class="hover:text-white transition-colors">Market & Web3 Trends</router-link></li>
          </ul>
        </div>

        <div>
          <h4 class="font-black text-[#F0B90B] text-xs uppercase tracking-[0.2em] mb-4 font-outfit">SECURITY & PROOF</h4>
          <ul class="space-y-2.5 font-medium text-gray-400">
            <li class="flex items-center gap-2 text-[#0ECB81]"><VueIcon name="shield" size="1.2em" /> SAFU $1.2B Cold Vault</li>
            <li class="flex items-center gap-2 text-green-400"><VueIcon name="lock" size="1.2em" /> AES-256 SSL Encryption</li>
            <li class="flex items-center gap-2 text-blue-400"><VueIcon name="key" size="1.2em" /> 2FA Security Protected</li>
            <li><a href="#" @click.prevent="showProofReserves" class="hover:text-white transition-colors">Proof of Reserves 1:1</a></li>
          </ul>
        </div>

        <div>
          <h4 class="font-black text-[#F0B90B] text-xs uppercase tracking-[0.2em] mb-4 font-outfit">COMMUNITY & SOCIAL</h4>
          <div class="flex gap-3 mb-4">
            <a href="https://twitter.com" target="_blank" aria-label="Twitter X" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#F0B90B] hover:text-black border border-white/10 flex items-center justify-center transition-all">
              <VueIcon name="twitter" size="1.2em" />
            </a>
            <a href="https://telegram.org" target="_blank" aria-label="Telegram" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#0088cc] hover:text-white border border-white/10 flex items-center justify-center transition-all">
              <VueIcon name="telegram" size="1.2em" />
            </a>
            <a href="https://discord.com" target="_blank" aria-label="Discord" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#5865F2] hover:text-white border border-white/10 flex items-center justify-center transition-all">
              <VueIcon name="discord" size="1.2em" />
            </a>
            <a href="https://youtube.com" target="_blank" aria-label="YouTube" class="w-9 h-9 rounded-xl bg-white/5 hover:bg-[#FF0000] hover:text-white border border-white/10 flex items-center justify-center transition-all">
              <VueIcon name="youtube" size="1.2em" />
            </a>
          </div>
          <div class="text-[10px] text-gray-500 uppercase font-mono">Server Status: <span class="text-[#0ECB81]">100% Operational (5ms)</span></div>
        </div>
      </div>

      <!-- Legal Disclaimer & Copyright -->
      <div class="pt-8 border-t border-white/10 text-[10px] text-gray-500 font-sans leading-relaxed space-y-4">
        <p>
          <b>RISK WARNING</b>: Trading digital assets and playing casino games involves significant market and financial risk. Past performance is not indicative of future results. Please ensure you fully understand the risks involved before participating. NexYork operates under license US-NY 10001.
        </p>
        <div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-gray-400">
          <div>© 2026 NexYork Casino Exchange. All Rights Reserved.</div>
          <div class="flex gap-4">
            <a href="#" class="hover:underline">Privacy Policy</a>
            <a href="#" class="hover:underline">Terms of Service</a>
            <a href="#" class="hover:underline">AdSense Policy</a>
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
    if (typeof window.Swal !== 'undefined') window.Swal.fire({ title: 'Error', text: 'Enter a valid email address.', icon: 'error', background: '#0B0E11', color: '#fff' })
    return
  }
  const userEmail = email.value
  email.value = ''
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'SUBSCRIBED!',
      text: `Market updates & VIP bonus drops will be sent to ${userEmail}!`,
      icon: 'success',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B'
    })
  } else {
    alert('Subscribed successfully!')
  }
}

const showProofReserves = () => {
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'PROOF OF RESERVES 1:1',
      html: '<p class="text-xs text-gray-300">NexYork holds 100% of user assets in audited multi-sig cold wallets on Bitcoin, Ethereum, and BNB Smart Chain.</p>',
      icon: 'info',
      background: '#0B0E11',
      color: '#fff',
      confirmButtonColor: '#F0B90B'
    })
  }
}
</script>
