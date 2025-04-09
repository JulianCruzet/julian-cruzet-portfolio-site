import type { Metadata } from 'next'
import './globals.css'

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
      <body>{children}</body>
    </html>
  )
}
