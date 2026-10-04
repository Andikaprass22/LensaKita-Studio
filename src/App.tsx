import { MotionConfig } from 'motion/react'
import { SmoothScrollProvider } from './components/SmoothScrollProvider'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { About } from './components/sections/About'
import { CtaClosing } from './components/sections/CtaClosing'
import { Faq } from './components/sections/Faq'
import { Hero } from './components/sections/Hero'
import { Portfolio } from './components/sections/Portfolio'
import { Pricing } from './components/sections/Pricing'
import { Process } from './components/sections/Process'
import { Services } from './components/sections/Services'
import { Testimonials } from './components/sections/Testimonials'
import { CinematicOverlay } from './components/ui/CinematicOverlay'
import { CursorSpotlight } from './components/ui/CursorSpotlight'
import { IntroReveal } from './components/ui/IntroReveal'
import { ScrollProgress } from './components/ui/ScrollProgress'
import { WhatsAppFab } from './components/WhatsAppFab'
import { siteConfig } from './lib/data'

function App() {
  return (
    <MotionConfig
      reducedMotion={siteConfig.motion === 'full' ? 'never' : 'user'}
    >
      <SmoothScrollProvider>
        <IntroReveal />
        <ScrollProgress />
        <CursorSpotlight />
        <CinematicOverlay />

        <div className="relative min-h-screen bg-ink-950">
          <Navbar />
          <main>
            <Hero />
            <About />
            <Services />
            <Portfolio />
            <Pricing />
            <Testimonials />
            <Process />
            <Faq />
            <CtaClosing />
          </main>
          <Footer />
          <WhatsAppFab />
        </div>
      </SmoothScrollProvider>
    </MotionConfig>
  )
}

export default App
