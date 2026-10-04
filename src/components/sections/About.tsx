import { motion } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { about } from '../../lib/data'
import { easeDrama } from '../../lib/motion'
import { Icon } from '../ui/Icon'
import { Parallax } from '../ui/Parallax'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { StaggerGroup, StaggerItem } from '../ui/Stagger'
import { StatValue } from '../ui/StatValue'
import { TextReveal } from '../ui/TextReveal'

export function About() {
  const reduceMotion = !usePrefersMotion()

  return (
    <section
      id="about"
      className="border-t border-ink-800 bg-ink-900/40 py-20 sm:py-24"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <Parallax distance={58} className="order-2 lg:order-1">
          <Reveal variant="clip" className="relative">
            <SmartImage
              asset={about.image}
              alt={about.imageAlt}
              aspect="aspect-[5/4]"
              className="rounded-[2rem]"
            />
            <motion.div
              className="absolute -right-4 -top-4 rounded-2xl bg-brand-500 px-5 py-4 text-ink-950 shadow-xl"
              initial={reduceMotion ? false : { opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, ease: easeDrama, delay: 0.45 }}
            >
              <p className="font-display text-3xl leading-none">
                <StatValue value={String(about.experienceYears)} />
              </p>
              <p className="text-[11px] font-semibold uppercase tracking-widest">
                Tahun Berkarya
              </p>
            </motion.div>
          </Reveal>
        </Parallax>

        <div className="order-1 flex flex-col gap-6 lg:order-2">
          <Reveal variant="fade">
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400">
              {about.eyebrow}
            </span>
          </Reveal>

          <TextReveal
            as="h2"
            text={about.heading}
            className="font-display text-3xl leading-tight text-ink-50 sm:text-4xl"
          />

          {about.paragraphs.map((paragraph, index) => (
            <Reveal key={paragraph} delay={0.15 + index * 0.12}>
              <p className="text-base leading-relaxed text-ink-300">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        <StaggerGroup
          className="order-3 grid gap-5 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4"
          stagger={0.1}
        >
          {about.advantages.map((advantage) => (
            <StaggerItem
              key={advantage.title}
              className="group flex flex-col gap-3 rounded-2xl border border-ink-800 bg-ink-950/60 p-6 transition-colors duration-500 hover:border-brand-500/60"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-transform duration-500 group-hover:-translate-y-1 group-hover:rotate-6">
                <Icon name={advantage.icon} className="h-5 w-5" />
              </span>
              <h3 className="text-base font-semibold text-ink-50">
                {advantage.title}
              </h3>
              <p className="text-sm leading-relaxed text-ink-400">
                {advantage.description}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
