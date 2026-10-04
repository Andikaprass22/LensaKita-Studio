import { render, screen, fireEvent } from '@testing-library/react'
import { SmartImage } from './SmartImage'

const asset = {
  src: 'https://example.invalid/hilang.jpg',
  fallbackLabel: 'Foto Studio',
}

it('shows the fallback label when the image fails to load', () => {
  render(<SmartImage asset={asset} alt="contoh" />)

  fireEvent.error(screen.getByRole('img'))

  expect(screen.getByText('Foto Studio')).toBeInTheDocument()
  expect(screen.queryByRole('img')).not.toBeInTheDocument()
})

it('reserves layout with a fixed aspect-ratio container', () => {
  render(<SmartImage asset={asset} alt="contoh" aspect="aspect-[4/3]" />)

  expect(screen.getByTestId('smart-image')).toHaveClass('aspect-[4/3]')
})
