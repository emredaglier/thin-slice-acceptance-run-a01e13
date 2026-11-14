// The ONLY place fonts are defined (ADR-0001). `src/fonts.test.ts` fails if `next/font` or
// `@font-face` is used anywhere else.
//
// Headings use Fraunces; body text uses the system sans stack (set in globals.css), no webfont.
import { Fraunces } from 'next/font/google'

// `next/font` downloads the file at build time and serves it from our own origin: the browser
// makes no request to Google. One weight and the Latin subset keep it to a single small file.
const fraunces = Fraunces({
  subsets: ['latin'],
  weight: '600',
  display: 'swap',
  variable: '--font-fraunces',
})

/** Class names for `<html>`: defines the font CSS variables. */
export const fontVariables = fraunces.variable
