import { useState } from 'react'
import type { ImageAsset } from '../../lib/types'
import { Icon } from './Icon'

type Status = 'loading' | 'loaded' | 'error'

interface SmartImageProps {
  asset: ImageAsset
  alt: string
  aspect?: string
  className?: string
  imgClassName?: string
  priority?: boolean
}

export function SmartImage({
  asset,
  alt,
  aspect = 'aspect-[4/3]',
  className = '',
  imgClassName = '',
  priority = false,
}: SmartImageProps) {
  const [status, setStatus] = useState<Status>('loading')

  return (
    <div
      data-testid="smart-image"
      className={`relative overflow-hidden bg-ink-800 ${aspect} ${className}`.trim()}
    >
      {status !== 'error' ? (
        <img
          src={asset.src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setStatus('loaded')}
          onError={() => setStatus('error')}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          } ${imgClassName}`.trim()}
        />
      ) : null}

      {status === 'loading' ? (
        <div className="absolute inset-0 animate-pulse bg-ink-800" aria-hidden="true" />
      ) : null}

      {status === 'error' ? (
        <div
          data-testid="image-fallback"
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink-800 to-ink-950 px-4 text-center text-ink-400"
        >
          <Icon name="camera" className="h-8 w-8" />
          <span className="text-xs font-medium tracking-wide">
            {asset.fallbackLabel}
          </span>
        </div>
      ) : null}
    </div>
  )
}
