# 🚀 TechFest IIT Bombay — Premium Landing Page

<div align="center">

![TechFest Banner](https://img.shields.io/badge/TechFest-IIT%20Bombay-C6FF3D?style=for-the-badge&labelColor=080808)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite_8-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_v4-0F172A?style=for-the-badge&logo=tailwind-css&logoColor=38BDF8)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

**A premium, animation-rich landing page for Asia's largest science & technology festival.**

[🔴 Live Demo](#) • [📸 Screenshots](#screenshots) • [⚙️ Tech Stack](#tech-stack)

</div>

---

## ✨ Overview

This is a **high-fidelity, production-grade landing page** for **TechFest IIT Bombay** — Asia's largest science and technology festival, held annually at IIT Bombay and attracting hundreds of thousands of participants from across the globe.

Built as an assignment project, this landing page pushes the boundaries of modern web animation and UI design — featuring horizontal scroll timelines, parallax effects, smooth inertia scrolling, and a dark premium aesthetic inspired by world-class event websites.

---

## 🎬 Features

- **Hero Section** — Cinematic full-screen intro with animated text reveals and a live particle / canvas engine
- **30 Years Timeline** — GSAP-powered horizontal scroll section chronicling Techfest milestones from 1997 → 2026
- **Aetherial Engine** — Interactive WebGL/Canvas visual centrepiece
- **Featured Experiences** — Animated showcase cards with hover effects
- **Experience Accordion** — Framer Motion accordion with smooth expand/collapse
- **Numbers Section** — Animated stat counters
- **Campus Section** — Immersive IIT Bombay campus feature block
- **Final CTA** — Bold call-to-action with magnetic button effect
- **Smooth Scrolling** — Lenis inertia scroll throughout the entire page
- **Fully Responsive** — Mobile-first design, works on all screen sizes

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Styling | Tailwind CSS v4 |
| Language | TypeScript 5.7 |
| Animation | GSAP 3 + ScrollTrigger |
| Motion | Framer Motion 13 |
| Smooth Scroll | Lenis |
| Icons | Lucide React |
| Formatter | oxfmt |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Hero.tsx               # Full-screen animated hero
│   ├── ThirtyYears.tsx        # GSAP horizontal scroll timeline
│   ├── AetherialEngine.tsx    # Interactive canvas/visual engine
│   ├── FeaturedExperiences.tsx
│   ├── ExperienceAccordion.tsx
│   ├── NumbersSection.tsx
│   ├── CampusSection.tsx
│   ├── Manifesto.tsx
│   ├── FinalCTA.tsx
│   ├── Navbar.tsx
│   ├── MobileMenu.tsx
│   └── Footer.tsx
├── hooks/
│   ├── useLenis.ts            # Smooth scroll setup
│   └── useReducedMotion.ts
├── lib/
│   └── constants.ts           # Milestones, experiences data
├── App.tsx
├── main.tsx
└── index.css                  # Tailwind v4 + global styles
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js ≥ 18
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/Rehanbagwan007/TechFest-IIT-Bombay.git

# Navigate to project directory
cd TechFest-IIT-Bombay

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
pnpm build
pnpm preview
```

---

## 🎨 Design Highlights

- **Color Palette** — Deep matte black `#080808` backgrounds with acid-lime `#C6FF3D` accents
- **Typography** — Display-weight variable fonts with tight tracking for a premium editorial feel
- **Micro-animations** — Every interaction has a purposeful, physics-based animation
- **Horizontal Scroll** — GSAP ScrollTrigger pins the 30-year timeline for a magazine-style scroll experience
- **Glassmorphism & Gradients** — Used selectively for depth and hierarchy

---

## 📄 License

This project was built as an academic assignment. All TechFest branding belongs to **IIT Bombay**.

---

<div align="center">

Made with ❤️ for **TechFest IIT Bombay 2026 — An Aetherial Renaissance**

</div>

