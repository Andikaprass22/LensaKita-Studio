import { motion } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer } from '../../lib/motion'

interface StaggerGroupProps {
  children: ReactNode
  stagger?: number
  delayChildren?: number
  className?: string
}

export function StaggerGroup({
  children,
  stagger = 0.08,
  delayChildren = 0,
  className,
}: StaggerGroupProps) {
  const reduceMotion = !usePrefersMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={staggerContainer(stagger, delayChildren)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className }: StaggerItemProps) {
  const reduceMotion = !usePrefersMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div variants={fadeUp} className={className}>
      {children}
    </motion.div>
  )
}
