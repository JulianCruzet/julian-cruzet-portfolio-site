import type { Metadata } from 'next'
import { NTR } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
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
    <html lang="en" suppressHydrationWarning>
      <body className={ntr.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
