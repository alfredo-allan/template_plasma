'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/* ==============================
   CONFIG
============================== */
const TOTAL_FRAMES = 240
const DESKTOP_IMAGE_PATH = '/gif'

export default function ScrollFrameAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  /* ==============================
     DESKTOP → GSAP CANVAS
  ============================== */
  useEffect(() => {
    if (window.innerWidth < 768) return

    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx || !container) return

    const images: HTMLImageElement[] = []
    const state = { frame: 0 }

    /* ---------- resize ---------- */
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

    /* ---------- preload ---------- */
    const preload = () => {
      images.length = 0

      for (let i = 1; i <= TOTAL_FRAMES; i++) {
        const img = new Image()
        img.src = `${DESKTOP_IMAGE_PATH}/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
        images.push(img)
      }

      images[0].onload = render
    }

    /* ---------- render ---------- */
    const render = () => {
      const img = images[state.frame]
      if (!img || !img.complete) return

      const vw = window.innerWidth
      const vh = window.innerHeight

      const scale = Math.max(vw / img.width, vh / img.height)
      const w = img.width * scale
      const h = img.height * scale

      const x = (vw - w) / 2
      const y = (vh - h) / 2

      ctx.clearRect(0, 0, vw, vh)
      ctx.drawImage(img, x, y, w, h)
    }

    /* ---------- scroll ---------- */
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: 'top top',
      end: `+=${TOTAL_FRAMES * 22}`,
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
      {/* ==============================
          DESKTOP → SCROLL ANIMADO
      ============================== */}
      <section ref={containerRef} className="relative hidden md:block w-full h-[200svh] bg-black overflow-hidden isolation-isolate">
        <canvas ref={canvasRef} className="absolute inset-0 z-0" />

        {/* MASK DESKTOP */}
        <div className="pointer-events-none absolute inset-0 z-10">
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_50%,rgba(0,0,0,0.45)_100%)]" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)' }} />
        </div>
      </section>

      {/* ==============================
          MOBILE → VIDEO TOPO REAL
      ============================== */}
      <section className="md:hidden fixed -mt-85.5 left-0 w-full h-svh bg-black z-0">
        <video
          src="/Create_a_smooth.mp4"
          className="absolute top-0 left-0 w-full h-full object-contain z-0"
          muted
          playsInline
          autoPlay
          loop
        />
      </section>

      {/* ==============================
          MOBILE SPACER (libera scroll)
      ============================== */}
      <div className="md:hidden h-svh" />
    </>
  )
}
