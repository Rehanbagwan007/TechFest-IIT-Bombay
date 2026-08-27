export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/5 px-6 md:px-12 pt-16 pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Large wordmark */}
        <div className="mb-16 overflow-hidden">
          <h2
            className="text-[18vw] md:text-[14vw] font-display font-bold leading-none tracking-tighter text-outline"
            aria-label="Techfest"
          >
            TECHFEST
          </h2>
        </div>

        <div className="rule mb-12" />

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          <div>
            <p className="text-xs tracking-[0.3em] text-[#A0A0A0] font-display mb-4">NAVIGATE</p>
            <ul className="flex flex-col gap-3">
              {['Experience', 'Events', 'About', 'Contact'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[#F5F2EA]/70 hover:text-[#F5F2EA] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] text-[#A0A0A0] font-display mb-4">SOCIAL</p>
            <ul className="flex flex-col gap-3">
              {['Instagram', 'LinkedIn', 'YouTube', 'X'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-[#F5F2EA]/70 hover:text-[#C6FF3D] transition-colors"
                  >
                    {item} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2 md:text-right">
            <p className="text-xs tracking-[0.3em] text-[#A0A0A0] font-display mb-4">THE EVENT</p>
            <p className="text-lg font-display font-semibold tracking-tight text-[#F5F2EA]">
              IIT BOMBAY
            </p>
            <p className="text-sm text-[#A0A0A0] mt-1">POWAI · MUMBAI</p>
            <p className="text-sm text-[#C6FF3D] mt-3 font-display">16 — 18 DECEMBER 2026</p>
          </div>
        </div>

        <div className="rule mb-6" />

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-[#A0A0A0]">
            © 2026 CREATIVE CONCEPT
          </p>
          <p className="text-xs text-[#A0A0A0] max-w-sm md:text-right">
            Creative redesign concept for Techfest, IIT Bombay. Not an official website.
          </p>
        </div>
      </div>
    </footer>
  )
}
