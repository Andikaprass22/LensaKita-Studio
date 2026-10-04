import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import type { ReactNode } from 'react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { easeSoft } from '../../lib/motion'

type TextTag = 'h1' | 'h2' | 'h3' | 'p' | 'span'

interface TextRevealProps {
  text: string
  as?: TextTag
  className?: string
  delay?: number
  stagger?: number
}

export function TextReveal({
  text,
  as: Tag = 'span',
  className,
  delay = 0,
  stagger = 0.07,
}: TextRevealProps) {
  const reduceMotion = !usePrefersMotion()
  const observeRef = useRef<HTMLSpanElement>(null)

  // Observing the word wrappers directly would never fire: each word is
  // translated outside its own overflow-hidden mask, so IntersectionObserver
  // clips it to a zero-area rect. Observe this unclipped wrapper instead.
  const inView = useInView(observeRef, { once: true, margin: '-60px' })
  const words = text.split(' ')

  if (reduceMotion) {
    return (
      <Tag className={className} data-testid="text-reveal">
        {text}
      </Tag>
    )
  }

  const nodes: ReactNode[] = []

  words.forEach((word, index) => {
    if (index > 0) nodes.push(' ')

    nodes.push(
      <span
        key={`${word}-${index}`}
        className="inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom"
      >
        <motion.span
          className="inline-block"
          initial={{ y: '120%' }}
          animate={inView ? { y: '0%' } : { y: '120%' }}
          transition={{
            duration: 1,
            ease: easeSoft,
            delay: delay + index * stagger,
          }}
        >
          {word}
        </motion.span>
      </span>,
    )
  })

  return (
    <Tag className={className} data-testid="text-reveal">
      <span ref={observeRef}>{nodes}</span>
    </Tag>
  )
}
