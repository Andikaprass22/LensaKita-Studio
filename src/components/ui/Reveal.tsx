import { motion, useInView } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import {
  blurIn,
  clipReveal,
  fadeIn,
  fadeUp,
  scaleIn,
  smooth,
} from '../../lib/motion'

export type RevealVariant = 'up' | 'fade' | 'blur' | 'clip' | 'scale'

const variantMap = {
  up: fadeUp,
  fade: fadeIn,
  blur: blurIn,
  clip: clipReveal,
  scale: scaleIn,
}

interface RevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  className?: string
  once?: boolean
}

export function Reveal({
  children,
  variant = 'up',
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  const reduceMotion = !usePrefersMotion()
  const observeRef = useRef<HTMLDivElement>(null)

  // The clip variant hides itself completely (clip-path inset 100% => zero
  // area), which an IntersectionObserver reports as never in view — so the
  // reveal could never start. Observe this unclipped wrapper instead.
  const inView = useInView(observeRef, { once, margin: '-80px' })

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  if (variant === 'clip') {
    return (
      <div ref={observeRef} className={className}>
        <motion.div
          className="w-full"
          variants={clipReveal}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          transition={{ ...smooth, delay }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      className={className}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: '-80px' }}
      transition={{ ...smooth, delay }}
    >
      {children}
    </motion.div>
  )
}
