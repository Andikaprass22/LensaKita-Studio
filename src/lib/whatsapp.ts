export function normalizeWhatsAppNumber(input: string): string {
  const digits = input.replace(/[^\d]/g, '')
  return digits.startsWith('0') ? `62${digits.slice(1)}` : digits
}

export function buildWhatsAppUrl(number: string, message?: string): string {
  const base = `https://wa.me/${normalizeWhatsAppNumber(number)}`
  const text = message?.trim()
  return text ? `${base}?text=${encodeURIComponent(text)}` : base
}
