import { expect, it } from 'vitest'

import { contrast } from './contrast'
import { colors, colorVars } from './tokens'

type Name = keyof typeof colors

// [text or focus ring, background, minimum ratio]: 4.5 for text, 3 for the focus ring.
// The focus ring is clay, so the clay rows cover it too.
const pairs: [Name, Name, number][] = [
  ['ink', 'paper', 4.5],
  ['ink', 'sand', 4.5],
  ['ink-soft', 'paper', 4.5],
  ['ink-soft', 'sand', 4.5],
  ['clay', 'paper', 4.5],
  ['clay', 'sand', 4.5],
]

it.each(pairs)('%s on %s meets its minimum ratio', (fg, bg, min) => {
  expect(contrast(colors[fg], colors[bg])).toBeGreaterThanOrEqual(min)
})

it('computes 21:1 for black on white', () => {
  expect(contrast('#000000', '#ffffff')).toBeCloseTo(21, 5)
})

it('exposes each colour as a CSS custom property', () => {
  expect(colorVars['--ink-soft']).toBe(colors['ink-soft'])
})
