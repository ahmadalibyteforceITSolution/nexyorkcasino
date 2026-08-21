<template>
  <div class="pt-28 pb-20 container mx-auto px-4 font-outfit max-w-7xl animate-in fade-in duration-700">
    <header class="text-center mb-12 relative">
      <div class="inline-flex items-center gap-2 bg-orange-100/80 border border-orange-200 px-4 py-1.5 rounded-full text-xs font-black text-[#FF7A00] tracking-widest uppercase mb-4 shadow-xs">
        <i class="fa-solid fa-coins"></i>
        NEXYORK EARNING ENGINE & AFFILIATE HUB
      </div>
      <h1 class="text-4xl md:text-7xl font-black uppercase tracking-tighter text-[#1A202C]">
        MONETIZE & <span class="text-gradient">EARN DAILY</span>
      </h1>
      <p class="text-[#5A6474] text-xs md:text-sm max-w-2xl mx-auto uppercase tracking-widest mt-4">
        Earn 20% lifetime commissions on every friend invited, plus ad revenue share & VIP cashback.
      </p>
    </header>

    <!-- Earnings Overview Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div class="p-8 rounded-[35px] border border-orange-200 shadow-md relative overflow-hidden bg-white">
        <div class="text-xs font-black text-[#718096] uppercase tracking-widest mb-2">Total Affiliate Revenue</div>
        <div class="text-4xl md:text-5xl font-black text-[#1A202C] mb-2">${{ affiliateEarned.toLocaleString(undefined, { minimumFractionDigits: 2 }) }}</div>
        <div class="flex items-center justify-between text-xs font-bold mt-4 pt-4 border-t border-[#EFE8DF]">
          <span class="text-emerald-700 font-black">+20% Passive Cut</span>
          <button @click="claimAffiliateEarnings" class="text-[#FF7A00] hover:underline font-black uppercase tracking-wider cursor-pointer">Instant Claim ➜</button>
        </div>
      </div>

      <div class="p-8 rounded-[35px] border border-emerald-200 shadow-md relative overflow-hidden bg-white">
        <div class="text-xs font-black text-[#718096] uppercase tracking-widest mb-2">Active Referrals</div>
        <div class="text-4xl md:text-5xl font-black text-[#1A202C] mb-2">{{ referralCount }} Users</div>
        <div class="flex items-center justify-between text-xs font-bold mt-4 pt-4 border-t border-[#EFE8DF]">
          <span class="text-[#718096]">Total Wager Volume</span>
          <span class="text-[#1A202C] font-black">${{ (referralCount * 1420).toLocaleString() }}</span>
        </div>
      </div>

      <div class="p-8 rounded-[35px] border border-blue-200 shadow-md relative overflow-hidden bg-white">
        <div class="text-xs font-black text-[#718096] uppercase tracking-widest mb-2">AdSense & House Yield</div>
        <div class="text-4xl md:text-5xl font-black text-[#FF7A00] mb-2">${{ adYield.toFixed(2) }}</div>
        <div class="flex items-center justify-between text-xs font-bold mt-4 pt-4 border-t border-[#EFE8DF]">
          <span class="text-[#718096]">CPM Rate</span>
          <span class="text-emerald-700 font-black">$4.80 / 1K Impressions</span>
        </div>
      </div>
    </div>

    <!-- Referral Link & Sharing Tools -->
    <div class="p-10 rounded-[40px] border border-[#E2D9CE] shadow-lg mb-12 bg-white">
      <h2 class="text-2xl font-black uppercase mb-6 flex items-center gap-3 text-[#1A202C]">
        <i class="fa-solid fa-share-nodes text-[#FF7A00]"></i>
        Your Unique Referral Link
      </h2>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex-1 bg-[#FAF8F5] border border-[#E2D9CE] rounded-2xl py-4 px-6 font-mono text-sm text-[#FF7A00] font-black flex items-center justify-between overflow-x-auto">
          <span>{{ referralLink }}</span>
        </div>
        <button @click="copyReferralLink" class="btn-primary py-4 px-8 text-xs uppercase tracking-widest whitespace-nowrap cursor-pointer">
          <i class="fa-solid fa-copy mr-2"></i> COPY LINK
        </button>
      </div>

      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <button @click="shareSocial('twitter')" class="bg-sky-50 hover:bg-sky-500 hover:text-white text-sky-600 border border-sky-200 p-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer">
          <i class="fa-brands fa-twitter text-lg"></i> Twitter / X
        </button>
        <button @click="shareSocial('telegram')" class="bg-[#0088cc]/10 hover:bg-[#0088cc] text-[#0088cc] hover:text-white border border-[#0088cc]/30 p-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer">
          <i class="fa-brands fa-telegram text-lg"></i> Telegram
        </button>
        <button @click="shareSocial('whatsapp')" class="bg-emerald-50 hover:bg-emerald-600 hover:text-white text-emerald-700 border border-emerald-200 p-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer">
          <i class="fa-brands fa-whatsapp text-lg"></i> WhatsApp
        </button>
        <button @click="copyReferralLink" class="bg-orange-50 hover:bg-orange-500 hover:text-white text-[#FF7A00] border border-orange-200 p-4 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer">
          <i class="fa-solid fa-qrcode text-lg"></i> Share Link
        </button>
      </div>
    </div>

    <!-- Monetization Methods & AdSense Integration -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="p-8 rounded-[35px] border border-[#E2D9CE] bg-white shadow-md">
        <h3 class="text-xl font-black uppercase mb-6 font-outfit text-[#1A202C]">Website Revenue Streams</h3>
        <div class="space-y-3">
          <div class="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE2D7]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-[#FF7A00] text-xl font-black">1</div>
              <div>
                <div class="text-sm font-black uppercase text-[#1A202C]">Google AdSense Banners</div>
                <div class="text-[10px] text-[#718096] font-bold uppercase">Publisher ID: ca-pub-1888138480311828</div>
              </div>
            </div>
            <span class="text-emerald-700 text-xs font-black uppercase bg-emerald-100/70 px-2.5 py-1 rounded-full">ACTIVE</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE2D7]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 text-xl font-black">2</div>
              <div>
                <div class="text-sm font-black uppercase text-[#1A202C]">Affiliate Referral Network</div>
                <div class="text-[10px] text-[#718096] font-bold uppercase">20% Revshare on every trade/bet</div>
              </div>
            </div>
            <span class="text-emerald-700 text-xs font-black uppercase bg-emerald-100/70 px-2.5 py-1 rounded-full">ACTIVE</span>
          </div>

          <div class="flex items-center justify-between p-4 bg-[#FAF8F5] rounded-2xl border border-[#EAE2D7]">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-xl font-black">3</div>
              <div>
                <div class="text-sm font-black uppercase text-[#1A202C]">Token Store & VIP Passes</div>
                <div class="text-[10px] text-[#718096] font-bold uppercase">Direct sales of NexTokens & VIP passes</div>
              </div>
            </div>
            <span class="text-emerald-700 text-xs font-black uppercase bg-emerald-100/70 px-2.5 py-1 rounded-full">ACTIVE</span>
          </div>
        </div>
      </div>

      <div class="p-8 rounded-[35px] border border-[#E2D9CE] bg-white shadow-md flex flex-col justify-between">
        <div>
          <h3 class="text-xl font-black uppercase mb-4 font-outfit text-[#1A202C]">How Earnings Work</h3>
          <p class="text-[#5A6474] text-xs leading-relaxed mb-6 font-medium">
            Every time a user joins via your link or interacts with advertisements on NexYork, earnings are deposited straight into your balance. Withdraw instantly via Crypto (BTC/USDT) or Bank Wire!
          </p>
        </div>

        <div class="bg-orange-50 p-6 rounded-2xl border border-orange-200 text-center">
          <div class="text-2xl font-black text-[#FF7A00] mb-1">$50 MINIMUM WITHDRAWAL</div>
          <div class="text-[10px] font-bold text-[#718096] uppercase tracking-widest">Instant payouts processed 24/7 via Binance Engine</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  currentUser: Object
})

const username = computed(() => props.currentUser?.username || 'VIP_MEMBER')
const referralLink = computed(() => {
  const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : 'https://nexyorkcasino.vercel.app'
  return `${origin}/?ref=${username.value}`
})
const affiliateEarned = ref(385.50)
const referralCount = ref(14)
const adYield = ref(42.80)

const copyReferralLink = () => {
  navigator.clipboard.writeText(referralLink.value)
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'LINK COPIED!',
      text: 'Share your referral link with friends to start earning 20% lifetime commissions!',
      icon: 'success',
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00'
    })
  } else {
    alert('Referral link copied!')
  }
}

const claimAffiliateEarnings = () => {
  if (affiliateEarned.value <= 0) return
  const amount = affiliateEarned.value
  affiliateEarned.value = 0
  if (typeof window.Swal !== 'undefined') {
    window.Swal.fire({
      title: 'COMMISSION CLAIMED!',
      text: `$${amount.toFixed(2)} has been transferred to your main wallet balance.`,
      icon: 'success',
      background: '#FFFFFF',
      color: '#1A202C',
      confirmButtonColor: '#FF7A00'
    })
  }
}

const shareSocial = (platform) => {
  const text = encodeURIComponent(`Join NexYork Elite Casino & Exchange! Play high stakes and earn crypto. Use my code: ${username.value}`)
  const url = encodeURIComponent(referralLink.value)
  let shareUrl = ''
  if (platform === 'twitter') shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}`
  else if (platform === 'telegram') shareUrl = `https://t.me/share/url?url=${url}&text=${text}`
  else if (platform === 'whatsapp') shareUrl = `https://api.whatsapp.com/send?text=${text}%20${url}`
  if (shareUrl) window.open(shareUrl, '_blank')
}
</script>
