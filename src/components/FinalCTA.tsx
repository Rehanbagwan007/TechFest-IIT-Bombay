import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function FinalCTA() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1,
        },
      })

      tl.fromTo(
        '.cta-line-1',
        { opacity: 1, y: 0 },
        { opacity: 0, y: -60, duration: 1, ease: 'power2.in' }
      )
      tl.fromTo(
        '.cta-line-2',
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '-=0.4'
      )
      tl.fromTo(
        '.cta-meta',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.3'
      )
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080808] overflow-hidden"
      style={{ minHeight: '100vh' }}
      aria-label="Final call to action"
    >
      <div className="h-screen flex flex-col items-start justify-center px-6 md:px-12 lg:px-16">
        {/* Phase 1 text */}
        <div className="mb-2">
          <p
            className="cta-line-1 font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
            style={{ fontSize: 'clamp(3rem, 10vw, 11rem)' }}
          >
            THE FUTURE
          </p>
          <p
            className="cta-line-1 font-display font-bold leading-none tracking-tighter"
            style={{
              fontSize: 'clamp(3rem, 10vw, 11rem)',
              WebkitTextStroke: '1.5px rgba(245,242,234,0.6)',
              color: 'transparent',
            }}
          >
            DOESN&apos;T ARRIVE.
          </p>
        </div>

        {/* Phase 2 text (hidden initially) */}
        <div
          className="cta-line-2 absolute left-6 md:left-12 lg:left-16"
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          <p
            className="font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
            style={{ fontSize: 'clamp(3rem, 10vw, 11rem)' }}
          >
            THE FUTURE
          </p>
          <p
            className="font-display font-bold leading-none tracking-tighter text-shimmer"
            style={{ fontSize: 'clamp(3rem, 10vw, 11rem)' }}
          >
            WE BUILD IT.
          </p>
        </div>

        {/* Meta + CTA */}
        <div
          className="cta-meta absolute bottom-20 left-6 md:left-12 lg:left-16 right-6 md:right-12"
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          <div className="rule mb-10" />
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <p className="text-xs tracking-[0.35em] text-[#A0A0A0] font-display mb-1">
                TECHFEST IIT BOMBAY
              </p>
              <p className="text-sm text-[#F5F2EA] font-display">30TH EDITION · 16 — 18 DECEMBER 2026</p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-4">
              <a
                href="#hero"
                className="group inline-flex items-center gap-4 text-sm tracking-[0.2em] font-display text-[#080808] bg-[#C6FF3D] px-7 py-4 hover:bg-white transition-colors duration-300"
                aria-label="Explore Techfest"
              >
                EXPLORE TECHFEST
                <span className="transition-transform duration-300 group-hover:translate-x-1">↗</span>
              </a>
              <p className="text-[10px] tracking-[0.35em] text-[#A0A0A0] font-display">
                AN AETHERIAL RENAISSANCE
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
