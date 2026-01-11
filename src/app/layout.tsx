import type { Metadata } from 'next'
import { Archivo_Black } from 'next/font/google'
import './globals.css'
import LoadingProvider from './providers/LoadingProvider'

const archivoBlack = Archivo_Black({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-archivo-black'
})

export const metadata: Metadata = {
  title: 'Plasma | Evolution',
  description: 'Advanced Branding Experience'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className={archivoBlack.variable}>
      <body className="antialiased">
        <LoadingProvider>
          {children} {/* O LoadingProvider é quem recebe as children */}
        </LoadingProvider>
      </body>
    </html>
  )
}
