import { render, screen } from '@testing-library/react'
import { afterEach } from 'vitest'
import App from './App'
import { siteConfig } from './lib/data'

const originalMotion = siteConfig.motion
const originalMatchMedia = window.matchMedia

const reduceMotionMatchMedia = ((query: string) => ({
  matches: query.includes('prefers-reduced-motion'),
  media: query,
  onchange: null,
  addListener: () => {},
  removeListener: () => {},
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => false,
})) as unknown as typeof window.matchMedia

afterEach(() => {
  siteConfig.motion = originalMotion
  window.matchMedia = originalMatchMedia
})

it('motion "auto" skips the entrance animation when the OS asks to reduce', () => {
  siteConfig.motion = 'auto'
  window.matchMedia = reduceMotionMatchMedia

  render(<App />)

  const style =
    screen.getAllByTestId('portfolio-item')[0].getAttribute('style') ?? ''

  expect(style).toContain('opacity: 1')
  expect(style).not.toMatch(/scale\(/)
})

it('motion "full" plays the animation even when the OS asks to reduce', () => {
  siteConfig.motion = 'full'
  window.matchMedia = reduceMotionMatchMedia

  render(<App />)

  const style =
    screen.getAllByTestId('portfolio-item')[0].getAttribute('style') ?? ''

  expect(style).toMatch(/scale\(/)
})
