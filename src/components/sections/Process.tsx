import { motion } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { processSteps } from '../../lib/data'
import { easeSoft } from '../../lib/motion'
import { SectionHeading } from '../ui/SectionHeading'

export function Process() {
  const reduceMotion = !usePrefersMotion()

  return (
    <section id="process" className="border-t border-ink-800 py-20 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Alur Pemesanan"
          title="Dari konsultasi hingga foto diterima"
          description="Prosesnya sederhana dan transparan, sehingga Anda tahu persis apa yang akan terjadi di setiap tahap."
        />

        <ol className="relative grid gap-8 md:grid-cols-5 md:gap-6">
          {processSteps.map((step, index) => (
            <li key={step.id}>
              <div className="relative flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <motion.span
                    className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-brand-500/60 bg-brand-500/10 font-display text-lg text-brand-300"
                    initial={reduceMotion ? false : { opacity: 0, scale: 0.6 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.5,
                      ease: easeSoft,
                      delay: index * 0.14,
                    }}
                  >
                    {index + 1}
                  </motion.span>
                  <motion.span
                    aria-hidden="true"
                    className="hidden h-px flex-1 origin-left bg-gradient-to-r from-brand-500/50 to-ink-800 md:block"
                    initial={reduceMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{
                      duration: 0.9,
                      ease: 'easeOut',
                      delay: 0.25 + index * 0.14,
                    }}
                  />
                </div>
                <h3 className="text-base font-semibold text-ink-50">
                  {step.title}
                </h3>
                <p className="text-sm leading-relaxed text-ink-400">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
