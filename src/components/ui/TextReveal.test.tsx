import { render, screen } from '@testing-library/react'
import { TextReveal } from './TextReveal'

it('renders every word of the text, in order, as readable text', () => {
  render(<TextReveal text="Momen berharga dikenang selamanya" />)

  const element = screen.getByTestId('text-reveal')
  const normalized = (element.textContent ?? '').replace(/\s+/g, ' ').trim()

  expect(normalized).toBe('Momen berharga dikenang selamanya')
})

it('keeps the whole sentence as a single accessible text node', () => {
  render(<TextReveal text="Fotografi profesional di Sekarteja" as="h2" />)

  expect(
    screen.getByRole('heading', { name: 'Fotografi profesional di Sekarteja' }),
  ).toBeInTheDocument()
})
