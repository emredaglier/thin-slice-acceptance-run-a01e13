import { renderToStaticMarkup } from 'react-dom/server'
import { expect, it } from 'vitest'

import Home, { metadata } from './page'

const html = () => renderToStaticMarkup(Home())

it('renders the content as plain server HTML, so it needs no JavaScript', () => {
  const out = html()
  expect(out.match(/<h1/g)).toHaveLength(1)
  expect(out.match(/<h2/g)).toHaveLength(3)
  expect(out).toContain('<main')
  expect(out).toContain('id="main"')
  expect(out).toContain('Slow weekends at the wheel in Utrecht.')
  expect(out).toContain('run by potter Mira de Vries since 2019')
})

it('lists the three classes with their prices, and the VAT line', () => {
  const out = html()
  expect(out).toMatch(/<ul>(<li>.*<\/li>){3}<\/ul>/)
  expect(out).toContain('Taster Wheel Session: 2 hours, €45')
  expect(out).toContain('Weekend Wheel Course: two days of 4 hours, €180')
  expect(out).toContain('Glaze &amp; Fire Workshop: 3 hours, €60')
  expect(out).toContain('Prices include VAT.')
})

it('gives the contact as a mailto link and the address in an address element', () => {
  const out = html()
  expect(out).toContain('<a href="mailto:hello@kilnandclay.example">hello@kilnandclay.example</a>')
  expect(out).toMatch(/<address[^>]*>.*Oudegracht 210, 3511 NS Utrecht, Netherlands.*<\/address>/)
})

it('puts the legal block and the privacy note in the footer', () => {
  const footer = html().split('<footer')[1] ?? ''
  expect(footer).toContain('Kiln &amp; Clay, Mira de Vries (sole trader)')
  expect(footer).toContain('KvK 00000000')
  expect(footer).toContain('VAT ID NL000000000B00')
  expect(footer).toContain('Privacy: This site sets no cookies, uses no analytics')
})

it('sets the title and the pitch as the description', () => {
  expect(metadata).toEqual({
    title: 'Kiln & Clay',
    description: 'Slow weekends at the wheel in Utrecht.',
  })
})
