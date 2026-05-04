<template>
  <div class="animate-in fade-in duration-1000">
    <Hero @claim-bonus="$emit('claim-bonus')" />
    <Features />
    <LiveTracker :matches="matches" @add-to-slip="$emit('add-to-slip', $event)" />
    <CasinoLive @place-bet="$emit('place-bet', $event)" />
    <Discovery />
  </div>
</template>

<script setup>
import Hero from '../components/Hero.vue'
import Features from '../components/Features.vue'
import LiveTracker from '../components/LiveTracker.vue'
import CasinoLive from '../components/CasinoLive.vue'
import Discovery from '../components/Discovery.vue'

defineProps({
  matches: Array
})

defineEmits(['claim-bonus', 'add-to-slip'])
</script>
