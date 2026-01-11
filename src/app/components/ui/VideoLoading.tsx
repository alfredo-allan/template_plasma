'use client'

import { useEffect, useRef, useState } from 'react'

interface VideoLoadingProps {
  show?: boolean
  onComplete?: () => void
  zoom?: number
  boxSize?: 'small' | 'medium' | 'large' | 'fullscreen' | 'custom'
  customWidth?: string
  customHeight?: string
  radius?: number
}

export default function VideoLoading({
  show = true,
  onComplete,
  zoom = 1.3,
  boxSize = 'medium',
  customWidth = '320px',
  customHeight = '480px',
  radius = 120
}: VideoLoadingProps) {
  const [visible, setVisible] = useState(show)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (!show) {
      setVisible(false)
      return
    }

    setVisible(true)

    const timer = setTimeout(() => {
      videoRef.current?.currentTime && (videoRef.current.currentTime = 0)
      videoRef.current?.play().catch(() => {
        setTimeout(handleComplete, 6000)
      })
    }, 100)

    return () => {
      clearTimeout(timer)
      videoRef.current?.pause()
    }
  }, [show])

  const handleComplete = () => {
    setVisible(false)
    onComplete?.()
  }

  const getBoxSize = () => {
    switch (boxSize) {
      case 'small':
        return 'w-46 h-56' // ↓ menor
      case 'medium':
        return 'w-[200px] h-[260px]' // ↓ menor
      case 'large':
        return 'w-[240px] h-[240px]' // ↓ menor
      case 'fullscreen':
        return 'w-full h-full'
      case 'custom':
        return ''
      default:
        return 'w-[280px] h-[280px]'
    }
  }

  if (!visible) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
      {/* BOX DO VÍDEO */}
      <div
        className={`
      relative bg-black overflow-hidden rounded-full
      ${boxSize !== 'custom' ? getBoxSize() : ''}
    `}
        style={boxSize === 'custom' ? { width: customWidth, height: customHeight } : undefined}>
        {/* VÍDEO */}
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          onEnded={handleComplete}
          onError={() => setTimeout(handleComplete, 6000)}
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'center'
          }}>
          <source src="/loading_plasma.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  )
}
