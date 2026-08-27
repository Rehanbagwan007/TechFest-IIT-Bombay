import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useLenis } from '@/hooks/useLenis'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Manifesto from '@/components/Manifesto'
import ThirtyYears from '@/components/ThirtyYears'
import ExperienceAccordion from '@/components/ExperienceAccordion'
import AetherialEngine from '@/components/AetherialEngine'
import FeaturedExperiences from '@/components/FeaturedExperiences'
import CampusSection from '@/components/CampusSection'
import NumbersSection from '@/components/NumbersSection'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'

// Register GSAP plugins once
gsap.registerPlugin(ScrollTrigger)

export default function App() {
  const reducedMotion = useReducedMotion()
  useLenis(reducedMotion)

  return (
    <div className="bg-[#080808] text-[#F5F2EA] overflow-x-hidden grain" lang="en">
      <a
        href="#hero"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:bg-[#C6FF3D] focus:text-[#080808] focus:px-4 focus:py-2 focus:text-sm"
      >
        Skip to main content
      </a>

      <Navbar />

      <main id="hero">
        <Hero />
        <Manifesto />
        <ThirtyYears />
        <ExperienceAccordion />
        <AetherialEngine />
        <FeaturedExperiences />
        <CampusSection />
        <NumbersSection />
        <FinalCTA />
      </main>

      <Footer />
    </div>
  )
}
