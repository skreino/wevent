import type { Metadata, Viewport } from 'next'
import { Bricolage_Grotesque, Space_Grotesk } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import MobileBottomNav from '@/components/layout/MobileBottomNav'

const display = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-display', display: 'swap' })
const body = Space_Grotesk({ subsets: ['latin'], variable: '--font-body', display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL('https://wevent.vercel.app'),
  title: 'wevent - Che si fa stasera?',
  description: 'Scopri serate, aperitivi, DJ set e live vicino a te.',
  icons: { icon: '/brand/wevent-logo.png' },
  openGraph: {
    title: 'wevent - Che si fa stasera?',
    description: 'Eventi locali, zero sbatti.',
    images: ['/brand/wevent-logo.png']
  }
}

export const viewport: Viewport = {
  themeColor: '#0A0A0A',
  width: 'device-width',
  initialScale: 1
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className={`${display.variable} ${body.variable}`}>
      <body className="font-body antialiased">
        <Header />
        {children}
        <MobileBottomNav />
      </body>
    </html>
  )
}
