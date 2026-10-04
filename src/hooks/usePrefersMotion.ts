import { useReducedMotion } from 'motion/react'
import { siteConfig } from '../lib/data'

/**
 * Whether movement animations should play.
 *
 * `siteConfig.motion` lets the template owner override the visitor's OS
 * preference ('full' forces animations on, 'reduced' forces them off).
 */
export function usePrefersMotion(): boolean {
  const systemPrefersReduced = useReducedMotion()

  if (siteConfig.motion === 'full') return true
  if (siteConfig.motion === 'reduced') return false

  return !systemPrefersReduced
}
