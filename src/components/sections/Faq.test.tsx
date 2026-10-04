import { render, screen, fireEvent } from '@testing-library/react'
import { faqItems } from '../../lib/data'
import { Faq } from './Faq'

it('starts with every question collapsed', () => {
  render(<Faq />)

  for (const item of faqItems) {
    expect(
      screen.getByRole('button', { name: item.question }),
    ).toHaveAttribute('aria-expanded', 'false')
  }
})

it('toggles an answer open and closed via aria-expanded', () => {
  render(<Faq />)

  const button = screen.getByRole('button', { name: faqItems[0].question })
  expect(screen.queryByText(faqItems[0].answer)).not.toBeInTheDocument()

  fireEvent.click(button)

  expect(button).toHaveAttribute('aria-expanded', 'true')
  expect(screen.getByText(faqItems[0].answer)).toBeInTheDocument()

  fireEvent.click(button)

  expect(button).toHaveAttribute('aria-expanded', 'false')
  expect(screen.queryByText(faqItems[0].answer)).not.toBeInTheDocument()
})

it('closes a previously open question when another is opened', () => {
  render(<Faq />)

  const first = screen.getByRole('button', { name: faqItems[0].question })
  const second = screen.getByRole('button', { name: faqItems[1].question })

  fireEvent.click(first)
  fireEvent.click(second)

  expect(first).toHaveAttribute('aria-expanded', 'false')
  expect(second).toHaveAttribute('aria-expanded', 'true')
  expect(screen.queryByText(faqItems[0].answer)).not.toBeInTheDocument()
  expect(screen.getByText(faqItems[1].answer)).toBeInTheDocument()
})
