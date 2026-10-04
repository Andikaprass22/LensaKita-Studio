import { useCallback } from 'react'
import { useLenisRef } from '../lib/lenisContext'
import type { SectionId } from '../lib/types'
import { usePrefersMotion } from './usePrefersMotion'

const HEADER_OFFSET = -72

export function useSmoothScroll() {
  const lenisRef = useLenisRef()
  const prefersMotion = usePrefersMotion()

  return useCallback(
    (sectionId: SectionId) => {
      const target = document.getElementById(sectionId)
      if (!target) return

      const lenis = lenisRef?.current ?? null

      if (lenis && prefersMotion) {
        lenis.scrollTo(target, { offset: HEADER_OFFSET, duration: 1.2 })
        return
      }

      target.scrollIntoView({
        behavior: prefersMotion ? 'smooth' : 'auto',
        block: 'start',
      })
    },
    [lenisRef, prefersMotion],
  )
}
