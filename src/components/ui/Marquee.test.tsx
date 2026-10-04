import { render, screen } from '@testing-library/react'
import { Marquee } from './Marquee'

it('duplicates its items so the loop has no visible gap', () => {
  render(<Marquee items={['Pernikahan', 'Wisuda', 'Keluarga']} />)

  expect(screen.getAllByText('Pernikahan')).toHaveLength(2)
  expect(screen.getAllByText('Keluarga')).toHaveLength(2)
})

it('hides the duplicate track from assistive technology', () => {
  render(<Marquee items={['Pernikahan', 'Wisuda']} />)

  const hiddenTracks = screen
    .getAllByText('Pernikahan')
    .filter((node) => node.closest('[aria-hidden="true"]') !== null)

  expect(hiddenTracks).toHaveLength(1)
})
