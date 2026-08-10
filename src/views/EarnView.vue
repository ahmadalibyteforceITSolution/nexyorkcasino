<template>
  <div class="animate-in fade-in duration-700">
    <EarnCenter :currentUser="currentUser" />
    <AdSenseBanner slotId="9876543210" />
  </div>
</template>

<script setup>
import EarnCenter from '../components/EarnCenter.vue'
import AdSenseBanner from '../components/AdSenseBanner.vue'

defineProps({
  currentUser: Object
})
</script>
