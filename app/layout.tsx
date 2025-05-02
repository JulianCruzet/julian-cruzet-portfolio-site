import type { Metadata } from 'next'
import { NTR } from 'next/font/google'
import './globals.css'

const ntr = NTR({ 
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: "Julian Cruzet's Portfolio Website",
  description: 'A portfolio website showcasing my work and projects.',
  generator: 'JULIAN CRUZET',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={ntr.className}>{children}</body>
    </html>
  )
}
