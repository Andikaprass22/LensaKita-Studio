import { render, screen } from '@testing-library/react'
import { afterEach } from 'vitest'
import { siteConfig } from '../lib/data'
import { usePrefersMotion } from './usePrefersMotion'

const originalMotion = siteConfig.motion
const originalMatchMedia = window.matchMedia

function Probe() {
  const prefersMotion = usePrefersMotion()
  return <span data-testid="prefers">{String(prefersMotion)}</span>
}

function setSystemReducedMotion(reduced: boolean) {
  window.matchMedia = ((query: string) => ({
    matches: reduced && query.includes('prefers-reduced-motion'),
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  })) as unknown as typeof window.matchMedia
}

afterEach(() => {
  siteConfig.motion = originalMotion
  window.matchMedia = originalMatchMedia
})

it('defers to the system preference in "auto" mode', () => {
  siteConfig.motion = 'auto'
  setSystemReducedMotion(true)
  render(<Probe />)
  expect(screen.getByTestId('prefers').textContent).toBe('false')
})

it('overrides the system preference to "full"', () => {
  siteConfig.motion = 'full'
  setSystemReducedMotion(true)
  render(<Probe />)
  expect(screen.getByTestId('prefers').textContent).toBe('true')
})

it('forces reduced motion even when the system allows it', () => {
  siteConfig.motion = 'reduced'
  setSystemReducedMotion(false)
  render(<Probe />)
  expect(screen.getByTestId('prefers').textContent).toBe('false')
})
