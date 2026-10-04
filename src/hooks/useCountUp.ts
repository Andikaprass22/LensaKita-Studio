import { useEffect, useRef, useState } from 'react'

interface CountUpOptions {
  duration?: number
  enabled?: boolean
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

export function useCountUp(
  target: number,
  { duration = 1400, enabled = true }: CountUpOptions = {},
) {
  const [value, setValue] = useState(0)
  const frame = useRef<number | null>(null)

  useEffect(() => {
    if (!enabled) return
    if (prefersReducedMotion()) return

    let start: number | null = null

    const step = (now: number) => {
      if (start === null) start = now
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)

      setValue(target * eased)

      if (progress < 1) {
        frame.current = requestAnimationFrame(step)
      }
    }

    frame.current = requestAnimationFrame(step)

    return () => {
      if (frame.current !== null) cancelAnimationFrame(frame.current)
    }
  }, [target, duration, enabled])

  if (!enabled) return 0
  if (prefersReducedMotion()) return target
  return value
}
