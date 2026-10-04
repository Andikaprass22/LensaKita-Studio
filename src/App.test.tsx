import { render, screen } from '@testing-library/react'
import App from './App'
import { siteConfig } from './lib/data'

const sectionIds = [
  'home',
  'about',
  'services',
  'portfolio',
  'pricing',
  'testimonials',
  'process',
  'faq',
  'contact',
]

it('renders the page landmarks and the business name', () => {
  render(<App />)

  expect(screen.getByRole('banner')).toBeInTheDocument()
  expect(screen.getByRole('main')).toBeInTheDocument()
  expect(screen.getByRole('contentinfo')).toBeInTheDocument()
  expect(
    screen.getAllByText(new RegExp(siteConfig.businessName, 'i')).length,
  ).toBeGreaterThan(0)
})

it('renders every content section', () => {
  render(<App />)

  for (const id of sectionIds) {
    expect(document.getElementById(id), `missing section #${id}`).not.toBeNull()
  }
})

it('renders a single h1 heading', () => {
  render(<App />)

  expect(screen.getAllByRole('heading', { level: 1 })).toHaveLength(1)
})
