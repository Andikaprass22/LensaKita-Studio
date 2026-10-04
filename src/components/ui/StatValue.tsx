import { useCountUp } from '../../hooks/useCountUp'

interface StatValueProps {
  value: string
  className?: string
  duration?: number
}

const NUMBER_PATTERN = /^(\d+)(?:[.,](\d+))?(.*)$/

export function StatValue({
  value,
  className,
  duration = 1600,
}: StatValueProps) {
  const match = value.match(NUMBER_PATTERN)

  const decimals = match?.[2]?.length ?? 0
  const separator = value.includes(',') ? ',' : '.'
  const target = match ? Number(`${match[1]}.${match[2] ?? '0'}`) : 0
  const suffix = match?.[3] ?? ''

  const animated = useCountUp(target, {
    duration,
    enabled: match !== null,
  })

  const display = match
    ? decimals > 0
      ? animated.toFixed(decimals).replace('.', separator)
      : String(Math.round(animated))
    : value

  return (
    <span className={className} data-testid="stat-value">
      {display}
      {match ? suffix : ''}
    </span>
  )
}
