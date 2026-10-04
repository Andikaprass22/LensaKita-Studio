import { render, screen, waitFor } from '@testing-library/react'
import { StatValue } from './StatValue'

it('keeps the suffix while counting the numeric part', async () => {
  render(<StatValue value="500+" duration={80} />)

  await waitFor(
    () => expect(screen.getByTestId('stat-value').textContent).toBe('500+'),
    { timeout: 3000 },
  )
})

it('keeps a comma as the decimal separator', async () => {
  render(<StatValue value="4,9/5" duration={80} />)

  await waitFor(
    () => expect(screen.getByTestId('stat-value').textContent).toBe('4,9/5'),
    { timeout: 3000 },
  )
})

it('renders a value with no leading number unchanged', () => {
  render(<StatValue value="Segera" />)

  expect(screen.getByTestId('stat-value').textContent).toBe('Segera')
})
