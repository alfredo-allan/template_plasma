'use client'

import LogoLoop from '../ui/LogoLoop'

const BRAND_LOGO = {
  src: '/logoloop.png',
  alt: 'Plasma Branding',
  href: '#'
}

// repete o mesmo logo várias vezes para loop infinito
const logos = Array.from({ length: 12 }, () => BRAND_LOGO)

export default function PlasmaVideoSection() {
  return (
    <div className="relative h-50 w-full overflow-hidden bg-black top-[-170vh] z-40">
      <LogoLoop
        logos={logos}
        speed={220} // 🔥 mais velocidade
        direction="left"
        logoHeight={150} // um pouco maior = mais presença
        gap={64}
        hoverSpeed={0}
        fadeOut
        fadeOutColor="#000000"
        ariaLabel="Plasma brand loop"
      />
    </div>
  )
}
