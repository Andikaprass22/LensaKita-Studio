import { describe, it, expect } from 'vitest'
import * as data from './data'
import { navSectionIds } from './nav'

const collections = {
  services: data.services,
  portfolioCategories: data.portfolioCategories,
  portfolioItems: data.portfolioItems,
  pricingPackages: data.pricingPackages,
  testimonials: data.testimonials,
  processSteps: data.processSteps,
  faqItems: data.faqItems,
}

describe('content integrity', () => {
  it('every collection is non-empty', () => {
    for (const [name, list] of Object.entries(collections)) {
      expect(list.length, `${name} must not be empty`).toBeGreaterThan(0)
    }
  })

  it('ids are unique within each collection', () => {
    for (const [name, list] of Object.entries(collections)) {
      const ids = list.map((item) => item.id)
      expect(new Set(ids).size, `${name} has duplicate ids`).toBe(ids.length)
    }
  })

  it('whatsapp number is a valid international number', () => {
    expect(data.siteConfig.whatsappNumber).toMatch(/^62\d{8,13}$/)
  })

  it('every portfolio item references an existing category', () => {
    const known = new Set(data.portfolioCategories.map((category) => category.id))
    for (const item of data.portfolioItems) {
      expect(known.has(item.categoryId), `unknown category ${item.categoryId}`).toBe(
        true,
      )
    }
  })

  it('every nav link points to a real section id', () => {
    const sectionIds = new Set([
      'home',
      'about',
      'services',
      'portfolio',
      'pricing',
      'testimonials',
      'process',
      'faq',
      'contact',
    ])
    for (const id of navSectionIds(data.siteConfig.navLinks)) {
      expect(sectionIds.has(id), `bad section ${id}`).toBe(true)
    }
  })

  it('contains no placeholder text or empty links', () => {
    const dump = JSON.stringify(data).toLowerCase()
    for (const bad of ['lorem', 'todo', 'placeholder', 'xxx', 'tbd']) {
      expect(dump.includes(bad), `found placeholder: ${bad}`).toBe(false)
    }
    expect(dump.includes('href="#"')).toBe(false)
  })

  it('every required string field is filled', () => {
    expect(data.siteConfig.businessName.trim().length).toBeGreaterThan(0)
    expect(data.siteConfig.email).toMatch(/@/)
    expect(data.hero.headline.trim().length).toBeGreaterThan(0)
    expect(data.about.paragraphs.length).toBeGreaterThan(0)
    expect(data.closingCta.heading.trim().length).toBeGreaterThan(0)
  })
})
