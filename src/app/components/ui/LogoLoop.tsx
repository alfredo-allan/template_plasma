'use client'

import { useEffect, useRef } from 'react'
import clsx from 'clsx'

type LogoItem =
  | {
      node: React.ReactNode
      title?: string
      href?: string
    }
  | {
      src: string
      alt: string
      href?: string
    }

type LogoLoopProps = {
  logos: LogoItem[]
  speed?: number
  direction?: 'left' | 'right'
  logoHeight?: number
  gap?: number
  hoverSpeed?: number
  scaleOnHover?: boolean
  fadeOut?: boolean
  fadeOutColor?: string
  ariaLabel?: string
}

export default function LogoLoop({
  logos,
  speed = 100,
  direction = 'left',
  logoHeight = 48,
  gap = 40,
  hoverSpeed = 0,
  scaleOnHover = false,
  fadeOut = false,
  fadeOutColor = '#000',
  ariaLabel
}: LogoLoopProps) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const duration = `${speed}s`
    track.style.animationDuration = duration
  }, [speed])

  return (
    <div className="relative w-full overflow-hidden" aria-label={ariaLabel}>
      {/* Fade */}
      {fadeOut && (
        <>
          <div
            className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24"
            style={{
              background: `linear-gradient(to right, ${fadeOutColor}, transparent)`
            }}
          />
          <div
            className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24"
            style={{
              background: `linear-gradient(to left, ${fadeOutColor}, transparent)`
            }}
          />
        </>
      )}

      {/* Track */}
      <div
        ref={trackRef}
        className={clsx('flex w-max items-center', direction === 'left' ? 'animate-loop-left' : 'animate-loop-right')}
        style={{ gap }}>
        {[...logos, ...logos].map((logo, i) => {
          const content =
            'node' in logo ? logo.node : <img src={logo.src} alt={logo.alt} style={{ height: logoHeight }} className="object-contain" />

          const inner = (
            <div
              className={clsx('flex items-center justify-center transition-transform', scaleOnHover && 'hover:scale-110')}
              style={{ height: logoHeight }}>
              {content}
            </div>
          )

          return (
            <div key={i} className="flex items-center">
              {logo.href ? (
                <a href={logo.href} target="_blank" rel="noreferrer" className="text-white/80 hover:text-[var(--brand)]">
                  {inner}
                </a>
              ) : (
                inner
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
