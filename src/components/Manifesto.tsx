import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const PHASES = [
  { lines: ['NOT JUST', 'A FESTIVAL.'] },
  { lines: ['A COLLISION', 'OF MINDS.'] },
  { lines: ['IDEAS.', 'PEOPLE.', 'TECHNOLOGY.'] },
  { lines: ['THE FUTURE', 'STARTS HERE.'] },
]

export default function Manifesto() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=350%',
          pin: true,
          scrub: 1.5,
        },
      })

      // Each phase occupies ~25% of the timeline
      // Fade out phase 0, fade in phase 1, etc.
      for (let i = 0; i < PHASES.length - 1; i++) {
        tl.to(`.mf-phase-${i}`, {
          opacity: 0,
          y: -40,
          duration: 1,
          ease: 'power2.in',
        })
        tl.fromTo(
          `.mf-phase-${i + 1}`,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
          '-=0.3'
        )
        tl.to({}, { duration: 0.8 }) // Pause
      }
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={containerRef}
      id="manifesto"
      className="relative bg-[#080808] overflow-hidden"
      aria-label="Manifesto"
      style={{ minHeight: '100vh' }}
    >
      {/* Content */}
      <div className="relative z-10 h-screen flex flex-col items-start justify-center px-6 md:px-12 lg:px-16">
        {/* Small label */}
        <p className="text-[10px] tracking-[0.45em] text-[#A0A0A0] font-display mb-10">
          TECHFEST 2026
        </p>

        {/* Phases stacked absolutely on top of each other */}
        <div className="relative w-full">
          {PHASES.map((phase, i) => (
            <div
              key={i}
              className={`mf-phase-${i} ${i > 0 ? 'absolute inset-0' : ''}`}
              style={{ opacity: i === 0 ? 1 : 0 }}
              aria-hidden={i > 0}
            >
              {phase.lines.map((line, j) => (
                <div key={j} className="overflow-hidden">
                  <p
                    className="font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
                    style={{ fontSize: 'clamp(3rem, 9vw, 10rem)' }}
                  >
                    {line}
                  </p>
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Decorative */}
        <div className="absolute bottom-16 right-6 md:right-12 text-[10px] text-[#A0A0A0]/40 tracking-[0.3em] font-display">
          SCROLL ↓
        </div>
      </div>

      {/* Static fallback for reduced motion */}
      {reducedMotion && (
        <div className="h-screen flex flex-col items-start justify-center px-6 md:px-12 lg:px-16">
          <p className="text-[10px] tracking-[0.45em] text-[#A0A0A0] font-display mb-10">TECHFEST 2026</p>
          {PHASES[PHASES.length - 1].lines.map((line, i) => (
            <p
              key={i}
              className="font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
              style={{ fontSize: 'clamp(3rem, 9vw, 10rem)' }}
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </section>
  )
}
