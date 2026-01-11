'use client'

import { useState, useEffect } from 'react'

export function useVideoTransition(initialDelay = 1000) {
  const [showVideo, setShowVideo] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowVideo(true)
    }, initialDelay)

    return () => clearTimeout(timer)
  }, [initialDelay])

  const handleComplete = () => {
    setIsComplete(true)
    setShowVideo(false)
  }

  return {
    showVideo,
    isComplete,
    handleComplete
  }
}
