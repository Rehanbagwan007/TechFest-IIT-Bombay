import { useEffect, useRef, useState } from 'react'
import { STATS } from '@/lib/constants'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function StatItem({ stat, delay }: { stat: typeof STATS[0]; delay: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), delay)
          io.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className="flex flex-col items-start transition-all duration-700"
      style={{
        opacity: visible || reducedMotion ? 1 : 0,
        transform: visible || reducedMotion ? 'none' : 'translateY(40px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      <div
        className="font-display font-bold leading-none tracking-tighter text-[#F5F2EA] mb-3"
        style={{ fontSize: 'clamp(3.5rem, 10vw, 9rem)' }}
        aria-label={`${stat.value} ${stat.label}`}
      >
        {stat.value}
      </div>
      <p className="text-xs md:text-sm tracking-[0.35em] text-[#A0A0A0] font-display">
        {stat.label}
      </p>
    </div>
  )
}

export default function NumbersSection() {
  return (
    <section
      className="relative bg-[#080808] px-6 md:px-12 lg:px-16 py-24 md:py-32"
      aria-label="By the numbers"
    >
      <div className="rule mb-16" />

      <div className="mb-12">
        <p className="text-[10px] tracking-[0.45em] text-[#A0A0A0] font-display">
          BY THE NUMBERS
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
        {STATS.map((stat, i) => (
          <StatItem key={stat.label} stat={stat} delay={i * 120} />
        ))}
      </div>

      <div className="rule mt-16" />
    </section>
  )
}
