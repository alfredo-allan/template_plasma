'use client'

import { useState, useEffect } from 'react'

import Header from './components/sections/Header'
import VideoLoading from './components/ui/VideoLoading'
import PlasmaMediaSection from './components/sections/PlasmaMediaSection'
import DivisionBanner from './components/ui/DivisionBanner'
import Footer from './components/sections/Footer'
import ScrollFrameAnimation from './components/ui/ScrollFrameAnimation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!isLoading) {
      window.scrollTo(0, 0)
    }
  }, [isLoading])

  if (isLoading) {
    return <VideoLoading onComplete={() => setIsLoading(false)} zoom={1.35} />
  }

  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* 1️⃣ HERO ANIMATION */}
      <ScrollFrameAnimation />

      {/* 2️⃣ HEADER */}
      <section className="relative z-40">
        <Header />
      </section>

      {/* 3️⃣ CLAIM */}

      {/* 4️⃣ BRANDING */}
      <section className="relative z-30">
        <DivisionBanner />
      </section>

      {/* 5️⃣ MEDIA */}
      <section className="relative">
        <PlasmaMediaSection />
      </section>

      {/* 6️⃣ FOOTER */}
      <Footer />
    </main>
  )
}
