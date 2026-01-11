'use client'

import PlasmaVideoSection from '../ui/PlasmaVideoSection'
import PlasmaInstitutionalText from '../ui/PlasmaInstitutionalText'

type PlasmaMediaSectionProps = {
  reverse?: boolean // permite inverter vídeo/texto no desktop
}

export default function PlasmaMediaSection({ reverse = false }: PlasmaMediaSectionProps) {
  return (
    <section className="w-full bg-black">
      <div
        className="
          mx-auto
          w-full
          max-w-350
          px-4 md:px-8
          py-16 md:py-24
        ">
        <div
          className={`
            grid grid-cols-1
            md:grid-cols-2
            gap-10 md:gap-16
            items-center
            ${reverse ? 'md:flex-row-reverse' : ''}
          `}>
          {/* VÍDEO */}
          <div className="w-full">
            <PlasmaVideoSection rounded />
          </div>

          {/* TEXTO */}
          <div className="w-full">
            <PlasmaInstitutionalText />
          </div>
        </div>
      </div>
    </section>
  )
}
