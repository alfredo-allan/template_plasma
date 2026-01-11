'use client'

export default function PlasmaInstitutionalText() {
  return (
    <div className="w-full text-white space-y-6">
      {/* TÍTULO + BRAND */}
      <div className="flex items-center gap-4">
        <img src="/content_logo_header.png" alt="Plasma Footwear" className="w-10 h-10 object-contain" />

        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          <span style={{ color: 'var(--brand)' }}>PLASMA FOOTWEAR</span>
          <span className="text-white/80"> | RESSURGIMENTO 2026</span>
        </h2>
      </div>

      {/* TEXTO INSTITUCIONAL */}
      <div className="space-y-4 text-white/80 leading-relaxed text-sm md:text-base">
        <p>
          <span className="font-semibold text-white" style={{ color: 'var(--brand)' }}>
            Herança Streetwear:
          </span>{' '}
          Fundada em 2001, retornamos ao mercado resgatando a robustez e o design icônico (Sonda, Eletro, Band-Aid) que nos tornaram itens
          de colecionador.
        </p>

        <p>
          <span className="font-semibold text-white" style={{ color: 'var(--brand)' }}>
            DNA de Skate:
          </span>{' '}
          Criada por skatistas para skatistas, focada em materiais ultra-resistentes que suportam o uso extremo.
        </p>

        <p>
          <span className="font-semibold text-white" style={{ color: 'var(--brand)' }}>
            Ciência de Ponta:
          </span>{' '}
          Em 2026, integramos o Plasma Frio em nossa produção — um processo que ativa quimicamente as fibras para uma colagem de solados e
          pigmentação de elite.
        </p>

        <p>
          <span className="font-semibold text-white" style={{ color: 'var(--brand)' }}>
            Sustentabilidade Radical:
          </span>{' '}
          Substituímos primers químicos e lavagens poluentes por tecnologia de plasma, reduzindo o impacto ambiental sem sacrificar a
          durabilidade.
        </p>

        <p>
          <span className="font-semibold text-white" style={{ color: 'var(--brand)' }}>
            Performance Molecular:
          </span>{' '}
          Nossa nova linha não é apenas montada; ela é fundida em nível microscópico para garantir a maior vida útil do mercado nacional.
        </p>
      </div>
    </div>
  )
}
