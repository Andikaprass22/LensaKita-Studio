import { motion } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { closingCta, siteConfig } from '../../lib/data'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

export function CtaClosing() {
  const reduceMotion = !usePrefersMotion()
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    siteConfig.whatsappDefaultMessage,
  )

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Reveal
          variant="scale"
          className="sheen relative overflow-hidden rounded-[2rem] border border-ink-800 bg-ink-900/60 px-6 py-14 text-center sm:px-12"
        >
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : { opacity: [0.45, 1, 0.45], scale: [1, 1.15, 1] }
            }
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative flex flex-col items-center gap-6">
            <h2 className="shimmer-text max-w-2xl font-display text-3xl leading-tight sm:text-4xl">
              {closingCta.heading}
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-ink-300">
              {closingCta.description}
            </p>

            <motion.div
              animate={reduceMotion ? undefined : { scale: [1, 1.035, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Button
                size="lg"
                href={whatsappUrl}
                external
                icon="whatsapp"
              >
                {closingCta.ctaLabel}
              </Button>
            </motion.div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-2 text-sm text-ink-400">
              <span className="inline-flex items-center gap-2">
                <Icon name="whatsapp" className="h-4 w-4 text-brand-400" />
                {siteConfig.phoneDisplay}
              </span>
              <span className="inline-flex items-center gap-2">
                <Icon name="clock" className="h-4 w-4 text-brand-400" />
                {siteConfig.businessHours}
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
