'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import VideoLoading from '../components/ui/VideoLoading'

export default function LoadingProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const pathname = usePathname()

  // Loading inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 6500) // 6.5 segundos (6s vídeo + 0.5s margem)

    return () => clearTimeout(timer)
  }, [])

  // Mostrar loading ao mudar de página
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 6500)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <>
      {/* Vídeo de loading (não recebe children) */}
      {isLoading && <VideoLoading onComplete={() => setIsLoading(false)} />}

      {/* Conteúdo principal (aparece depois do loading) */}
      <div className={isLoading ? 'opacity-0' : 'opacity-100 transition-opacity duration-500'}>{children}</div>
    </>
  )
}
