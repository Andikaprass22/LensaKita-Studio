import { render, screen } from '@testing-library/react'
import { processSteps } from '../../lib/data'
import { Process } from './Process'

it('renders each process step as a list item, not a bare div', () => {
  render(<Process />)

  const list = screen.getByRole('list')
  expect(list.children).toHaveLength(processSteps.length)

  for (const child of Array.from(list.children)) {
    expect(child.tagName).toBe('LI')
  }
})
