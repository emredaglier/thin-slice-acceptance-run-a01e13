/** The look's colours: the one source. tokens.test.ts computes the contrast of every text pair. */
export const colors = {
  paper: '#faf6f0', // page background
  sand: '#f1e9df', // footer background
  ink: '#2b211c', // body text
  'ink-soft': '#5c4a40', // secondary text
  clay: '#8a3f21', // accent: links, focus ring, dividers (dark enough to pass as text)
} as const

/** The colours as CSS custom properties (`--paper`, ...) for `<html style>`; globals.css maps them to Tailwind. */
export const colorVars: Record<string, string> = Object.fromEntries(
  Object.entries(colors).map(([name, value]) => [`--${name}`, value]),
)
