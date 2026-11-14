import { colorVars, HEAD_SCRIPT } from '@kiln-and-clay/ui'
import { fontVariables } from '@kiln-and-clay/ui/fonts'
import type { Metadata } from 'next'
import type { CSSProperties, ReactNode } from 'react'

import './globals.css'
import { MotionFaultReporter } from './MotionFaultReporter'

export const metadata: Metadata = { title: 'Kiln & Clay' }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // data-js is set by the head script before first paint, so React must not complain that the
    // attribute differs from the server HTML.
    <html
      lang="en"
      className={fontVariables}
      style={colorVars as CSSProperties}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: HEAD_SCRIPT }} />
      </head>
      <body>
        <MotionFaultReporter />
        {children}
      </body>
    </html>
  )
}
