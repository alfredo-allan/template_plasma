'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const DESKTOP_FRAMES = 200
const MOBILE_FRAMES = 90

export default function ScrollCanvasSequence() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const isMobile = window.innerWidth < 768
    const TOTAL_FRAMES = isMobile ? MOBILE_FRAMES : DESKTOP_FRAMES

    const images: HTMLImageElement[] = []
    const state = { frame: 0 }

    /* ------------------------------
       RESIZE — FULL + DPR CORRETO
    ------------------------------ */
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const vw = window.innerWidth
      const vh = window.innerHeight

      canvas.width = vw * dpr
      canvas.height = vh * dpr
      canvas.style.width = `${vw}px`
      canvas.style.height = `${vh}px`

      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      render()
      ScrollTrigger.refresh()
    }

    /* ------------------------------
       PRELOAD
    ------------------------------ */
    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image()
      img.src = `/gif/ezgif-frame-${String(i).padStart(3, '0')}.jpg`
      images.push(img)
    }

    /* ------------------------------
       RENDER — DESKTOP vs MOBILE
    ------------------------------ */
    const render = () => {
      const img = images[state.frame]
      if (!img || !img.complete) return

      const cw = window.innerWidth
      const ch = window.innerHeight
      const iw = img.width
      const ih = img.height

      const isMobile = cw < 768

      let scale: number

      if (isMobile) {
        // 🔥 Mobile: escala pela largura (melhor pra 16:9)
        scale = cw / iw

        // Evita ficar pequeno demais em telas muito altas
        const maxScale = ch / ih
        scale = Math.min(scale * 1.05, maxScale)
      } else {
        // Desktop: cover normal
        scale = Math.max(cw / iw, ch / ih)
      }

      const x = (cw - iw * scale) / 2

      // 🔥 Bias vertical (sobe um pouco a imagem)
      const y = (ch - ih * scale) / 2 - (isMobile ? ch * 0.06 : 0)

      ctx.clearRect(0, 0, cw, ch)
      ctx.drawImage(img, x, y, iw * scale, ih * scale)
    }

    images[0].onload = render

    resize()
    window.addEventListener('resize', resize)

    /* ------------------------------
       GSAP SCROLL
    ------------------------------ */
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: `+=${TOTAL_FRAMES * (isMobile ? 16 : 22)}`,
      scrub: true,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        state.frame = Math.min(TOTAL_FRAMES - 1, Math.floor(self.progress * TOTAL_FRAMES))
        render()
      }
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section ref={containerRef} className="relative w-full h-svh bg-black overflow-hidden top-[-4%]">
      {/* CANVAS */}
      <canvas ref={canvasRef} className="block relative z-0" />

      {/* VIGNETTE + GRAIN MASK */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {/* vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0)_45%,rgba(0,0,0,0.35)_100%)]" />

        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
          style={{
            backgroundImage: 'url(/noise.png)',
            backgroundRepeat: 'repeat'
          }}
        />
      </div>
    </section>
  )
}
