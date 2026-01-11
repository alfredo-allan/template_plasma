'use client'

import { useState } from 'react'
import { Play } from 'lucide-react'

type PlasmaVideoProps = {
  videoSrc?: string
  poster?: string
  rounded?: boolean
  className?: string
}

export default function PlasmaVideo({
  videoSrc = '/blank_plasma_video.mp4',
  poster = '/thumbnail.png',
  rounded = false,
  className = ''
}: PlasmaVideoProps) {
  const [play, setPlay] = useState(false)

  return (
    <div
      className={`
    relative w-full aspect-video overflow-hidden bg-black
    shadow-2xl
    ${rounded ? 'rounded-lg' : ''}
    ${className}
  `}>
      {!play ? (
        <>
          {/* Thumbnail */}
          <img src={poster} alt="Video preview" className="absolute inset-0 w-full h-full object-cover scale-[1.25]" />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={() => setPlay(true)}
              className="
                flex items-center justify-center
                w-16 h-16 md:w-20 md:h-20
                rounded-full
                backdrop-blur-md
                transition-all
                hover:scale-105
              "
              style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
              <Play size={32} className="ml-1" style={{ color: 'var(--brand)' }} />
            </button>
          </div>
        </>
      ) : (
        <video src={videoSrc} autoPlay muted playsInline preload="metadata" className="w-full h-full object-cover scale-[1.25]" />
      )}
    </div>
  )
}
