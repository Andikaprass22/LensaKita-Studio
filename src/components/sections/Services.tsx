import { services, siteConfig } from '../../lib/data'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'
import { Marquee } from '../ui/Marquee'
import { SectionHeading } from '../ui/SectionHeading'
import { StaggerGroup, StaggerItem } from '../ui/Stagger'

export function Services() {
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 sm:px-8">
        <SectionHeading
          eyebrow="Layanan Kami"
          title="Satu studio untuk setiap momen penting"
          description="Pilih layanan yang paling sesuai dengan kebutuhan Anda. Semua paket dapat disesuaikan lewat konsultasi singkat."
        />

        <StaggerGroup
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.09}
        >
          {services.map((service) => (
            <StaggerItem key={service.id} className="group h-full">
              <div className="sheen flex h-full flex-col gap-4 rounded-2xl border border-ink-800 bg-ink-900/40 p-7 transition-all duration-500 hover:-translate-y-1.5 hover:border-brand-500/60 hover:shadow-2xl hover:shadow-brand-900/20">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500/15 text-brand-300 transition-transform duration-500 group-hover:scale-110">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <h3 className="font-display text-xl text-ink-50">
                  {service.title}
                </h3>
                <p className="flex-1 text-sm leading-relaxed text-ink-300">
                  {service.description}
                </p>
                {service.startingPrice ? (
                  <p className="text-sm font-semibold text-brand-300">
                    {service.startingPrice}
                  </p>
                ) : null}
                <a
                  href={buildWhatsAppUrl(
                    siteConfig.whatsappNumber,
                    `Halo ${siteConfig.businessName}! Saya ingin bertanya tentang layanan ${service.title}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-[2] inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-ink-100 transition-colors hover:text-brand-300"
                >
                  Tanya Layanan Ini
                  <Icon
                    name="arrow-right"
                    className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </a>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>

      <div className="mt-16 border-y border-ink-800 py-6">
        <Marquee
          items={services.map((service) => service.title)}
          speedSeconds={40}
          className="text-xs uppercase tracking-[0.35em] text-ink-500"
        />
      </div>
    </section>
  )
}
