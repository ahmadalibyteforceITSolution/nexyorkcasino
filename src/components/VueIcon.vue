<template>
  <svg 
    v-if="iconPath" 
    xmlns="http://www.w3.org/2000/svg" 
    :width="size || '1em'" 
    :height="size || '1em'" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    stroke-width="2" 
    stroke-linecap="round" 
    stroke-linejoin="round"
    class="inline-block align-middle transition-colors"
  >
    <path v-for="(path, idx) in iconPath" :key="idx" :d="path" />
  </svg>
  <span v-else-if="emojiFallback" class="inline-block align-middle">{{ emojiFallback }}</span>
  <span v-else class="inline-block align-middle">⚡</span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true },
  size: { type: [Number, String], default: '1.2em' }
})

const iconMap = {
  // Navigation & Platform Icons
  'zap': ['M13 2L3 14h9l-1 8 10-12h-9l1-8z'],
  'coins': ['M12 2v20', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  'dollar': ['M12 2v20', 'M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6'],
  'shield': ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
  'lock': ['M19 11H5a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2z', 'M7 11V7a5 5 0 0 1 10 0v4'],
  'key': ['M21 2l-2 2m-2-2l2 2', 'M15.5 7.5l3 3', 'M10.5 12.5a5 5 0 1 0-7.07 7.07 5 5 0 0 0 7.07-7.07z'],
  'rocket': ['M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.71 1.26-1.5 1.5-2.5L4.5 16.5z', 'M12 15l-3-3 7.5-7.5c1.5-1.5 4.5-1.5 6 0s1.5 4.5 0 6L12 15z'],
  'bomb': ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M17 7l4-4', 'M19 3l2 2'],
  'gem': ['M6 3h12l4 6-10 12L2 9z', 'M11 3l-4 6 5 12', 'M13 3l4 6-5 12', 'M2 9h20'],
  'qrcode': ['M3 3h6v6H3z', 'M15 3h6v6h-6z', 'M3 15h6v6H3z', 'M12 6h.01', 'M12 12h.01', 'M15 12h3v3h-3z', 'M18 18h3v3h-3z', 'M12 18h3v3h-3z'],
  'copy': ['M8 8h11v11H8z', 'M4 16H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v1'],
  'search': ['M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0z'],
  'share': ['M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8', 'M16 6l-4-4-4 4', 'M12 2v13'],
  'chart': ['M3 3v18h18', 'M18 9l-5 5-4-4-5 5'],
  'envelope': ['M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z', 'M22 6l-10 7L2 6'],
  'user': ['M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2', 'M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z'],
  'wallet': ['M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z', 'M16 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'],
  'trophy': ['M8 21h8', 'M12 17v4', 'M7 4h10v5a5 5 0 0 1-10 0V4z', 'M4 4h3v4A3 3 0 0 1 4 4z', 'M17 4h3a3 3 0 0 1-3 4V4z'],
  'newspaper': ['M4 4h16v16H4z', 'M8 8h8', 'M8 12h8', 'M8 16h5'],
  'star': ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'],
  'arrow-right': ['M5 12h14', 'M12 5l7 7-7 7'],

  // Social & Crypto Logos
  'bitcoin': ['M11.75 14a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M12.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z', 'M6 6h7a4 4 0 0 1 0 8h-7z', 'M6 14h8a4 4 0 0 1 0 8H6z'],
  'twitter': ['M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z'],
  'telegram': ['M22 2L11 13', 'M22 2l-7 20-4-9-9-4 20-7z'],
  'whatsapp': ['M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21z'],
  'discord': ['M18 6h0a15.6 15.6 0 0 0-4-1.2 11.2 11.2 0 0 0-.5 1.1 14.5 14.5 0 0 0-3 0A11.2 11.2 0 0 0 10 4.8 15.6 15.6 0 0 0 6 6', 'M8.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z', 'M15.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z'],
  'youtube': ['M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58a2.78 2.78 0 0 0 1.94 1.96c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z', 'M9.75 15.02l5.75-3.27-5.75-3.27v6.54z']
}

const emojiMap = {
  'basketball': '🏀',
  'soccer': '⚽',
  'baseball': '⚾',
  'football': '🏈',
  'cricket': '🏏',
  'hockey': '🏒',
  'gamepad': '🎮',
  'racing': '🏎️',
  'boxing': '🥊',
  'tennis': '🎾'
}

const iconPath = computed(() => iconMap[props.name?.toLowerCase()])
const emojiFallback = computed(() => emojiMap[props.name?.toLowerCase()])
</script>
