import { render, screen, waitFor } from '@testing-library/react'
import { useCountUp } from './useCountUp'

function Probe({ target, duration }: { target: number; duration: number }) {
  const value = useCountUp(target, { duration })
  return <span data-testid="value">{value}</span>
}

it('counts up from zero to the target value', async () => {
  render(<Probe target={500} duration={120} />)

  expect(screen.getByTestId('value').textContent).toBe('0')

  await waitFor(
    () => expect(screen.getByTestId('value').textContent).toBe('500'),
    { timeout: 3000 },
  )
})

it('returns zero and does not animate while disabled', async () => {
  function DisabledProbe() {
    const value = useCountUp(500, { duration: 60, enabled: false })
    return <span data-testid="value">{value}</span>
  }

  render(<DisabledProbe />)

  await new Promise((resolve) => setTimeout(resolve, 200))
  expect(screen.getByTestId('value').textContent).toBe('0')
})
