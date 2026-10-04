import Lenis from 'lenis'
import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { usePrefersMotion } from '../hooks/usePrefersMotion'
import { LenisRefContext } from '../lib/lenisContext'

export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const prefersMotion = usePrefersMotion()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!prefersMotion) return

    let instance: Lenis | null = null
    let frame = 0

    try {
      instance = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        syncTouch: false,
        touchMultiplier: 1.6,
      })
    } catch {
      instance = null
    }

    if (!instance) return

    const active = instance
    lenisRef.current = active

    const raf = (time: number) => {
      active.raf(time)
      frame = requestAnimationFrame(raf)
    }
    frame = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(frame)
      active.destroy()
      lenisRef.current = null
    }
  }, [prefersMotion])

  return (
    <LenisRefContext.Provider value={lenisRef}>
      {children}
    </LenisRefContext.Provider>
  )
}
