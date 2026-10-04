import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { siteConfig } from '../../lib/data'
import { IntroReveal } from './IntroReveal'

it('holds the intro for the given duration once the clip can play', async () => {
  render(<IntroReveal duration={150} />)

  fireEvent.canPlay(screen.getByTestId('intro-video'))
  expect(screen.getByTestId('intro-reveal')).toBeInTheDocument()

  await waitFor(
    () => expect(screen.queryByTestId('intro-reveal')).not.toBeInTheDocument(),
    { timeout: 3000 },
  )
})

it('dismisses anyway when the clip never becomes playable', async () => {
  render(<IntroReveal duration={150} />)

  expect(screen.getByTestId('intro-reveal')).toBeInTheDocument()

  await waitFor(
    () => expect(screen.queryByTestId('intro-reveal')).not.toBeInTheDocument(),
    { timeout: 6000 },
  )
})

it('can be skipped by the user before it finishes', async () => {
  render(<IntroReveal duration={5000} />)

  fireEvent.click(screen.getByRole('button', { name: /lewati/i }))

  await waitFor(
    () => expect(screen.queryByTestId('intro-reveal')).not.toBeInTheDocument(),
    { timeout: 3000 },
  )
})

it('plays the configured clip with autoplay-safe attributes', () => {
  render(<IntroReveal duration={5000} />)

  const video = screen.getByTestId('intro-video') as HTMLVideoElement

  expect(video.getAttribute('src')).toBe(siteConfig.intro.videoSrc)
  expect(video.autoplay).toBe(true)
  expect(video.muted).toBe(true)
  expect(video.loop).toBe(true)
})

it('falls back to the plain intro when the clip cannot load', () => {
  render(<IntroReveal duration={5000} />)

  fireEvent.error(screen.getByTestId('intro-video'))

  expect(screen.queryByTestId('intro-video')).not.toBeInTheDocument()
  expect(screen.getByTestId('intro-reveal')).toBeInTheDocument()
})
