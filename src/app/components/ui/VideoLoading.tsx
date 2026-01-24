'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoLoadingProps {
  show?: boolean
  onComplete?: () => void
  zoom?: number
  fallbackDuration?: number
}

export default function VideoLoading({ show = true, onComplete, zoom = 0.5, fallbackDuration = 1000 }: VideoLoadingProps) {
  const [visible, setVisible] = useState(show)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!show) {
      setVisible(false)
      return
    }

    setVisible(true)

    const timer = setTimeout(() => {
      if (!videoRef.current) return

      videoRef.current.currentTime = 0
      videoRef.current.play().catch(() => {
        setTimeout(handleComplete, fallbackDuration)
      })
    }, 80)

    return () => {
      clearTimeout(timer)
      videoRef.current?.pause()
    }
  }, [show])

  const handleComplete = () => {
    setVisible(false)
    onComplete?.()
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-9999 bg-black flex items-center justify-center">
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleComplete}
        onError={() => setTimeout(handleComplete, fallbackDuration)}
        className="
          object-contain
          w-70 h-90
          sm:w-80 sm:h-105
          md:w-95 md:h-125
          lg:w-95 lg:h-125"
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: 'center'
        }}>
        <source src="/loading_plasma.mp4" type="video/mp4" />
      </video>
    </div>
  )
}
