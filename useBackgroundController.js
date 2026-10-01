import { onMounted, onUnmounted } from 'vue'

/**
 * 3D Interactive Cosmic Galaxy Vortex Controller
 * Creates a swirling 3D Spiral Galaxy that dynamically responds to mouse movement,
 * tilts with 3D perspective parallax, swirls around the cursor with gravitational physics,
 * and erupts into supernova bursts upon click.
 */
export function useBackgroundController(canvasRef) {
  let animationFrameId = null
  let resizeListener = null
  let mouseMoveListener = null
  let mouseOutListener = null
  let clickListener = null
  let meteorInterval = null

  // Electric Blue & Cyber Cosmic Palette
  const starColors = [
    '#FFFFFF', // Core White
    '#E0F2FE', // Luminous Ice Blue
    '#38BDF8', // Electric Cyan
    '#3D6BFF', // Signature Royal Blue
    '#6D8CFF', // Soft Sky Blue
    '#818CF8', // Nebula Indigo
    '#C084FC'  // Cyber Violet
  ]

  // Star Class for Spiral Galaxy Arms
  class GalaxyStar {
    constructor(galaxyRadius) {
      this.init(galaxyRadius, true)
    }

    init(galaxyRadius, randomAngle = false) {
      // 4 Spiral Arms
      const numArms = 4
      const armIndex = Math.floor(Math.random() * numArms)
      const armOffset = (armIndex * 2 * Math.PI) / numArms

      // Distance from center (power distribution for dense core)
      const distRatio = Math.pow(Math.random(), 1.6)
      this.radius = distRatio * galaxyRadius + 15

      // Logarithmic spiral curl
      const spiralCurl = 3.2
      const angle = (randomAngle ? Math.random() * Math.PI * 2 : 0) + armOffset + distRatio * spiralCurl

      // Scatter from arm center
      const spread = (Math.random() - 0.5) * (distRatio * 75 + 15)
      this.angle = angle
      this.originalRadius = this.radius
      this.spreadX = spread * Math.sin(angle)
      this.spreadY = spread * Math.cos(angle)

      // Vertical disk thickness (thicker at core)
      this.z = (Math.random() - 0.5) * (60 * (1 - distRatio * 0.6) + 10)

      // Base orbital velocity (differential rotation)
      this.orbitSpeed = (0.0018 + 0.0035 / (distRatio + 0.3)) * 0.65

      // Star Appearance
      this.baseSize = Math.random() < 0.12 ? Math.random() * 2.2 + 1.8 : Math.random() * 1.4 + 0.6
      this.alpha = Math.random() * 0.6 + 0.4
      this.baseAlpha = this.alpha
      this.pulseSpeed = Math.random() * 0.03 + 0.015
      this.pulseDir = Math.random() > 0.5 ? 1 : -1

      // Core stars are brighter & whiter; outer stars are electric blue / cyan
      if (distRatio < 0.2) {
        this.color = Math.random() < 0.6 ? '#FFFFFF' : '#38BDF8'
      } else {
        this.color = starColors[Math.floor(Math.random() * starColors.length)]
      }
    }

    update(galaxyRotation) {
      this.angle += this.orbitSpeed

      // Twinkle pulse
      this.alpha += this.pulseSpeed * this.pulseDir
      if (this.alpha > 0.95) this.pulseDir = -1
      if (this.alpha < 0.25) this.pulseDir = 1
    }
  }

  // Supernova Click Shockwave
  class CosmicShockwave {
    constructor(x, y) {
      this.x = x
      this.y = y
      this.radius = 10
      this.maxRadius = Math.random() * 100 + 160
      this.growth = 5.5
      this.alpha = 0.9
      this.color = Math.random() > 0.5 ? '#38BDF8' : '#3D6BFF'
    }

    update() {
      this.radius += this.growth
      this.alpha -= 0.024
    }

    draw(ctx) {
      if (this.alpha <= 0) return
      ctx.save()
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
      ctx.strokeStyle = this.color
      ctx.lineWidth = 2.5
      ctx.globalAlpha = Math.max(0, this.alpha)
      ctx.shadowBlur = 20
      ctx.shadowColor = this.color
      ctx.stroke()
      ctx.restore()
    }
  }

  // Mouse Stardust Sparkles
  class Stardust {
    constructor(x, y, isBurst = false) {
      this.x = x
      this.y = y
      this.size = Math.random() * 2.8 + 1.2
      const angle = Math.random() * Math.PI * 2
      const speed = isBurst ? Math.random() * 6 + 2 : Math.random() * 2.2 + 0.6
      this.vx = Math.cos(angle) * speed
      this.vy = Math.sin(angle) * speed
      this.life = 1.0
      this.decay = isBurst ? Math.random() * 0.03 + 0.015 : Math.random() * 0.035 + 0.02
      this.color = starColors[Math.floor(Math.random() * starColors.length)]
    }

    update() {
      this.x += this.vx
      this.y += this.vy
      this.life -= this.decay
    }

    draw(ctx) {
      if (this.life <= 0) return
      ctx.save()
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size * this.life, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.globalAlpha = Math.max(0, this.life * 0.9)
      ctx.shadowBlur = 10
      ctx.shadowColor = this.color
      ctx.fill()
      ctx.restore()
    }
  }

  // Shooting Stars / Meteors
  class GalaxyMeteor {
    constructor(w, h) {
      this.reset(w, h)
    }

    reset(w, h) {
      this.x = Math.random() * w + 200
      this.y = -60
      this.length = Math.random() * 150 + 90
      this.speed = Math.random() * 8 + 10
      this.thickness = Math.random() * 2 + 1.2
      this.color = '#38BDF8'
      this.active = false
    }

    spawn() {
      this.active = true
    }

    update(w, h) {
      if (!this.active) return
      this.x -= this.speed * 0.92
      this.y += this.speed * 0.68
      if (this.y > h + 100 || this.x < -100) {
        this.active = false
      }
    }

    draw(ctx) {
      if (!this.active) return
      ctx.save()
      ctx.beginPath()
      const grad = ctx.createLinearGradient(
        this.x,
        this.y,
        this.x + this.length * 0.85,
        this.y - this.length * 0.62
      )
      grad.addColorStop(0, '#FFFFFF')
      grad.addColorStop(0.25, '#38BDF8')
      grad.addColorStop(0.65, '#3D6BFF')
      grad.addColorStop(1, 'transparent')

      ctx.strokeStyle = grad
      ctx.lineWidth = this.thickness
      ctx.lineCap = 'round'
      ctx.moveTo(this.x, this.y)
      ctx.lineTo(this.x + this.length * 0.85, this.y - this.length * 0.62)
      ctx.shadowBlur = 18
      ctx.shadowColor = '#3D6BFF'
      ctx.stroke()
      ctx.restore()
    }
  }

  const init = () => {
    const canvas = canvasRef.value
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = (canvas.width = window.innerWidth)
    let h = (canvas.height = window.innerHeight)

    let mouse = {
      x: w * 0.5,
      y: h * 0.4,
      targetX: w * 0.5,
      targetY: h * 0.4,
      isHovered: false,
      speed: 0
    }

    let prevMouse = { x: mouse.x, y: mouse.y }

    // 3D Perspective Angles
    let pitch = 0.55 // default tilted angle looking down on galaxy
    let yaw = 0
    let targetPitch = 0.55
    let targetYaw = 0

    let galaxyRotation = 0

    // Galaxy Star population
    const starCount = Math.min(Math.floor((w * h) / 1200), 1600)
    const galaxyRadius = Math.max(w, h) * 0.62
    const stars = []
    for (let i = 0; i < starCount; i++) {
      stars.push(new GalaxyStar(galaxyRadius))
    }

    let sparkles = []
    let shockwaves = []
    let meteors = []

    for (let i = 0; i < 3; i++) {
      meteors.push(new GalaxyMeteor(w, h))
    }

    meteorInterval = setInterval(() => {
      const inactive = meteors.find(m => !m.active)
      if (inactive) {
        inactive.reset(w, h)
        inactive.spawn()
      }
    }, 4000)

    resizeListener = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    mouseMoveListener = (e) => {
      mouse.targetX = e.clientX
      mouse.targetY = e.clientY
      mouse.isHovered = true

      // Spawn stardust along mouse path
      if (Math.random() > 0.35) {
        sparkles.push(new Stardust(e.clientX, e.clientY))
      }
    }

    mouseOutListener = () => {
      mouse.isHovered = false
      mouse.targetX = w * 0.5
      mouse.targetY = h * 0.4
    }

    clickListener = (e) => {
      shockwaves.push(new CosmicShockwave(e.clientX, e.clientY))
      for (let i = 0; i < 18; i++) {
        sparkles.push(new Stardust(e.clientX, e.clientY, true))
      }
    }

    window.addEventListener('resize', resizeListener)
    window.addEventListener('mousemove', mouseMoveListener)
    window.addEventListener('mouseout', mouseOutListener)
    window.addEventListener('click', clickListener)

    const fov = 750

    const render = () => {
      ctx.clearRect(0, 0, w, h)

      // Center of galaxy (anchored slightly above center for hero visual grandeur)
      const centerX = w * 0.5
      const centerY = h * 0.42

      // Smooth mouse interpolation (spring lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.08
      mouse.y += (mouse.targetY - mouse.y) * 0.08

      // Calculate mouse velocity for cosmic turbulence
      const mdx = mouse.x - prevMouse.x
      const mdy = mouse.y - prevMouse.y
      mouse.speed = Math.sqrt(mdx * mdx + mdy * mdy)
      prevMouse.x = mouse.x
      prevMouse.y = mouse.y

      // Calculate 3D tilt based on mouse position
      const normX = (mouse.x - centerX) / (w * 0.5)
      const normY = (mouse.y - centerY) / (h * 0.5)

      targetPitch = 0.55 + normY * 0.38 // tilt galaxy towards viewer
      targetYaw = normX * 0.45          // turn galaxy left / right

      pitch += (targetPitch - pitch) * 0.06
      yaw += (targetYaw - yaw) * 0.06

      galaxyRotation += 0.0018

      // 1. Draw Radiant Galactic Core Glow
      ctx.save()
      const coreGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, galaxyRadius * 0.5
      )
      coreGradient.addColorStop(0, 'rgba(56, 189, 248, 0.22)')
      coreGradient.addColorStop(0.15, 'rgba(61, 107, 255, 0.15)')
      coreGradient.addColorStop(0.4, 'rgba(99, 102, 241, 0.06)')
      coreGradient.addColorStop(1, 'transparent')
      ctx.fillStyle = coreGradient
      ctx.beginPath()
      ctx.arc(centerX, centerY, galaxyRadius * 0.5, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // 2. Draw Interactive Mouse Gravitational Nebula / Flashlight
      if (mouse.isHovered) {
        ctx.save()
        const mouseNebula = ctx.createRadialGradient(
          mouse.x, mouse.y, 0,
          mouse.x, mouse.y, 220
        )
        mouseNebula.addColorStop(0, 'rgba(56, 189, 248, 0.14)')
        mouseNebula.addColorStop(0.35, 'rgba(61, 107, 255, 0.08)')
        mouseNebula.addColorStop(1, 'transparent')
        ctx.fillStyle = mouseNebula
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 220, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // 3. Update & Draw Galaxy Stars in 3D
      const cosPitch = Math.cos(pitch)
      const sinPitch = Math.sin(pitch)
      const cosYaw = Math.cos(yaw)
      const sinYaw = Math.sin(yaw)

      const mouseGravityRadius = 190

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i]
        star.update(galaxyRotation)

        // Orbital coordinates on 2D plane
        const currentAngle = star.angle + galaxyRotation
        const localX = Math.cos(currentAngle) * star.radius + star.spreadX
        const localY = Math.sin(currentAngle) * star.radius + star.spreadY
        const localZ = star.z

        // 3D Rotation: Pitch (X-axis tilt) and Yaw (Y-axis tilt)
        // 1. Rotate around X (pitch)
        const y1 = localY * cosPitch - localZ * sinPitch
        const z1 = localY * sinPitch + localZ * cosPitch

        // 2. Rotate around Y (yaw)
        const x2 = localX * cosYaw + z1 * sinYaw
        const z2 = -localX * sinYaw + z1 * cosYaw

        // Perspective Projection
        const distance = fov + z2
        if (distance <= 10) continue

        const scale = fov / distance
        let screenX = centerX + x2 * scale
        let screenY = centerY + y1 * scale

        // Interactive Gravitational Swirl near Mouse
        if (mouse.isHovered) {
          const dx = screenX - mouse.x
          const dy = screenY - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < mouseGravityRadius) {
            const influence = (1 - dist / mouseGravityRadius)
            // Gravitational orbit vortex around mouse
            const swirlAngle = Math.atan2(dy, dx) + Math.PI * 0.45
            const swirlForce = influence * (35 + mouse.speed * 0.8)

            screenX += Math.cos(swirlAngle) * swirlForce
            screenY += Math.sin(swirlAngle) * swirlForce
          }
        }

        // Draw Star
        const renderSize = Math.max(0.6, star.baseSize * scale)
        const depthAlpha = Math.min(1, Math.max(0.12, star.alpha * scale * 1.1))

        ctx.save()
        ctx.beginPath()
        ctx.arc(screenX, screenY, renderSize, 0, Math.PI * 2)
        ctx.fillStyle = star.color
        ctx.globalAlpha = depthAlpha

        // Glowing core stars
        if (renderSize > 1.8) {
          ctx.shadowBlur = 8
          ctx.shadowColor = star.color
        }

        ctx.fill()
        ctx.restore()
      }

      // 4. Update & Draw Meteors
      meteors.forEach(m => {
        m.update(w, h)
        m.draw(ctx)
      })

      // 5. Update & Draw Shockwaves
      shockwaves = shockwaves.filter(s => s.alpha > 0)
      shockwaves.forEach(s => {
        s.update()
        s.draw(ctx)
      })

      // 6. Update & Draw Stardust
      sparkles = sparkles.filter(sp => sp.life > 0)
      sparkles.forEach(sp => {
        sp.update()
        sp.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      if (meteorInterval) clearInterval(meteorInterval)
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resizeListener)
      window.removeEventListener('mousemove', mouseMoveListener)
      window.removeEventListener('mouseout', mouseOutListener)
      window.removeEventListener('click', clickListener)
    }
  }

  let cleanup = null

  onMounted(() => {
    cleanup = init()
  })

  onUnmounted(() => {
    if (cleanup) cleanup()
  })
}
