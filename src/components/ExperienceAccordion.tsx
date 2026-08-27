import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EXPERIENCES } from '@/lib/constants'

export default function ExperienceAccordion() {
  const [active, setActive] = useState<number | null>(null)

  const toggle = useCallback((i: number) => {
    setActive((prev) => (prev === i ? null : i))
  }, [])

  return (
    <section
      id="experience"
      className="relative bg-[#080808] px-6 md:px-12 lg:px-16 py-24"
      aria-label="Choose your experience"
    >
      {/* Header */}
      <div className="mb-16">
        <p className="text-[10px] tracking-[0.45em] text-[#A0A0A0] font-display mb-3">
          WHAT BRINGS YOU HERE
        </p>
        <h2
          className="font-display font-bold leading-none tracking-tighter text-[#F5F2EA]"
          style={{ fontSize: 'clamp(2rem, 6vw, 6rem)' }}
        >
          CHOOSE YOUR<br />EXPERIENCE.
        </h2>
      </div>

      <div className="rule mb-2" />

      {/* Accordion rows */}
      <div role="list">
        {EXPERIENCES.map((exp, i) => {
          const isActive = active === i
          const hasActive = active !== null

          return (
            <div key={exp.number} role="listitem">
              <motion.div
                animate={{
                  opacity: hasActive && !isActive ? 0.35 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                <button
                  onClick={() => toggle(i)}
                  onMouseEnter={() => setActive(i)}
                  onMouseLeave={() => setActive(null)}
                  aria-expanded={isActive}
                  aria-controls={`exp-panel-${i}`}
                  className="w-full text-left focus-visible:outline-none"
                >
                  <div className="border-b border-white/8 py-5 md:py-0">
                    <div className="flex items-center md:items-stretch overflow-hidden">
                      {/* Number */}
                      <motion.span
                        className="font-display font-bold text-[#A0A0A0]/40 mr-6 md:mr-10 flex-shrink-0 self-center"
                        animate={{ fontSize: isActive ? 'clamp(1.5rem, 3vw, 3rem)' : 'clamp(0.875rem, 1.5vw, 1rem)' }}
                        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                        style={{ color: isActive ? exp.color : undefined }}
                      >
                        {exp.number}
                      </motion.span>

                      <div className="flex-1 min-w-0">
                        {/* Title row */}
                        <motion.div
                          className="flex items-center justify-between py-5"
                          animate={{ paddingTop: isActive ? '2rem' : '1.25rem', paddingBottom: isActive ? '1rem' : '1.25rem' }}
                          transition={{ duration: 0.4 }}
                        >
                          <motion.h3
                            className="font-display font-bold tracking-tighter text-[#F5F2EA] leading-none"
                            animate={{ fontSize: isActive ? 'clamp(2.5rem, 6vw, 7rem)' : 'clamp(1.75rem, 3.5vw, 4rem)' }}
                            style={{ color: isActive ? exp.color : '#F5F2EA' }}
                            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                          >
                            {exp.title}
                          </motion.h3>
                          <motion.span
                            className="text-xl md:text-2xl text-[#A0A0A0] flex-shrink-0 ml-4"
                            animate={{
                              rotate: isActive ? 45 : 0,
                              color: isActive ? exp.color : '#A0A0A0',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            +
                          </motion.span>
                        </motion.div>

                        {/* Expanded content */}
                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              id={`exp-panel-${i}`}
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                              className="overflow-hidden"
                            >
                              <div className="pb-8">
                                <p className="text-lg md:text-2xl text-[#A0A0A0] mb-6 font-display tracking-tight">
                                  {exp.sub}
                                </p>
                                <div className="flex flex-wrap gap-3">
                                  {exp.keywords.map((kw) => (
                                    <span
                                      key={kw}
                                      className="text-[10px] tracking-[0.3em] px-4 py-2 border font-display"
                                      style={{ borderColor: `${exp.color}30`, color: exp.color }}
                                    >
                                      {kw}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </div>
                </button>
              </motion.div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
