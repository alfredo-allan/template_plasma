'use client'

import { useState } from 'react'

import Header from './components/sections/Header'
import VideoLoading from './components/ui/VideoLoading'
import PlasmaMediaSection from './components/sections/PlasmaMediaSection'
import DivisionBanner from './components/ui/DivisionBanner'
import Footer from './components/sections/Footer'
import ScrollFrameAnimation from './components/ui/ScrollFrameAnimation'

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  if (isLoading) {
    return <VideoLoading onComplete={() => setIsLoading(false)} zoom={1.35} />
  }

  return (
    <main className="bg-black text-white overflow-x-hidden">
      {/* 1️⃣ SCROLL FRAME ANIMATION */}
      <ScrollFrameAnimation />

      {/* 2️⃣ HERO */}
      <section className="relative z-10">
        <Header />
      </section>

      {/* 3️⃣ CLAIM / RESPIRO */}
      <section className="relative z-10 bg-black flex items-center justify-center h-[30svh] md:h-[60svh]">
        {/* conteúdo do claim depois */}
      </section>

      {/* 4️⃣ BRANDING LOOP */}
      <section className="relative z-10">
        <DivisionBanner />
      </section>

      {/* 5️⃣ MEDIA */}
      <section className="relative z-10">
        <PlasmaMediaSection />
      </section>

      {/* 6️⃣ FOOTER */}
      <Footer />
    </main>
  )
}
