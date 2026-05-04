<template>
  <section id="features" class="py-32 bg-white/[0.02] border-y border-white/5">
    <div class="container mx-auto px-4">
      <div class="text-center mb-24">
        <div class="text-primary font-black text-xs tracking-[0.5em] uppercase mb-4">The NexYork Advantage</div>
        <h2 class="font-outfit text-6xl md:text-7xl font-black mb-6 uppercase tracking-tighter">ELITE <span class="text-gradient">CAPABILITIES</span></h2>
        <p class="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">NexYork isn't just an app—it's a synchronized social ecosystem for the world's top players.</p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="feature in features" :key="feature.title" class="glass p-12 rounded-[50px] border-primary/10 hover:border-primary/40 transition-all group hover:-translate-y-2 duration-500">
          <div class="w-16 h-16 bg-primary/10 rounded-[24px] flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
            {{ feature.icon }}
          </div>
          <h3 class="text-2xl font-black mb-4 uppercase tracking-tight font-outfit">{{ feature.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-8">
            {{ feature.desc }}
          </p>
          <ul class="space-y-3">
            <li v-for="item in feature.points" :key="item" class="flex items-center gap-3 text-[10px] font-black text-gray-400 uppercase tracking-widest">
              <span class="text-primary">✔</span> {{ item }}
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
    desc: 'Real-time synchronization with Google-grade global sports data and casino odds.',
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
    desc: 'Integrated digital asset management with instant withdrawals to bank or crypto wallets.',
    points: ['BTC/ETH Support', 'Instant Cash-outs', 'Military-Grade Encryption']
  }
];
</script>
