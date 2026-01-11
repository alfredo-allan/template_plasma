'use client'

type SectionDividerProps = {
  topSpace?: number
  bottomSpace?: number
  height?: number
}

export default function SectionDivider({ topSpace = 150, bottomSpace = 150, height = 280 }: SectionDividerProps) {
  return (
    <section className="w-full bg-black">
      {/* espaço superior */}
      <div style={{ height: topSpace }} />

      {/* banner */}
      <div
        className="w-full bg-center bg-no-repeat bg-cover"
        style={{
          height: `${height}px`,
          backgroundImage: 'url(/division_banner.png)'
        }}
      />

      {/* espaço inferior */}
      <div style={{ height: bottomSpace }} />
    </section>
  )
}
