import { motion } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { hero, siteConfig } from '../../lib/data'
import { easeDrama, easeSoft } from '../../lib/motion'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { KenBurns } from '../ui/KenBurns'
import { Parallax } from '../ui/Parallax'
import { Reveal } from '../ui/Reveal'
import { SmartImage } from '../ui/SmartImage'
import { StatValue } from '../ui/StatValue'
import { TextReveal } from '../ui/TextReveal'

export function Hero() {
  const scrollTo = useSmoothScroll()
  const reduceMotion = !usePrefersMotion()
  const spotlight = hero.stats[0]
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    siteConfig.whatsappDefaultMessage,
  )

  return (
    <section
      id="home"
      className="relative overflow-hidden pb-20 pt-32 sm:pb-24 sm:pt-36 md:pt-40"
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] h-[34rem] w-[34rem] rounded-full bg-brand-500/10 blur-3xl"
        animate={
          reduceMotion
            ? undefined
            : { opacity: [0.45, 0.9, 0.45], scale: [1, 1.07, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col gap-7">
          <motion.span
            className="text-xs font-semibold uppercase tracking-[0.3em] text-brand-400"
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: easeSoft }}
          >
            {hero.eyebrow}
          </motion.span>

          <TextReveal
            as="h1"
            text={hero.headline}
            delay={0.1}
            className="font-display text-3xl leading-[1.1] text-ink-50 sm:text-4xl md:text-5xl lg:text-6xl"
          />

          <motion.p
            className="max-w-xl text-base leading-relaxed text-ink-300 sm:text-lg"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeSoft, delay: 0.35 }}
          >
            {hero.description}
          </motion.p>

          <motion.div
            className="flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: easeSoft, delay: 0.5 }}
          >
            <Button
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => scrollTo(hero.primaryCta.targetSectionId)}
            >
              {hero.primaryCta.label}
            </Button>
            <Button
              size="lg"
              variant="secondary"
              href={whatsappUrl}
              external
              icon="whatsapp"
              className="w-full sm:w-auto"
            >
              {hero.secondaryCta.label}
            </Button>
          </motion.div>

          <motion.dl
            className="grid grid-cols-3 gap-4 border-t border-ink-800 pt-7"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.65 }}
          >
            {hero.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <dt className="font-display text-xl text-brand-300 sm:text-3xl">
                  <StatValue value={stat.value} />
                </dt>
                <dd className="text-[10px] uppercase tracking-wider text-ink-400 sm:text-[11px] sm:tracking-widest">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <Parallax distance={72} className="relative">
          <Reveal variant="clip" delay={0.2} className="relative">
            <KenBurns className="rounded-[2rem] shadow-2xl shadow-black/50">
              <SmartImage
                asset={hero.image}
                alt={hero.imageAlt}
                aspect="aspect-[4/5]"
                priority
                className="rounded-[2rem]"
              />
            </KenBurns>

            {spotlight ? (
              <motion.div
                className="absolute -bottom-4 -left-4 hidden rounded-2xl border border-ink-700 bg-ink-900/95 px-5 py-3 backdrop-blur sm:block"
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: easeDrama, delay: 0.9 }}
              >
                <p className="font-display text-lg text-ink-50">
                  <StatValue value={spotlight.value} />
                </p>
                <p className="text-[11px] uppercase tracking-widest text-ink-400">
                  {spotlight.label}
                </p>
              </motion.div>
            ) : null}
          </Reveal>
        </Parallax>
      </div>
    </section>
  )
}
