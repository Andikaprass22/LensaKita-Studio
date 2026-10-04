export type SectionId =
  | 'home'
  | 'about'
  | 'services'
  | 'portfolio'
  | 'pricing'
  | 'testimonials'
  | 'process'
  | 'faq'
  | 'contact'

/**
 * 'auto'    – follow the visitor's OS "reduce motion" preference (default)
 * 'full'    – always play the full animations, even when the OS asks to reduce
 * 'reduced' – never play movement animations (effects stay visible)
 */
export type MotionMode = 'auto' | 'full' | 'reduced'

export interface NavLink {
  label: string
  sectionId: SectionId
}

/** A collapsed menu entry that groups secondary links under one label. */
export interface NavGroup {
  label: string
  links: NavLink[]
}

export type NavItem = NavLink | NavGroup

export type SocialIcon =
  | 'instagram'
  | 'facebook'
  | 'tiktok'
  | 'youtube'
  | 'whatsapp'

export interface SocialLink {
  label: string
  href: string
  icon: SocialIcon
}

export type IconName =
  | 'camera'
  | 'heart'
  | 'users'
  | 'calendar'
  | 'package'
  | 'graduation'
  | 'sparkles'
  | 'star'
  | 'check'
  | 'arrow-right'
  | 'award'
  | 'clock'
  | 'image'
  | 'menu'
  | 'close'
  | 'chevron-down'
  | 'quote'

export interface ImageAsset {
  src: string
  fallbackLabel: string
}

export interface IntroConfig {
  /** Short clip shown behind the intro copy. Lives in `public/` so it ships with the template. */
  videoSrc: string
  /** When true the intro plays only once per browser session (saves re-downloading the clip). */
  oncePerSession: boolean
}

export interface SiteConfig {
  businessName: string
  shortName: string
  tagline: string
  description: string
  motion: MotionMode
  intro: IntroConfig
  whatsappNumber: string
  whatsappDefaultMessage: string
  email: string
  phoneDisplay: string
  address: string
  mapsUrl: string
  businessHours: string
  navLinks: NavItem[]
  socials: SocialLink[]
  showWhatsAppFab: boolean
}

export interface HeroContent {
  eyebrow: string
  headline: string
  description: string
  primaryCta: { label: string; targetSectionId: SectionId }
  secondaryCta: { label: string }
  image: ImageAsset
  imageAlt: string
  stats: { value: string; label: string }[]
}

export interface AboutContent {
  eyebrow: string
  heading: string
  paragraphs: string[]
  experienceYears: number
  image: ImageAsset
  imageAlt: string
  advantages: { title: string; description: string; icon: IconName }[]
}

export interface Service {
  id: string
  title: string
  description: string
  icon: IconName
  startingPrice?: string
}

export interface PortfolioCategory {
  id: string
  label: string
}

export interface PortfolioItem {
  id: string
  title: string
  categoryId: string
  image: ImageAsset
  alt: string
}

export interface PricingPackage {
  id: string
  name: string
  price: string
  priceNote?: string
  description: string
  features: string[]
  highlighted: boolean
  ctaLabel: string
}

export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  rating: 1 | 2 | 3 | 4 | 5
  avatar: ImageAsset
  avatarAlt: string
}

export interface ProcessStep {
  id: string
  title: string
  description: string
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}

export interface ClosingCta {
  heading: string
  description: string
  ctaLabel: string
}
