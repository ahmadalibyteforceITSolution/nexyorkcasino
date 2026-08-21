<template>
  <section id="features" class="py-24 bg-[#FFF9F3]/60 border-y border-[#EFE8DF]">
    <div class="container mx-auto px-4 max-w-7xl">
      <div class="text-center mb-16">
        <div class="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-orange-100/70 border border-orange-200 text-[#FF7A00] font-black text-xs tracking-[0.25em] uppercase mb-4 shadow-xs">
          <i class="fa-solid fa-gem"></i> THE NEXYORK ADVANTAGE
        </div>
        <h2 class="font-outfit text-4xl md:text-6xl font-black mb-4 uppercase tracking-tight text-[#1A202C]">
          ELITE <span class="text-gradient">CAPABILITIES</span>
        </h2>
        <p class="text-[#5A6474] max-w-xl mx-auto text-base leading-relaxed">
          NexYork is a synchronized, ultra-fast web3 crypto ecosystem and live arena built for discerning high-rollers worldwide.
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="feature in features" 
          :key="feature.title" 
          class="bg-white p-10 rounded-[35px] border border-[#EAE3D8] hover:border-orange-300 transition-all group hover:-translate-y-2 duration-500 shadow-sm hover:shadow-xl"
        >
          <div class="w-16 h-16 bg-gradient-to-tr from-orange-100 to-amber-50 rounded-[22px] flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform duration-500 border border-orange-200 shadow-xs">
            {{ feature.icon }}
          </div>
          <h3 class="text-2xl font-black mb-3 uppercase tracking-tight font-outfit text-[#1A202C]">{{ feature.title }}</h3>
          <p class="text-[#5A6474] text-sm leading-relaxed mb-6">
            {{ feature.desc }}
          </p>
          <ul class="space-y-2.5">
            <li v-for="item in feature.points" :key="item" class="flex items-center gap-2.5 text-xs font-bold text-[#4A5568] uppercase tracking-wider">
              <span class="w-4 h-4 rounded-full bg-orange-100 text-[#FF7A00] flex items-center justify-center text-[10px] font-black">✔</span>
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  {
    icon: '📡',
    title: 'Global Feed',
    desc: 'Real-time synchronization with Google-grade global ESPN sports data and Binance crypto odds.',
    points: ['0.2ms Latency', '8+ Global Leagues', 'Auto-Updating Scores']
  },
  {
    icon: '👥',
    title: 'Social Arena',
    desc: 'The world\'s first synchronized betting lounge with real-time chat and public bet feeds.',
    points: ['Live Global Chat', 'Public Bet Broadcasts', 'Gladiator Profile Tracking']
  },
  {
    icon: '₿',
    title: 'Crypto Wallet',
    desc: 'Integrated digital asset management with instant withdrawals to bank or cold wallets.',
    points: ['BTC/ETH/USDT Support', 'Instant Cash-outs', 'Military-Grade Encryption']
  }
];
</script>
