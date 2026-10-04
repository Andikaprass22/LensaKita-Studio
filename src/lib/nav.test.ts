import { describe, expect, it } from 'vitest'
import { flattenNavLinks, isNavGroup, navSectionIds } from './nav'
import type { NavItem } from './types'

const items: NavItem[] = [
  { label: 'Beranda', sectionId: 'home' },
  {
    label: 'Info',
    links: [
      { label: 'Testimoni', sectionId: 'testimonials' },
      { label: 'FAQ', sectionId: 'faq' },
    ],
  },
  { label: 'Kontak', sectionId: 'contact' },
]

describe('isNavGroup', () => {
  it('separates grouped entries from plain links', () => {
    expect(isNavGroup(items[0])).toBe(false)
    expect(isNavGroup(items[1])).toBe(true)
  })
})

describe('navSectionIds', () => {
  it('flattens plain links and grouped links into every section id', () => {
    expect(navSectionIds(items)).toEqual([
      'home',
      'testimonials',
      'faq',
      'contact',
    ])
  })

  it('returns an empty list for no items', () => {
    expect(navSectionIds([])).toEqual([])
  })
})

describe('flattenNavLinks', () => {
  it('keeps labels and section ids for grouped links', () => {
    expect(flattenNavLinks(items)).toEqual([
      { label: 'Beranda', sectionId: 'home' },
      { label: 'Testimoni', sectionId: 'testimonials' },
      { label: 'FAQ', sectionId: 'faq' },
      { label: 'Kontak', sectionId: 'contact' },
    ])
  })
})
