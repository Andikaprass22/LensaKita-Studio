import type { Transition, Variants } from 'motion/react'

export const easeSoft = [0.22, 1, 0.36, 1] as const
export const easeDrama = [0.16, 1, 0.3, 1] as const

export const smooth: Transition = { duration: 0.95, ease: easeSoft }
export const slow: Transition = { duration: 1.3, ease: easeDrama }

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48 },
  visible: { opacity: 1, y: 0 },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
}

export const blurIn: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(22px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
}

export const clipReveal: Variants = {
  hidden: { opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' },
  visible: { opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
}

export function staggerContainer(
  staggerChildren = 0.1,
  delayChildren = 0,
): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  }
}
