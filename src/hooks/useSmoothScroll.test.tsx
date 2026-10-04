import { fireEvent, render, screen } from '@testing-library/react'
import { createRef } from 'react'
import type { RefObject } from 'react'
import type Lenis from 'lenis'
import { LenisRefContext } from '../lib/lenisContext'
import { useSmoothScroll } from './useSmoothScroll'

function Probe() {
  const scrollTo = useSmoothScroll()
  return (
    <button type="button" onClick={() => scrollTo('portfolio')}>
      go
    </button>
  )
}

function ensureSection(id: string) {
  if (document.getElementById(id)) return
  const section = document.createElement('section')
  section.id = id
  document.body.appendChild(section)
}

it('uses the Lenis instance with the header offset when Lenis is available', () => {
  ensureSection('portfolio')

  const lenisScrollTo = vi.fn()
  const ref: RefObject<Lenis | null> = createRef<Lenis | null>()
  ref.current = { scrollTo: lenisScrollTo } as unknown as Lenis

  render(
    <LenisRefContext.Provider value={ref}>
      <Probe />
    </LenisRefContext.Provider>,
  )

  fireEvent.click(screen.getByRole('button', { name: 'go' }))

  expect(lenisScrollTo).toHaveBeenCalledTimes(1)
  expect(lenisScrollTo.mock.calls[0]?.[1]).toEqual({
    offset: -72,
    duration: 1.2,
  })
})

it('falls back to scrollIntoView when Lenis is not available', () => {
  const section = document.getElementById('portfolio') ?? document.createElement('section')
  section.id = 'portfolio'
  if (!section.isConnected) document.body.appendChild(section)

  const scrollIntoView = vi.fn()
  section.scrollIntoView = scrollIntoView

  render(<Probe />)

  fireEvent.click(screen.getByRole('button', { name: 'go' }))

  expect(scrollIntoView).toHaveBeenCalledTimes(1)
})
