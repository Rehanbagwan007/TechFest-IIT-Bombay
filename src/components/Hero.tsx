import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  // Canvas particle animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas || reducedMotion) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 120 : 400

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    interface P { x: number; y: number; vx: number; vy: number; r: number }
    const particles: P[] = Array.from({ length: COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 1.2 + 0.4,
    }))

    let mx = canvas.width / 2
    let my = canvas.height / 2
    const onMouse = (e: MouseEvent) => { mx = e.clientX; my = e.clientY }
    window.addEventListener('mousemove', onMouse, { passive: true })

    let raf: number
    const tick = () => {
      const w = canvas.width
      const h = canvas.height
      ctx.clearRect(0, 0, w, h)

      for (const p of particles) {
        const dx = p.x - mx
        const dy = p.y - my
        const d = Math.sqrt(dx * dx + dy * dy)
        if (d < 130 && d > 0) {
          p.vx += (dx / d) * 0.04
          p.vy += (dy / d) * 0.04
        }
        p.vx = p.vx * 0.98 + (Math.random() - 0.5) * 0.008
        p.vy = p.vy * 0.98 + (Math.random() - 0.5) * 0.008

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(245,242,234,0.3)'
        ctx.fill()
      }

      // Connections
      if (!isMobile) {
        const maxDist2 = 7200 // ~85px
        for (let i = 0; i < particles.length; i++) {
          for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x
            const dy = particles[i].y - particles[j].y
            const d2 = dx * dx + dy * dy
            if (d2 < maxDist2) {
              const alpha = (1 - Math.sqrt(d2) / 85) * 0.1
              ctx.beginPath()
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.strokeStyle = `rgba(198,255,61,${alpha})`
              ctx.lineWidth = 0.5
              ctx.stroke()
            }
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [reducedMotion])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(['.hero-tech', '.hero-fest', '.hero-meta', '.hero-cta', '.hero-deco'], { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.3 })
      tl.to('.hero-deco', { opacity: 1, duration: 1.5, ease: 'power2.out' })
        .to('.hero-tech', { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.8')
        .to('.hero-fest', { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=0.85')
        .to('.hero-meta', { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=0.5')
        .to('.hero-cta', { y: 0, opacity: 1, duration: 0.7, ease: 'power2.out' }, '-=0.4')
    }, containerRef)

    gsap.set('.hero-tech', { y: 100 })
    gsap.set('.hero-fest', { y: 100 })
    gsap.set('.hero-meta', { y: 30 })
    gsap.set('.hero-cta', { y: 20 })

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      id="hero"
      className="relative h-screen overflow-hidden bg-[#080808]"
      aria-label="Hero — Techfest 2026"
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Decorative elements */}
      <div className="hero-deco absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Thin horizontal lines */}
        <div className="absolute top-1/3 left-0 w-28 h-px bg-[#F5F2EA]/8" />
        <div className="absolute top-1/3 right-0 w-28 h-px bg-[#F5F2EA]/8" />
        <div className="absolute bottom-1/4 left-0 w-20 h-px bg-[#C6FF3D]/15" />
        {/* Vertical coordinate labels */}
        <div
          className="absolute top-1/2 left-6 md:left-8 text-[#A0A0A0]/50 text-[9px] font-display tracking-[0.3em]"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%)' }}
        >
          19.1334°N · 72.9133°E
        </div>
        <div
          className="absolute top-1/2 right-6 md:right-8 text-[#A0A0A0]/50 text-[9px] font-display tracking-[0.3em]"
          style={{ writingMode: 'vertical-rl', transform: 'translateY(-50%) rotate(180deg)' }}
        >
          TECHFEST · IIT BOMBAY
        </div>
        {/* Corner marks */}
        <div className="absolute top-24 left-12 w-3 h-3 border-l border-t border-[#F5F2EA]/10" />
        <div className="absolute top-24 right-12 w-3 h-3 border-r border-t border-[#F5F2EA]/10" />
        <div className="absolute bottom-12 left-12 w-3 h-3 border-l border-b border-[#F5F2EA]/10" />
        <div className="absolute bottom-12 right-12 w-3 h-3 border-r border-b border-[#F5F2EA]/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col px-4 md:px-8 lg:px-12">
        {/* Main typography */}
        <div className="flex-1 flex flex-col justify-center -mt-4">
          <div className="overflow-hidden">
            <h1
              className="hero-tech font-display font-bold leading-none tracking-[-0.04em] select-none"
              style={{
                fontSize: 'clamp(5rem, 22vw, 22rem)',
                WebkitTextStroke: '1.5px rgba(245,242,234,0.65)',
                color: 'transparent',
              }}
            >
              TECH
            </h1>
          </div>
          <div className="overflow-hidden">
            <h1
              className="hero-fest font-display font-bold leading-none tracking-[-0.04em] text-shimmer select-none"
              style={{ fontSize: 'clamp(5rem, 22vw, 22rem)' }}
              aria-label="FEST"
            >
              FEST
            </h1>
          </div>
        </div>

        {/* Bottom meta */}
        <div className="pb-14 md:pb-16 flex flex-col gap-5">
          <div className="hero-meta">
            <p className="text-[10px] md:text-xs tracking-[0.45em] text-[#A0A0A0] font-display mb-1">
              30TH EDITION · AN AETHERIAL RENAISSANCE
            </p>
            <p className="text-[10px] md:text-xs tracking-[0.3em] text-[#F5F2EA]/40 font-display">
              16 — 18 DECEMBER 2026 · IIT BOMBAY · POWAI · MUMBAI
            </p>
          </div>
          <div className="hero-cta flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <a
              href="#experience"
              className="group inline-flex items-center gap-3 text-xs tracking-[0.2em] text-[#F5F2EA] font-display border border-[#F5F2EA]/20 px-6 py-3 hover:border-[#C6FF3D]/60 hover:text-[#C6FF3D] transition-all duration-300"
            >
              EXPLORE THE EXPERIENCE
              <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </a>
            <span className="text-[9px] tracking-[0.35em] text-[#A0A0A0]/60 font-display hidden sm:block animate-pulse">
              SCROLL TO ENTER
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
