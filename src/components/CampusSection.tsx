import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function CampusSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const bgRef = useRef<HTMLDivElement>(null)
  const fgRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (reducedMotion) return

    const ctx = gsap.context(() => {
      // Parallax: bg moves slower, fg faster
      gsap.to(bgRef.current, {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })
      gsap.to(fgRef.current, {
        yPercent: -5,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Text reveal
      gsap.from('.campus-line', {
        opacity: 0,
        y: 50,
        stagger: 0.12,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
          once: true,
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [reducedMotion])

  return (
    <section
      ref={containerRef}
      className="relative bg-[#080808] overflow-hidden"
      style={{ minHeight: '100vh' }}
      aria-label="IIT Bombay Campus"
    >
      {/* Abstract architectural background using CSS/SVG */}
      <div
        ref={bgRef}
        className="absolute inset-0 pointer-events-none"
        style={{ willChange: 'transform' }}
        aria-hidden="true"
      >
        {/* Architectural SVG composition */}
        <svg
          className="absolute inset-0 w-full h-full opacity-12"
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* Abstract building silhouettes */}
          <g fill="none" stroke="#F5F2EA" strokeWidth="0.5" opacity="0.6">
            {/* Large rectangle - main building */}
            <rect x="100" y="200" width="300" height="600" />
            <rect x="150" y="250" width="60" height="80" />
            <rect x="230" y="250" width="60" height="80" />
            <rect x="310" y="250" width="60" height="80" />
            <rect x="150" y="360" width="60" height="80" />
            <rect x="230" y="360" width="60" height="80" />
            <rect x="310" y="360" width="60" height="80" />
            {/* Columns */}
            <line x1="160" y1="200" x2="160" y2="800" />
            <line x1="220" y1="200" x2="220" y2="800" />
            <line x1="280" y1="200" x2="280" y2="800" />
            <line x1="340" y1="200" x2="340" y2="800" />
            <line x1="400" y1="200" x2="400" y2="800" />
            {/* Dome */}
            <path d="M250 200 Q250 80 100 120 Q0 140 0 200" />
            <path d="M250 200 Q250 80 400 120 Q500 140 500 200" />
            {/* Right side structure */}
            <rect x="700" y="300" width="400" height="500" />
            <rect x="720" y="320" width="80" height="100" />
            <rect x="820" y="320" width="80" height="100" />
            <rect x="920" y="320" width="80" height="100" />
            <rect x="720" y="450" width="80" height="100" />
            <rect x="820" y="450" width="80" height="100" />
            <rect x="920" y="450" width="80" height="100" />
            {/* Arches */}
            <path d="M720 320 Q760 270 800 320" />
            <path d="M820 320 Q860 270 900 320" />
            <path d="M920 320 Q960 270 1000 320" />
            {/* Ground lines */}
            <line x1="0" y1="790" x2="1200" y2="790" />
            <line x1="0" y1="780" x2="1200" y2="780" opacity="0.3" />
          </g>
          {/* Grid overlay */}
          <g opacity="0.05">
            {Array.from({ length: 20 }, (_, i) => (
              <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="800" stroke="#F5F2EA" strokeWidth="0.5" />
            ))}
            {Array.from({ length: 14 }, (_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 60} x2="1200" y2={i * 60} stroke="#F5F2EA" strokeWidth="0.5" />
            ))}
          </g>
        </svg>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 50% 80%, rgba(198,255,61,0.04) 0%, transparent 70%), linear-gradient(to bottom, #080808 0%, rgba(8,8,8,0.3) 30%, rgba(8,8,8,0.4) 60%, #080808 100%)',
          }}
        />
      </div>

      {/* Foreground content */}
      <div
        ref={fgRef}
        className="relative z-10 h-screen flex flex-col justify-end px-6 md:px-12 lg:px-16 pb-20"
        style={{ willChange: 'transform' }}
      >
        {/* Big text */}
        <div className="max-w-4xl mb-12">
          {[
            { text: 'ONE CAMPUS.', accent: false },
            { text: 'THREE DAYS.', accent: false },
            { text: 'A LIFETIME', accent: false },
            { text: 'OF STORIES.', accent: true },
          ].map(({ text, accent }) => (
            <div key={text} className="campus-line overflow-hidden">
              <p
                className="font-display font-bold leading-none tracking-tighter"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw, 8rem)',
                  color: accent ? '#C6FF3D' : '#F5F2EA',
                }}
              >
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Location + date */}
        <div className="campus-line flex flex-col md:flex-row md:items-end gap-6 md:gap-16">
          <div>
            <p className="text-xs tracking-[0.35em] text-[#A0A0A0] font-display mb-1">LOCATION</p>
            <p className="text-lg md:text-xl font-display font-semibold text-[#F5F2EA]">IIT BOMBAY</p>
            <p className="text-sm text-[#A0A0A0]">POWAI · MUMBAI</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.35em] text-[#A0A0A0] font-display mb-1">DATES</p>
            <p
              className="font-display font-bold text-[#F5F2EA] leading-none tracking-tighter"
              style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}
            >
              16—18
            </p>
            <p className="text-sm text-[#A0A0A0] font-display tracking-[0.2em]">DECEMBER 2026</p>
          </div>
        </div>
      </div>
    </section>
  )
}
