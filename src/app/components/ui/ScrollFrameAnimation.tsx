'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_FRAMES = 200
const MOBILE_FRAMES = 40
const MOBILE_BREAKPOINT = 768

export default function ScrollCanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas?.getContext('2d')

    if (!canvas || !ctx || !container) return

    const isMobile = window.innerWidth < MOBILE_BREAKPOINT
    const TOTAL_FRAMES = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES
    const IMAGE_PATH = isMobile ? '/gif_mobile' : '/gif'

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
      const iw = img.width
      const ih = img.height

      let scale: number

      if (isMobile) {
        // ✅ Mobile = CONTAIN + leve zoom
        const containScale = Math.min(vw / iw, vh / ih)
        scale = containScale * 1.08 // ← ajuste fino (1.05 ~ 1.15)
      } else {
        // Desktop / tablet: cover padrão (como já estava bom)
        scale = Math.max(vw / iw, vh / ih)
      }

      const x = (vw - iw * scale) / 2

      // Mobile fixa no topo / desktop centraliza
      const y = isMobile ? 0 : (vh - ih * scale) / 2

      ctx.clearRect(0, 0, vw, vh)
      ctx.drawImage(img, x, y, iw * scale, ih * scale)
    }

    /* ==============================
       SCROLL
    ============================== */
    const SCROLL_DISTANCE = TOTAL_FRAMES * (isMobile ? 22 : 22)

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

    /* ==============================
       INIT
    ============================== */
    preload()
    resize()
    window.addEventListener('resize', resize)

    return () => {
      trigger.kill()
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-[200svh] bg-black overflow-hidden">
      <canvas ref={canvasRef} className="block relative z-0" />

      {/* overlays */}
      <div className="pointer-events-none absolute inset-0 z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.35)_100%)]" />
        <div className="absolute inset-0 opacity-[0.08] mix-blend-overlay" style={{ backgroundImage: 'url(/noise.png)' }} />
      </div>
    </section>
  )
}
