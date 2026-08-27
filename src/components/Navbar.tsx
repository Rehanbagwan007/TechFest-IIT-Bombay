import { useEffect, useRef, useState } from 'react'
import { NAV_LINKS } from '@/lib/constants'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'py-4 border-b border-white/5' : 'py-6'
        }`}
        style={{
          background: scrolled
            ? 'rgba(8,8,8,0.9)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
        }}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-6 md:px-12">
          {/* Logo */}
          <a href="#" className="flex flex-col" aria-label="Techfest home">
            <span
              className="text-sm font-display font-bold tracking-[0.3em] text-[#F5F2EA]"
            >
              TECHFEST
            </span>
            <span className="text-[10px] tracking-[0.4em] text-[#A0A0A0] font-display hidden md:block">
              IIT BOMBAY
            </span>
          </a>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-10" role="list">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-xs tracking-[0.25em] text-[#A0A0A0] hover:text-[#F5F2EA] transition-colors duration-300 font-display"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Menu button */}
          <button
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            aria-expanded={menuOpen}
            className="group flex items-center justify-center w-12 h-12 rounded-full border border-white/15 hover:border-[#C6FF3D]/50 transition-all duration-300"
          >
            <span className="relative flex flex-col gap-1 w-5">
              <span className="block h-px w-full bg-[#F5F2EA] transition-all duration-300 group-hover:w-4/5" />
              <span className="block h-px w-3/5 bg-[#F5F2EA] transition-all duration-300 group-hover:w-full" />
            </span>
          </button>
        </div>
      </nav>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
