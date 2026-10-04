import { Agentation } from 'agentation'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { siteConfig } from './lib/data'

// Mirrors the motion setting onto <html> so the CSS effects (film grain,
// marquee, shimmer, glow) can honour it too — not just the JS animations.
document.documentElement.dataset.motion = siteConfig.motion

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    {import.meta.env.DEV ? <Agentation /> : null}
  </StrictMode>,
)
