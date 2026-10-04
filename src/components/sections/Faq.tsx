import { motion } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { useState } from 'react'
import { faqItems } from '../../lib/data'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '../ui/Stagger'

export function Faq() {
  const [openId, setOpenId] = useState<string | null>(null)
  const reduceMotion = !usePrefersMotion()

  const toggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="border-t border-ink-800 bg-ink-900/40 py-20 sm:py-24"
    >
      <div className="mx-auto flex max-w-4xl flex-col gap-10 px-5 sm:px-8">
        <SectionHeading
          eyebrow="FAQ"
          title="Pertanyaan yang sering diajukan"
          description="Belum menemukan jawabannya? Kirim pertanyaan Anda lewat WhatsApp, kami balas dengan senang hati."
        />

        <StaggerGroup className="flex flex-col gap-3" stagger={0.07}>
          {faqItems.map((item) => {
            const isOpen = openId === item.id
            const panelId = `faq-panel-${item.id}`

            return (
              <StaggerItem key={item.id}>
                <div
                  className={`sheen overflow-hidden rounded-2xl border bg-ink-950/60 transition-colors duration-500 ${
                    isOpen ? 'border-brand-500/50' : 'border-ink-800'
                  }`}
                >
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(item.id)}
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      className="relative z-[2] flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    >
                      <span className="text-base font-medium text-ink-50">
                        {item.question}
                      </span>
                      <Icon
                        name="chevron-down"
                        className={`h-5 w-5 shrink-0 text-brand-300 transition-transform duration-500 ${
                          isOpen ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </h3>

                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      initial={reduceMotion ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.3,
                        ease: 'easeInOut',
                      }}
                      className="relative z-[2] overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-ink-300">
                        {item.answer}
                      </p>
                    </motion.div>
                  ) : null}
                </div>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
