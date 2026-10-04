import { usePrefersMotion } from '../../hooks/usePrefersMotion'

interface MarqueeProps {
  items: string[]
  speedSeconds?: number
  className?: string
}

export function Marquee({
  items,
  speedSeconds = 30,
  className = '',
}: MarqueeProps) {
  const reduceMotion = !usePrefersMotion()

  return (
    <div className={`relative flex overflow-hidden ${className}`.trim()}>
      {[0, 1].map((track) => (
        <div
          key={track}
          aria-hidden={track === 1 ? 'true' : undefined}
          className="flex shrink-0 items-center"
          style={
            reduceMotion
              ? undefined
              : { animation: `marquee ${speedSeconds}s linear infinite` }
          }
        >
          {items.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center">
              <span className="whitespace-nowrap">{item}</span>
              <span aria-hidden="true" className="mx-6 text-brand-500">
                ✦
              </span>
            </span>
          ))}
        </div>
      ))}
    </div>
  )
}
