import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { FEATURED_CARDS } from '@/lib/constants'

export default function FeaturedExperiences() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      const container = containerRef.current
      if (!track || !container) return

      const getScrollAmount = () => {
        return track.scrollWidth - window.innerWidth + 96
      }

      gsap.to(track, {
        x: () => -getScrollAmount(),
        ease: 'none',
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${getScrollAmount()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={containerRef}
      id="events"
      className="relative bg-[#080808] overflow-hidden"
      aria-label="Featured experiences"
      style={{ minHeight: '100vh' }}
    >
      <div className="h-screen flex flex-col px-6 md:px-12 lg:px-16 pt-20 pb-0">
        {/* Header */}
        <div className="flex items-end justify-between mb-8 flex-shrink-0">
          <div>
            <p className="text-[10px] tracking-[0.45em] text-[#A0A0A0] font-display mb-2">
              WHAT AWAITS
            </p>
            <h2
              className="font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
              style={{ fontSize: 'clamp(2rem, 5vw, 5rem)' }}
            >
              FEATURED<br className="md:hidden" /> EXPERIENCES
            </h2>
          </div>
          <p className="hidden md:block text-xs text-[#A0A0A0] tracking-[0.2em] font-display">
            SCROLL →
          </p>
        </div>

        <div className="rule mb-8 flex-shrink-0" />

        {/* Cards */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-5 items-stretch"
            style={{ willChange: 'transform' }}
          >
            {FEATURED_CARDS.map((card) => (
              <article
                key={card.number}
                className="group flex-shrink-0 w-[280px] md:w-[360px] h-[460px] relative overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-500 cursor-pointer"
                style={{ background: card.bg }}
              >
                {/* Abstract background pattern */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {/* Animated gradient circle */}
                  <div
                    className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full opacity-10 transition-all duration-700 group-hover:opacity-20 group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle, ${card.accent} 0%, transparent 70%)`,
                    }}
                  />
                  {/* Grid lines */}
                  <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id={`grid-${card.number}`} width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke={card.accent} strokeWidth="0.5" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill={`url(#grid-${card.number})`} />
                  </svg>
                </div>

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col justify-between p-8">
                  <div className="flex justify-between items-start">
                    <span
                      className="font-display font-bold text-6xl md:text-7xl leading-none tracking-tighter opacity-20"
                      style={{ color: card.accent }}
                    >
                      {card.number}
                    </span>
                    <span
                      className="text-xs tracking-[0.2em] font-display opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ color: card.accent }}
                    >
                      EXPLORE ↗
                    </span>
                  </div>

                  <div className="transition-transform duration-400 group-hover:-translate-y-2">
                    <p
                      className="text-[10px] tracking-[0.35em] mb-3 font-display"
                      style={{ color: card.accent }}
                    >
                      {card.sub}
                    </p>
                    <h3
                      className="font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
                      style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
                    >
                      {card.title}
                    </h3>
                    {/* Bottom accent line */}
                    <div
                      className="mt-5 h-px w-8 group-hover:w-16 transition-all duration-500"
                      style={{ background: card.accent }}
                    />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
