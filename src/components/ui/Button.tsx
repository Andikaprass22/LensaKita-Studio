import type { MouseEvent, ReactNode } from 'react'
import type { IconName, SocialIcon } from '../../lib/types'
import { Icon } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'md' | 'lg'

interface ButtonProps {
  children: ReactNode
  variant?: Variant
  size?: Size
  icon?: IconName | SocialIcon
  href?: string
  external?: boolean
  onClick?: (event: MouseEvent<HTMLElement>) => void
  className?: string
  ariaLabel?: string
}

const base =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-400'

const variants: Record<Variant, string> = {
  primary: 'bg-brand-500 text-ink-950 hover:bg-brand-400 active:bg-brand-600',
  secondary:
    'border border-ink-600 text-ink-100 hover:border-brand-400 hover:text-brand-300',
  ghost: 'text-ink-200 hover:text-brand-300',
}

const sizes: Record<Size, string> = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  href,
  external = false,
  onClick,
  className = '',
  ariaLabel,
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${sizes[size]} ${className}`.trim()
  const content = (
    <>
      {children}
      {icon ? <Icon name={icon} className="h-4 w-4" /> : null}
    </>
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        aria-label={ariaLabel}
        onClick={onClick}
        {...(external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : undefined)}
      >
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} aria-label={ariaLabel} onClick={onClick}>
      {content}
    </button>
  )
}
