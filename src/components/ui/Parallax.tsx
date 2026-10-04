import { motion, useScroll, useTransform } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { useRef } from 'react'
import type { ReactNode } from 'react'

interface ParallaxProps {
  children: ReactNode
  distance?: number
  className?: string
}

export function Parallax({
  children,
  distance = 90,
  className,
}: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reduceMotion = !usePrefersMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance])

  return (
    <div ref={ref} className={className}>
      {reduceMotion ? (
        children
      ) : (
        <motion.div style={{ y }} className="h-full w-full">
          {children}
        </motion.div>
      )}
    </div>
  )
}
