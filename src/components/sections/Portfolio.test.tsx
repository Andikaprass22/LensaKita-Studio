import { render, screen, fireEvent } from '@testing-library/react'
import { portfolioCategories, portfolioItems } from '../../lib/data'
import { Portfolio } from './Portfolio'

const visibleItems = () => screen.getAllByTestId('portfolio-item')

it('renders every portfolio item by default', () => {
  render(<Portfolio />)

  expect(visibleItems()).toHaveLength(portfolioItems.length)
  expect(screen.getByRole('button', { name: 'Semua' })).toHaveAttribute(
    'aria-pressed',
    'true',
  )
})

it('filters to a single category and restores all on "Semua"', () => {
  render(<Portfolio />)

  const category = portfolioCategories.find((item) => item.id === 'wedding')
  const expected = portfolioItems.filter(
    (item) => item.categoryId === 'wedding',
  ).length
  expect(category).toBeDefined()
  expect(expected).toBeGreaterThan(0)

  fireEvent.click(screen.getByRole('button', { name: category!.label }))

  expect(visibleItems()).toHaveLength(expected)
  expect(
    visibleItems().every((item) => item.dataset.category === 'wedding'),
  ).toBe(true)

  fireEvent.click(screen.getByRole('button', { name: 'Semua' }))

  expect(visibleItems()).toHaveLength(portfolioItems.length)
})

it('does not render a filter button for a category with no items', () => {
  const withEmptyCategory = [
    ...portfolioCategories,
    { id: 'kategori-kosong', label: 'Kategori Kosong' },
  ]

  render(<Portfolio categories={withEmptyCategory} />)

  expect(
    screen.queryByRole('button', { name: 'Kategori Kosong' }),
  ).not.toBeInTheDocument()
  expect(screen.getByRole('button', { name: 'Semua' })).toBeInTheDocument()
})
