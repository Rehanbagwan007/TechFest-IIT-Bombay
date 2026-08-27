import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PHASE_LABELS = ['CHAOS', 'CONNECTION', 'PATTERN', 'TECHFEST']

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  homeX: number
  homeY: number
  patternX: number
  patternY: number
  textX: number
  textY: number
  size: number
  hue: number
}

function sampleTextPixels(
  text: string,
  canvasW: number,
  canvasH: number
): Array<[number, number]> {
  const offW = Math.min(canvasW * 0.85, 900)
  const offH = 160
  const off = document.createElement('canvas')
  off.width = offW
  off.height = offH
  const oc = off.getContext('2d')
  if (!oc) return []

  oc.clearRect(0, 0, offW, offH)
  oc.fillStyle = 'white'
  oc.font = `700 ${offH * 0.75}px "Space Grotesk", sans-serif`
  oc.textAlign = 'center'
  oc.textBaseline = 'middle'
  oc.fillText(text, offW / 2, offH / 2)

  const data = oc.getImageData(0, 0, offW, offH).data
  const positions: Array<[number, number]> = []
  const step = 5

  for (let y = 0; y < offH; y += step) {
    for (let x = 0; x < offW; x += step) {
      if (data[(y * offW + x) * 4 + 3] > 100) {
        const nx = (canvasW / 2 - offW / 2) + x
        const ny = (canvasH / 2 - offH / 2) + y
        positions.push([nx, ny])
      }
    }
  }

  return positions
}

export default function AetherialEngine() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressRef = useRef(0)
  const reducedMotion = useReducedMotion()
  const [phaseIndex, setPhaseIndex] = useState(0)

  useEffect(() => {
    if (reducedMotion) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Non-null aliases so closures don't confuse TypeScript
    const cvs: HTMLCanvasElement = canvas
    const c2d: CanvasRenderingContext2D = ctx

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 220 : 650

    cvs.width = window.innerWidth
    cvs.height = window.innerHeight

    const onResize = () => {
      cvs.width = window.innerWidth
      cvs.height = window.innerHeight
      initParticles()
    }

    const particles: Particle[] = []

    function initParticles() {
      const w = cvs.width
      const h = cvs.height
      particles.length = 0

      const textPositions = sampleTextPixels('TECHFEST', w, h)

      for (let i = 0; i < COUNT; i++) {
        // Random home position
        const homeX = Math.random() * w
        const homeY = Math.random() * h

        // Pattern: concentric rings
        const rings = isMobile ? 4 : 8
        const ring = Math.floor((i / COUNT) * rings)
        const angleInRing = ((i % Math.ceil(COUNT / rings)) / Math.ceil(COUNT / rings)) * Math.PI * 2
        const radius = (ring + 1) * (Math.min(w, h) * 0.07)
        const patternX = w / 2 + Math.cos(angleInRing) * radius
        const patternY = h / 2 + Math.sin(angleInRing) * radius * 0.5

        // Text target
        const textPos = textPositions.length > 0
          ? textPositions[i % textPositions.length]
          : [homeX, homeY]

        particles.push({
          x: homeX,
          y: homeY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: (Math.random() - 0.5) * 1.5,
          homeX,
          homeY,
          patternX,
          patternY,
          textX: textPos[0],
          textY: textPos[1],
          size: Math.random() * 1.8 + 0.5,
          hue: Math.random() * 60,
        })
      }
    }

    initParticles()
    window.addEventListener('resize', onResize, { passive: true })

    // ScrollTrigger
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onUpdate: (self) => {
        progressRef.current = self.progress
        const pi = Math.min(3, Math.floor(self.progress * 4))
        setPhaseIndex(pi)
      },
    })

    // IntersectionObserver to pause animation
    let visible = true
    const io = new IntersectionObserver(
      ([entry]) => { visible = entry.isIntersecting },
      { threshold: 0.01 }
    )
    if (containerRef.current) io.observe(containerRef.current)

    let raf: number

    function tick() {
      raf = requestAnimationFrame(tick)
      if (!visible) return

      const w = cvs.width
      const h = cvs.height
      const progress = progressRef.current

      // Map progress to 0-4 phases
      const phase = Math.max(0, Math.min(4, (progress - 0.05) * 4.5))

      c2d.clearRect(0, 0, w, h)

      // Determine connection alpha
      const connAlpha = phase > 1 && phase < 3.5
        ? Math.min(1, Math.min(phase - 1, 3.5 - phase)) * 0.25
        : 0

      // Batch paths for performance
      c2d.beginPath()

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        if (phase < 2) {
          // CHAOS + CONNECTION: random wander
          p.vx += (Math.random() - 0.5) * 0.12
          p.vy += (Math.random() - 0.5) * 0.12
          p.vx *= 0.97
          p.vy *= 0.97
        } else if (phase < 3) {
          // PATTERN: move toward pattern positions
          const t = easeInOut(Math.min(1, phase - 2))
          const tx = lerp(p.homeX, p.patternX, t)
          const ty = lerp(p.homeY, p.patternY, t)
          p.vx += (tx - p.x) * 0.035
          p.vy += (ty - p.y) * 0.035
          p.vx *= 0.88
          p.vy *= 0.88
        } else {
          // TECHFEST: move toward text positions
          const t = easeInOut(Math.min(1, phase - 3))
          const tx = lerp(p.patternX, p.textX, t)
          const ty = lerp(p.patternY, p.textY, t)
          p.vx += (tx - p.x) * 0.06
          p.vy += (ty - p.y) * 0.06
          p.vx *= 0.85
          p.vy *= 0.85
        }

        p.x += p.vx
        p.y += p.vy

        // Wrap in chaos phase
        if (phase < 2) {
          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }

        // Draw particle
        const textProgress = Math.max(0, phase - 3)
        const r = p.size * (1 + textProgress * 0.5)

        c2d.moveTo(p.x + r, p.y)
        c2d.arc(p.x, p.y, r, 0, Math.PI * 2)
      }

      c2d.fillStyle = 'rgba(245,242,234,0.6)'
      c2d.fill()

      // Draw connections
      if (connAlpha > 0.01 && !isMobile) {
        const maxD2 = 5000
        for (let i = 0; i < particles.length; i += 2) {
          for (let j = i + 1; j < Math.min(particles.length, i + 30); j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const d2 = dx * dx + dy * dy
            if (d2 < maxD2) {
              const a = connAlpha * (1 - Math.sqrt(d2) / 71)
              c2d.beginPath()
              c2d.moveTo(particles[i].x, particles[i].y)
              c2d.lineTo(particles[j].x, particles[j].y)
              c2d.strokeStyle = `rgba(198,255,61,${a})`
              c2d.lineWidth = 0.5
              c2d.stroke()
            }
          }
        }
      }
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      st.kill()
      io.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [reducedMotion])

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080808] overflow-hidden"
      style={{ minHeight: '100vh' }}
      aria-label="Aetherial Engine"
    >
      {/* Canvas */}
      {!reducedMotion ? (
        <canvas
          ref={canvasRef}
          className="sticky top-0 w-full h-screen pointer-events-none"
          aria-hidden="true"
        />
      ) : (
        /* Static fallback */
        <div className="sticky top-0 h-screen w-full flex items-center justify-center">
          <p
            className="font-display font-bold tracking-tighter text-[#F5F2EA]"
            style={{ fontSize: 'clamp(4rem, 12vw, 12rem)' }}
          >
            TECHFEST
          </p>
        </div>
      )}

      {/* Overlay content */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-between px-6 md:px-12 py-16 md:py-20">
        {/* Heading */}
        <div>
          <p className="text-[10px] tracking-[0.45em] text-[#A0A0A0] font-display mb-4">
            THE AETHERIAL ENGINE
          </p>
          <h2
            className="font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
            style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}
          >
            FROM CHAOS<br />
            <span className="text-outline">COMES CREATION.</span>
          </h2>
        </div>

        {/* Phase indicator */}
        <div className="flex items-end justify-between">
          <div className="flex gap-4 items-center">
            {PHASE_LABELS.map((label, i) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div
                  className="w-px transition-all duration-500"
                  style={{
                    height: phaseIndex === i ? '24px' : '8px',
                    background: phaseIndex === i ? '#C6FF3D' : 'rgba(245,242,234,0.2)',
                  }}
                />
                <span
                  className="text-[9px] tracking-[0.25em] font-display transition-colors duration-300"
                  style={{
                    color: phaseIndex === i ? '#C6FF3D' : 'rgba(160,160,160,0.4)',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
          <p className="text-[9px] text-[#A0A0A0]/30 tracking-[0.3em] font-display">
            SCROLL ↓
          </p>
        </div>
      </div>
    </section>
  )
}
