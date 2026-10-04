import { motion } from 'motion/react'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { useMemo, useState } from 'react'
import { portfolioCategories, portfolioItems } from '../../lib/data'
import type { PortfolioCategory, PortfolioItem } from '../../lib/types'
import { SectionHeading } from '../ui/SectionHeading'
import { SmartImage } from '../ui/SmartImage'

interface PortfolioProps {
  items?: PortfolioItem[]
  categories?: PortfolioCategory[]
}

const ALL = 'all'

export function Portfolio({
  items = portfolioItems,
  categories = portfolioCategories,
}: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<string>(ALL)
  const reduceMotion = !usePrefersMotion()

  const categoryLabels = useMemo(
    () => new Map(categories.map((category) => [category.id, category.label])),
    [categories],
  )

  const availableCategories = useMemo(
    () =>
      categories.filter(
        (category) =>
          category.id === ALL ||
          items.some((item) => item.categoryId === category.id),
      ),
    [categories, items],
  )

  const visibleItems = useMemo(
    () =>
      activeFilter === ALL
        ? items
        : items.filter((item) => item.categoryId === activeFilter),
    [items, activeFilter],
  )

  return (
    <section id="portfolio" className="border-t border-ink-800 py-20 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Portofolio"
          title="Karya yang kami banggakan"
          description="Setiap foto adalah cerita. Jelajahi sebagian hasil sesi kami berdasarkan kategori."
        />

        <div
          role="group"
          aria-label="Filter kategori portofolio"
          className="flex flex-wrap justify-center gap-2"
        >
          {availableCategories.map((category) => {
            const isActive = activeFilter === category.id
            return (
              <button
                key={category.id}
                type="button"
                data-category={category.id}
                aria-pressed={isActive}
                onClick={() => setActiveFilter(category.id)}
                className={`inline-flex min-h-11 items-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'border-brand-400 bg-brand-500/15 text-brand-200'
                    : 'border-ink-700 text-ink-300 hover:border-brand-500/60 hover:text-ink-50'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>

        <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item, index) => (
            <motion.figure
              key={item.id}
              layout
              data-testid="portfolio-item"
              data-category={item.categoryId}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { duration: 0.5, ease: 'easeOut', delay: (index % 3) * 0.06 }
              }
              className="sheen group relative overflow-hidden rounded-2xl border border-ink-800"
            >
              <SmartImage
                asset={item.image}
                alt={item.alt}
                aspect="aspect-[4/3]"
                imgClassName="transition-transform duration-[1400ms] ease-out group-hover:scale-[1.08]"
              />
              <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-ink-950/95 via-ink-950/50 to-transparent p-5 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <p className="font-display text-lg text-ink-50">{item.title}</p>
                <p className="text-[11px] uppercase tracking-widest text-brand-300">
                  {categoryLabels.get(item.categoryId) ?? ''}
                </p>
              </figcaption>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
