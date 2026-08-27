import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { MILESTONES } from '@/lib/constants'

export default function ThirtyYears() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      const track = trackRef.current
      if (!track) return

      // Fade in the "30" and title
      gsap.from('.ty-headline', {
        opacity: 0,
        y: 40,
        stagger: 0.1,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Horizontal scroll
      const milestoneItems = track.querySelectorAll('.milestone-item')
      const totalWidth =
        Array.from(milestoneItems).reduce((acc, el) => acc + (el as HTMLElement).offsetWidth + 48, 0) -
        window.innerWidth +
        120

      gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
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
      id="about"
      className="relative bg-[#080808] overflow-hidden"
      aria-label="30 Years of Techfest"
      style={{ minHeight: '100vh' }}
    >
      <div className="h-screen flex flex-col justify-between px-6 md:px-12 lg:px-16 pt-24 pb-0">
        {/* Header */}
        <div className="flex items-end justify-between mb-4">
          <div>
            <p className="ty-headline text-[10px] tracking-[0.45em] text-[#A0A0A0] font-display mb-3">
              A JOURNEY THROUGH TECHFEST
            </p>
            <div className="flex items-baseline gap-6 flex-wrap">
              <span
                className="ty-headline font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
                style={{ fontSize: 'clamp(5rem, 18vw, 18rem)' }}
                aria-label="30"
              >
                30
              </span>
              <div className="ty-headline flex flex-col">
                <span className="text-sm md:text-lg font-display text-[#A0A0A0] tracking-tight leading-tight">
                  THIRTY YEARS OF
                </span>
                <span className="text-sm md:text-lg font-display text-[#F5F2EA] tracking-tight leading-tight">
                  CURIOSITY.
                </span>
                <span className="text-sm md:text-lg font-display text-[#A0A0A0] tracking-tight leading-tight mt-1">
                  BUILDING WHAT&apos;S NEXT.
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rule" />

        {/* Horizontal track */}
        <div className="flex-1 flex items-center overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-12 items-stretch"
            style={{ willChange: 'transform' }}
          >
            {MILESTONES.map((m, i) => (
              <article
                key={m.year}
                className="milestone-item flex-shrink-0 flex flex-col justify-between w-72 md:w-96 py-8"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span
                      className="font-display font-bold text-[4rem] leading-none tracking-tighter"
                      style={{ color: i === MILESTONES.length - 1 ? '#C6FF3D' : 'rgba(245,242,234,0.15)' }}
                    >
                      {m.year}
                    </span>
                  </div>
                  <div className="w-8 h-px bg-[#C6FF3D]/40 mb-4" />
                  <p className="text-xs tracking-[0.3em] text-[#A0A0A0] font-display mb-3">
                    {m.label}
                  </p>
                  <p className="text-sm text-[#F5F2EA]/70 leading-relaxed max-w-xs">
                    {m.desc}
                  </p>
                </div>
                <div className="mt-6">
                  <span className="text-xs text-[#A0A0A0]/40 font-display tracking-widest">
                    {String(i + 1).padStart(2, '0')} / {String(MILESTONES.length).padStart(2, '0')}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
