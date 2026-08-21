<template>
  <canvas ref="canvasRef" class="fixed inset-0 pointer-events-none z-0 opacity-30"></canvas>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const canvasRef = ref(null)
let animId = null
let mouseX = 0
let mouseY = 0

onMounted(() => {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')

  let width = canvas.width = window.innerWidth
  let height = canvas.height = window.innerHeight

  const handleResize = () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  }
  window.addEventListener('resize', handleResize)

  const handleMouseMove = (e) => {
    mouseX = (e.clientX - width / 2) * 0.03
    mouseY = (e.clientY - height / 2) * 0.03
  }
  window.addEventListener('mousemove', handleMouseMove)

  // Soft Ambient Glowing Particles (No dollar, diamond, or text symbols)
  const particles = Array.from({ length: 45 }, () => ({
    x: (Math.random() - 0.5) * width * 1.5,
    y: (Math.random() - 0.5) * height * 1.5,
    z: Math.random() * 800 + 100,
    radius: Math.random() * 3 + 2,
    color: Math.random() > 0.5 ? '#FF9E44' : '#FFA15C'
  }))

  const render = () => {
    ctx.clearRect(0, 0, width, height)

    const cx = width / 2 + mouseX
    const cy = height / 2 + mouseY
    const fov = 400

    particles.forEach(p => {
      p.z -= 0.4

      if (p.z <= 10) {
        p.z = 900
        p.x = (Math.random() - 0.5) * width * 1.5
        p.y = (Math.random() - 0.5) * height * 1.5
      }

      const scale = fov / (fov + p.z)
      const px = p.x * scale + cx
      const py = p.y * scale + cy

      if (px > 0 && px < width && py > 0 && py < height) {
        ctx.save()
        ctx.beginPath()
        ctx.arc(px, py, p.radius * scale, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 12 * scale
        ctx.globalAlpha = Math.min(0.6, (1000 - p.z) / 1200)
        ctx.fill()
        ctx.restore()
      }
    })

    animId = requestAnimationFrame(render)
  }

  render()

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('mousemove', handleMouseMove)
    if (animId) cancelAnimationFrame(animId)
  })
})
</script>
