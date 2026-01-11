'use client'

import { useState } from 'react'

import Header from './components/sections/Header'
import VideoLoading from './components/ui/VideoLoading'
import PlasmaMediaSection from './components/sections/PlasmaMediaSection'
import DivisionBanner from './components/ui/DivisionBanner'
import Footer from './components/sections/Footer'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <VideoLoading onComplete={() => setIsLoading(false)} zoom={1.35} />
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* HERO */}
      <Header />

      {/* CLAIM */}
      <section className="relative z-10 py-24 text-center bg-black mt-[-50vh]"></section>

      {/* LOOP DE BRANDING / TECNOLOGIA */}
      <DivisionBanner />

      {/* MEDIA + TEXTO INSTITUCIONAL */}
      <PlasmaMediaSection />
      <Footer />
    </div>
  )
}
