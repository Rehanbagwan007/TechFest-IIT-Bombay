import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { NAV_LINKS } from '@/lib/constants'

interface MobileMenuProps {
  open: boolean
  onClose: () => void
}

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[100] flex flex-col"
          style={{ background: '#050505' }}
          role="dialog"
          aria-label="Navigation menu"
          aria-modal="true"
        >
          {/* Noise overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Header */}
          <div className="relative flex items-center justify-between px-6 md:px-12 py-6">
            <span className="text-sm font-display font-bold tracking-[0.3em] text-[#F5F2EA]">
              TECHFEST
            </span>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="w-12 h-12 flex items-center justify-center rounded-full border border-white/15 hover:border-[#C6FF3D]/50 transition-colors duration-300"
            >
              <X size={18} className="text-[#F5F2EA]" />
            </button>
          </div>

          {/* Nav items */}
          <nav className="relative flex-1 flex flex-col justify-center px-6 md:px-12">
            <div className="rule mb-12" />
            {NAV_LINKS.map((link, i) => (
              <motion.div
                key={link.label}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                className="overflow-hidden"
              >
                <a
                  href={link.href}
                  onClick={onClose}
                  className="group flex items-center justify-between py-5 border-b border-white/6 hover:border-white/15 transition-colors"
                >
                  <span className="text-5xl md:text-7xl font-display font-bold tracking-tighter text-[#F5F2EA] group-hover:text-[#C6FF3D] transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="text-[#A0A0A0] group-hover:text-[#C6FF3D] transition-colors text-2xl">
                    ↗
                  </span>
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Footer meta */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="relative px-6 md:px-12 py-8"
          >
            <p className="text-xs tracking-[0.3em] text-[#A0A0A0] font-display">
              16 — 18 DECEMBER 2026 · IIT BOMBAY · POWAI · MUMBAI
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
