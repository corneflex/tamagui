'use client'

import { StylesProvider } from './styles-provider'
import './globals.css'

import { TamaguiProvider } from './TamaguiProvider'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <StylesProvider>
          <TamaguiProvider>{children}</TamaguiProvider>
        </StylesProvider>
      </body>
    </html>
  )
}
