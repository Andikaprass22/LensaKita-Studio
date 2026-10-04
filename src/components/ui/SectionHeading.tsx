import { motion } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { easeSoft } from '../../lib/motion'
import { TextReveal } from './TextReveal'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
}: SectionHeadingProps) {
  const reduceMotion = !usePrefersMotion()
  const alignment =
    align === 'center' ? 'items-center text-center' : 'items-start text-left'

  return (
    <div className={`flex flex-col gap-4 ${alignment}`}>
      {eyebrow ? (
        <motion.span
          className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400"
          initial={reduceMotion ? false : { opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: easeSoft }}
        >
          {eyebrow}
        </motion.span>
      ) : null}

      <TextReveal
        as="h2"
        text={title}
        className="max-w-2xl font-display text-3xl leading-tight text-ink-50 sm:text-4xl md:text-5xl"
      />

      {description ? (
        <motion.p
          className="max-w-2xl text-base leading-relaxed text-ink-300"
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: easeSoft, delay: 0.18 }}
        >
          {description}
        </motion.p>
      ) : null}
    </div>
  )
}
