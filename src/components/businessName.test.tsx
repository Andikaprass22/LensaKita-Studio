import { render, screen } from '@testing-library/react'
import { afterEach } from 'vitest'
import { siteConfig } from '../lib/data'
import { Pricing } from './sections/Pricing'
import { Services } from './sections/Services'
import { WhatsAppFab } from './WhatsAppFab'

const originalName = siteConfig.businessName

afterEach(() => {
  siteConfig.businessName = originalName
})

it('builds service WhatsApp messages from the configured business name', () => {
  siteConfig.businessName = 'Studio Uji'
  render(<Services />)

  const link = screen.getAllByRole('link', { name: /tanya layanan ini/i })[0]
  const href = decodeURIComponent(link.getAttribute('href') ?? '')

  expect(href).toContain('Studio Uji')
})

it('builds package WhatsApp messages from the configured business name', () => {
  siteConfig.businessName = 'Studio Uji'
  render(<Pricing />)

  const link = screen.getAllByRole('link', { name: /tanya paket ini/i })[0]
  const href = decodeURIComponent(link.getAttribute('href') ?? '')

  expect(href).toContain('Studio Uji')
})

it('labels the WhatsApp button with the configured business name', () => {
  siteConfig.businessName = 'Studio Uji'
  render(<WhatsAppFab />)

  expect(
    screen.getByRole('link', { name: /studio uji/i }),
  ).toBeInTheDocument()
})
