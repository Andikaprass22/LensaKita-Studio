import { siteConfig } from '../../lib/data'
import { flattenNavLinks } from '../../lib/nav'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'

const currentYear = new Date().getFullYear()

/* Rows fill the column and are 44px tall, so short labels ("FAQ") still give a
   full-width touch target; the underline lives on an inner span so it stays
   tight to the text rather than the row. */
const linkClass =
  'group inline-flex min-h-11 w-full items-center text-sm text-ink-300 transition-colors hover:text-brand-300'

const linkUnderline =
  'relative after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-0 after:bg-brand-400 after:transition-all after:duration-300 group-hover:after:w-full'

export function Footer() {
  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    siteConfig.whatsappDefaultMessage,
  )

  return (
    <footer className="relative border-t border-ink-800 bg-ink-950">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <Reveal variant="up" className="flex flex-col gap-4">
          <div className="flex items-center gap-2.5">
            <Icon name="camera" className="h-7 w-7 text-brand-400" />
            <span className="font-display text-lg text-ink-50">
              {siteConfig.businessName}
            </span>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-ink-400">
            {siteConfig.tagline}. Jasa fotografi profesional untuk pernikahan,
            wisuda, keluarga, acara, dan foto produk.
          </p>
          <ul className="flex items-center gap-3">
            {siteConfig.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-ink-300 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand-400 hover:text-brand-300"
                >
                  <Icon name={social.icon} className="h-5 w-5" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          variant="up"
          delay={0.12}
          className="flex flex-col gap-3"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-500">
            Navigasi
          </h2>
          <ul className="flex flex-col">
            {flattenNavLinks(siteConfig.navLinks).map((link) => (
              <li key={link.sectionId}>
                <a href={`#${link.sectionId}`} className={linkClass}>
                  <span className={linkUnderline}>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          variant="up"
          delay={0.24}
          className="flex flex-col gap-3"
        >
          <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-500">
            Kontak
          </h2>
          <ul className="flex flex-col gap-1 text-sm text-ink-300">
            <li>
              <a
                href={siteConfig.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-1 transition-colors hover:text-brand-300"
              >
                {siteConfig.address}
              </a>
            </li>
            <li>
              <a
                href={`tel:+${siteConfig.whatsappNumber}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-brand-300"
              >
                {siteConfig.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex min-h-11 items-center transition-colors hover:text-brand-300"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="text-ink-400">{siteConfig.businessHours}</li>
            <li>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex min-h-11 items-center gap-2 font-semibold text-brand-300 transition-colors hover:text-brand-200"
              >
                <Icon
                  name="whatsapp"
                  className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                />
                Chat WhatsApp
              </a>
            </li>
          </ul>
        </Reveal>
      </div>

      <div className="border-t border-ink-800 px-5 py-6 sm:px-8">
        <p className="mx-auto max-w-7xl text-center text-xs text-ink-500">
          © {currentYear} {siteConfig.businessName}. Seluruh hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}
