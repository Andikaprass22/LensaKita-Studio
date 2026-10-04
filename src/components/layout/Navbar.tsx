import { AnimatePresence, motion } from 'motion/react'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { MouseEvent } from 'react'
import { useActiveSection } from '../../hooks/useActiveSection'
import { usePrefersMotion } from '../../hooks/usePrefersMotion'
import { useSmoothScroll } from '../../hooks/useSmoothScroll'
import { siteConfig } from '../../lib/data'
import { easeDrama, easeSoft } from '../../lib/motion'
import { isNavGroup, navSectionIds } from '../../lib/nav'
import type { SectionId } from '../../lib/types'
import { buildWhatsAppUrl } from '../../lib/whatsapp'
import { Button } from '../ui/Button'
import { Icon } from '../ui/Icon'

function groupId(label: string) {
  return `nav-group-${label.toLowerCase().replace(/\s+/g, '-')}`
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState<string | null>(null)
  const desktopNavRef = useRef<HTMLUListElement>(null)
  const scrollTo = useSmoothScroll()
  const reduceMotion = !usePrefersMotion()

  const sectionIds = useMemo(() => navSectionIds(siteConfig.navLinks), [])
  const activeSection = useActiveSection(sectionIds)

  const whatsappUrl = buildWhatsAppUrl(
    siteConfig.whatsappNumber,
    siteConfig.whatsappDefaultMessage,
  )

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setMenuOpen(false)
      setOpenGroup(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!openGroup) return
    const onPointerDown = (event: PointerEvent) => {
      const root = desktopNavRef.current
      if (root && !root.contains(event.target as Node)) setOpenGroup(null)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [openGroup])

  const handleNavigate = (
    event: MouseEvent<HTMLAnchorElement>,
    id: SectionId,
  ) => {
    event.preventDefault()
    setMenuOpen(false)
    setOpenGroup(null)
    scrollTo(id)
  }

  const solid = scrolled || menuOpen

  return (
    <motion.header
      initial={reduceMotion ? false : { y: -90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: easeDrama, delay: 0.15 }}
      className={`fixed inset-x-0 top-0 z-50 pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
        solid
          ? 'border-b border-ink-800 bg-ink-950/95 backdrop-blur'
          : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="Navigasi utama"
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8"
      >
        <a
          href="#home"
          onClick={(event) => handleNavigate(event, 'home')}
          className="inline-flex min-h-11 items-center gap-2.5 rounded-lg"
        >
          <Icon name="camera" className="h-7 w-7 text-brand-400" />
          <span className="whitespace-nowrap font-display text-lg tracking-wide text-ink-50">
            {siteConfig.businessName}
          </span>
        </a>

        <ul ref={desktopNavRef} className="hidden items-center gap-1 lg:flex">
          {siteConfig.navLinks.map((item) => {
            if (isNavGroup(item)) {
              const isOpen = openGroup === item.label
              const groupActive = item.links.some(
                (link) => link.sectionId === activeSection,
              )

              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setOpenGroup(item.label)}
                  onMouseLeave={() =>
                    setOpenGroup((current) =>
                      current === item.label ? null : current,
                    )
                  }
                >
                  {/* Opening is idempotent: hovering already opens the panel, so
                      a toggle here would close what the hover just opened. */}
                  <button
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={isOpen}
                    aria-controls={groupId(item.label)}
                    onClick={() => setOpenGroup(item.label)}
                    className={`relative inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm transition-colors before:absolute before:inset-x-0 before:-inset-y-1 before:content-[''] ${
                      groupActive
                        ? 'text-brand-300'
                        : 'text-ink-300 hover:text-ink-50'
                    }`}
                  >
                    {item.label}
                    <Icon
                      name="chevron-down"
                      className={`h-3.5 w-3.5 transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                    {groupActive && !reduceMotion ? (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute inset-x-3 bottom-0.5 h-px bg-brand-400"
                        transition={{ duration: 0.45, ease: easeSoft }}
                      />
                    ) : null}
                  </button>

                  <AnimatePresence>
                    {isOpen ? (
                      <motion.div
                        id={groupId(item.label)}
                        initial={reduceMotion ? false : { opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={
                          reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }
                        }
                        transition={{
                          duration: reduceMotion ? 0 : 0.22,
                          ease: easeSoft,
                        }}
                        className="absolute left-0 top-full z-50 w-56 overflow-hidden rounded-2xl border border-ink-800 bg-ink-950/95 p-2 shadow-2xl shadow-black/60 backdrop-blur"
                      >
                        <ul className="flex flex-col">
                          {item.links.map((link) => (
                            <li key={link.sectionId}>
                              <a
                                href={`#${link.sectionId}`}
                                onClick={(event) =>
                                  handleNavigate(event, link.sectionId)
                                }
                                aria-current={
                                  activeSection === link.sectionId
                                    ? 'true'
                                    : undefined
                                }
                                className={`block rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                                  activeSection === link.sectionId
                                    ? 'text-brand-300'
                                    : 'text-ink-200 hover:bg-ink-900 hover:text-ink-50'
                                }`}
                              >
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              )
            }

            return (
              <li key={item.sectionId}>
                <a
                  href={`#${item.sectionId}`}
                  onClick={(event) => handleNavigate(event, item.sectionId)}
                  aria-current={
                    activeSection === item.sectionId ? 'true' : undefined
                  }
                  className={`relative inline-block rounded-full px-3.5 py-2 text-sm transition-colors before:absolute before:inset-x-0 before:-inset-y-1 before:content-[''] ${
                    activeSection === item.sectionId
                      ? 'text-brand-300'
                      : 'text-ink-300 hover:text-ink-50'
                  }`}
                >
                  {item.label}
                  {activeSection === item.sectionId && !reduceMotion ? (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-3 bottom-0.5 h-px bg-brand-400"
                      transition={{ duration: 0.45, ease: easeSoft }}
                    />
                  ) : null}
                </a>
              </li>
            )
          })}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <Button href={whatsappUrl} external>
              Konsultasi
            </Button>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-ink-700 text-ink-100 lg:hidden"
          >
            <Icon name={menuOpen ? 'close' : 'menu'} className="h-5 w-5" />
          </button>
        </div>
      </nav>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            id="mobile-menu"
            initial={reduceMotion ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.25, ease: 'easeInOut' }}
            className="overflow-hidden border-t border-ink-800 bg-ink-950 lg:hidden"
          >
            <ul className="flex max-h-[70vh] flex-col overflow-y-auto px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
              {siteConfig.navLinks.map((item) =>
                isNavGroup(item) ? (
                  <li key={item.label} className="pt-2">
                    <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-widest text-ink-500">
                      {item.label}
                    </p>
                    <ul className="flex flex-col border-l border-ink-800 pl-3">
                      {item.links.map((link) => (
                        <li key={link.sectionId}>
                          <a
                            href={`#${link.sectionId}`}
                            onClick={(event) =>
                              handleNavigate(event, link.sectionId)
                            }
                            className={`block rounded-lg px-3 py-3 text-base ${
                              activeSection === link.sectionId
                                ? 'text-brand-300'
                                : 'text-ink-200'
                            }`}
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.sectionId}>
                    <a
                      href={`#${item.sectionId}`}
                      onClick={(event) => handleNavigate(event, item.sectionId)}
                      className={`block rounded-lg px-3 py-3 text-base ${
                        activeSection === item.sectionId
                          ? 'text-brand-300'
                          : 'text-ink-200'
                      }`}
                    >
                      {item.label}
                    </a>
                  </li>
                ),
              )}
              <li className="pt-3">
                <Button href={whatsappUrl} external className="w-full">
                  Konsultasi
                </Button>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.header>
  )
}
