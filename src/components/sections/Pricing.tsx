import { pricingPackages, siteConfig } from '../../lib/data'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { SectionHeading } from '../ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '../ui/Stagger'

export function Pricing() {
  return (
    <section
      id="pricing"
      className="border-t border-ink-800 bg-ink-900/40 py-20 sm:py-24"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Daftar Harga"
          title="Paket yang jelas, tanpa biaya tersembunyi"
          description="Semua paket dapat disesuaikan. Tanyakan detailnya melalui WhatsApp dan kami bantu memilih yang paling pas."
        />

        <StaggerGroup className="grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {pricingPackages.map((pkg) => (
            <StaggerItem
              key={pkg.id}
              className={`relative flex h-full min-w-0 flex-col ${
                pkg.highlighted ? 'lg:-mt-4' : ''
              }`}
            >
              {/* Sits outside the card's clipped area so it is never cut off */}
              {pkg.highlighted ? (
                <span className="absolute -top-3 left-8 z-20 rounded-full bg-brand-500 px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-ink-950 shadow-lg shadow-black/40">
                  Paling Populer
                </span>
              ) : null}

              <div
                className={`sheen group flex h-full flex-col gap-5 rounded-3xl border p-8 transition-all duration-500 hover:-translate-y-1.5 ${
                  pkg.highlighted
                    ? 'glow-pulse border-brand-500 bg-ink-950 shadow-2xl shadow-brand-900/30'
                    : 'border-ink-800 bg-ink-950/60 hover:border-brand-500/50'
                }`}
              >
                <h3 className="font-display text-2xl text-ink-50">{pkg.name}</h3>

                {/* Wraps and steps down a size on narrow screens: an
                    unwrappable "Rp6.500.000" at 36px forced the auto grid
                    track past the viewport at 320px. */}
                <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="font-display text-3xl text-brand-300 sm:text-4xl">
                    {pkg.price}
                  </span>
                  {pkg.priceNote ? (
                    <span className="text-sm text-ink-400">{pkg.priceNote}</span>
                  ) : null}
                </p>

                <p className="text-sm leading-relaxed text-ink-300">
                  {pkg.description}
                </p>

                <ul className="flex flex-1 flex-col gap-3">
                  {pkg.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex min-w-0 items-start gap-2 text-sm break-words text-ink-200"
                    >
                      <Icon
                        name="check"
                        className="mt-0.5 h-4 w-4 shrink-0 text-brand-400"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Button
                  href={buildWhatsAppUrl(
                    siteConfig.whatsappNumber,
                    `Halo ${siteConfig.businessName}! Saya ingin menanyakan detail ${pkg.name}.`,
                  )}
                  external
                  variant={pkg.highlighted ? 'primary' : 'secondary'}
                  className="relative z-[2] w-full"
                >
                  {pkg.ctaLabel}
                </Button>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
