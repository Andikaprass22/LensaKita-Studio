import { describe, it, expect } from 'vitest'
import { normalizeWhatsAppNumber, buildWhatsAppUrl } from './whatsapp'

describe('normalizeWhatsAppNumber', () => {
  it('strips +, spaces, dashes and parentheses', () => {
    expect(normalizeWhatsAppNumber('+62 812-3456-7890')).toBe('6281234567890')
  })

  it('strips parentheses', () => {
    expect(normalizeWhatsAppNumber('(0812) 3456 7890')).toBe('6281234567890')
  })

  it('converts a leading 0 to 62', () => {
    expect(normalizeWhatsAppNumber('081234567890')).toBe('6281234567890')
  })

  it('leaves an already normalized number unchanged', () => {
    expect(normalizeWhatsAppNumber('6281234567890')).toBe('6281234567890')
  })
})

describe('buildWhatsAppUrl', () => {
  it('returns a bare wa.me url when no message is given', () => {
    expect(buildWhatsAppUrl('6281234567890')).toBe(
      'https://wa.me/6281234567890',
    )
  })

  it('returns a bare wa.me url for an empty or whitespace message', () => {
    expect(buildWhatsAppUrl('6281234567890', '   ')).toBe(
      'https://wa.me/6281234567890',
    )
  })

  it('normalizes the number and encodes the message', () => {
    expect(buildWhatsAppUrl('+62 812-3456-7890', 'Halo LensaKita!')).toBe(
      'https://wa.me/6281234567890?text=Halo%20LensaKita!',
    )
  })

  it('encodes characters that would break a query string', () => {
    expect(buildWhatsAppUrl('6281234567890', 'Paket A & B?')).toBe(
      'https://wa.me/6281234567890?text=Paket%20A%20%26%20B%3F',
    )
  })
})
