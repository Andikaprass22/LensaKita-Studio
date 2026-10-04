import { render } from '@testing-library/react'
import { hero } from '../../lib/data'
import { Hero } from './Hero'

it('does not crash when the hero stats list is empty', () => {
  const original = hero.stats
  hero.stats = []

  try {
    expect(() => render(<Hero />)).not.toThrow()
  } finally {
    hero.stats = original
  }
})
