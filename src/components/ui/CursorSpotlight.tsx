import { useEffect, useRef } from 'react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'

const RESTING_GLOW =
  'radial-gradient(760px circle at 72% 22%, rgba(232,184,120,0.17), transparent 68%)'

export function CursorSpotlight() {
  const reduceMotion = !usePrefersMotion()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (reduceMotion) return
    if (typeof window.matchMedia !== 'function') return
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    let frame = 0

    const onMove = (event: MouseEvent) => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        const node = ref.current
        if (!node) return
        node.style.background = `radial-gradient(760px circle at ${event.clientX}px ${event.clientY}px, rgba(232,184,120,0.21), transparent 70%)`
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(frame)
    }
  }, [reduceMotion])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{ background: RESTING_GLOW }}
      className="pointer-events-none fixed inset-0 z-[58] hidden md:block"
    />
  )
}
