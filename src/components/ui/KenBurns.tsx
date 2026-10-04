import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'

interface KenBurnsProps {
  children: ReactNode
  className?: string
  duration?: number
}

export function KenBurns({
  children,
  className = '',
  duration = 20,
}: KenBurnsProps) {
  const reduceMotion = !usePrefersMotion()

  if (reduceMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`overflow-hidden ${className}`.trim()}>
      <motion.div
        className="h-full w-full will-change-transform"
        initial={{ scale: 1.04 }}
        animate={{ scale: [1.04, 1.2, 1.04] }}
        transition={{ duration, repeat: Infinity, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </div>
  )
}
