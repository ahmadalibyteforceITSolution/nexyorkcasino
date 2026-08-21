<template>
  <canvas ref="canvasRef" class="fixed inset-0 pointer-events-none z-0 opacity-40"></canvas>
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
    mouseX = (e.clientX - width / 2) * 0.05
    mouseY = (e.clientY - height / 2) * 0.05
  }
  window.addEventListener('mousemove', handleMouseMove)

  // 3D Particles & Floating Crypto Cubes/Coins
  const particles = Array.from({ length: 65 }, () => ({
    x: (Math.random() - 0.5) * width * 1.5,
    y: (Math.random() - 0.5) * height * 1.5,
    z: Math.random() * 800 + 100,
    size: Math.random() * 3 + 1.5,
    rotX: Math.random() * Math.PI * 2,
    rotY: Math.random() * Math.PI * 2,
    speedRotX: (Math.random() - 0.5) * 0.02,
    speedRotY: (Math.random() - 0.5) * 0.02,
    symbol: ['₿', 'Ξ', '⚡', '💎', '$'][Math.floor(Math.random() * 5)],
    color: Math.random() > 0.4 ? '#FF7A00' : '#FFA15C'
  }))

  const render = () => {
    ctx.clearRect(0, 0, width, height)

    const cx = width / 2 + mouseX
    const cy = height / 2 + mouseY
    const fov = 400

    particles.forEach(p => {
      p.rotX += p.speedRotX
      p.rotY += p.speedRotY
      p.z -= 0.5

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
        ctx.translate(px, py)
        ctx.scale(scale * 1.5, scale * 1.5)
        ctx.rotate(p.rotX)

        ctx.font = 'bold 24px Outfit, sans-serif'
        ctx.fillStyle = p.color
        ctx.shadowColor = p.color
        ctx.shadowBlur = 15 * scale
        ctx.globalAlpha = Math.min(1, (1000 - p.z) / 800)
        ctx.fillText(p.symbol, 0, 0)

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
