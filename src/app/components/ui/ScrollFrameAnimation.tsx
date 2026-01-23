'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ==============================
   CONFIG
============================== */
const TOTAL_FRAMES = 240
const MOBILE_BREAKPOINT = 768

const MOBILE_IMAGE_WIDTH = 960
const MOBILE_IMAGE_HEIGHT = 540

export default function ScrollCanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx || !container) return

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT
    const IMAGE_PATH = isMobile ? '/teste_redimensionamento' : '/gif'

    const images: HTMLImageElement[] = []
    const state = { frame: 0 }

    /* ==============================
       RESIZE
    ============================== */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const vw = window.innerWidth
      const vh = window.innerHeight

      canvas.width = vw * dpr
      canvas.height = vh * dpr
      canvas.style.width = `${vw}px`
      canvas.style.height = `${vh}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      render()
      ScrollTrigger.refresh()
    }

    /* ==============================
       PRELOAD
    ============================== */
    const preload = () => {
      images.length = 0

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image()
        img.src = `${IMAGE_PATH}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
        images.push(img)
      }

      images[0].onload = render
    }

    /* ==============================
       RENDER
    ============================== */
    const render = () => {
      const img = images[state.frame]
      if (!img || !img.complete) return

      const vw = window.innerWidth
      const vh = window.innerHeight

      const iw = isMobile ? MOBILE_IMAGE_WIDTH : img.width
      const ih = isMobile ? MOBILE_IMAGE_HEIGHT : img.height

      let scale: number

      if (isMobile) {
        const containScale = Math.min(vw / iw, vh / ih)
        scale = containScale * 1.15
      } else {
        scale = Math.max(vw / iw, vh / ih)
      }

      const drawWidth = iw * scale
      const drawHeight = ih * scale

      const x = (vw - drawWidth) / 2
      const y = isMobile ? 0 : (vh - drawHeight) / 2

      ctx.clearRect(0, 0, vw, vh)
      ctx.drawImage(img, x, y, drawWidth, drawHeight)
    }

    /* ==============================
       SCROLL
    ============================== */
    const SCROLL_DISTANCE = TOTAL_FRAMES * 22

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${SCROLL_DISTANCE}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        state.frame = Math.min(TOTAL_FRAMES - 1, Math.round(self.progress * (TOTAL_FRAMES - 1)))
        render()
      }
    })

    preload()
    resize()
    window.addEventListener('resize', resize)

    return () => {
      trigger.kill()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <>
      {/* SCROLL ANIMATION */}
      <section ref={containerRef} className="relative w-full h-[200svh] bg-black overflow-hidden">
        <canvas ref={canvasRef} className="block relative z-0" />

        {/* overlays */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.35)_100%)]" />
          <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)' }} />
        </div>
      </section>

      {/* MOBILE CONTENT FIX (SEM BURACO) */}
      <section className="block md:hidden bg-black">
        <img src="/mobile_banner_content_header.png" alt="Mobile content" className="w-full h-auto block" />
      </section>
    </>
  )
}
