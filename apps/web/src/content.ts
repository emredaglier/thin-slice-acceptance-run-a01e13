// All the text of the one page. Wording approved by the owner at G4; KvK and VAT ID are placeholders.

const email = 'hello@kilnandclay.example'
const address = 'Oudegracht 210, 3511 NS Utrecht, Netherlands'

export const content = {
  title: 'Kiln & Clay',
  hero: {
    name: 'Kiln & Clay',
    pitch: 'Slow weekends at the wheel in Utrecht.',
  },
  about: {
    heading: 'About',
    text: 'Kiln & Clay is a small pottery studio in Utrecht, run by potter Mira de Vries since 2019. Weekend wheel-throwing classes are taught in small groups of six. All clay, glazes and two firings are included. Beginners are welcome.',
  },
  classes: {
    heading: 'Classes',
    items: [
      { name: 'Taster Wheel Session', length: '2 hours', price: '€45' },
      { name: 'Weekend Wheel Course', length: 'two days of 4 hours', price: '€180' },
      { name: 'Glaze & Fire Workshop', length: '3 hours', price: '€60' },
    ],
    note: 'Prices include VAT.',
  },
  contact: {
    heading: 'Contact',
    email,
    address,
  },
  footer: {
    owner: 'Kiln & Clay, Mira de Vries (sole trader)',
    address,
    email,
    kvk: 'KvK 00000000',
    vatId: 'VAT ID NL000000000B00',
    privacy:
      'Privacy: This site sets no cookies, uses no analytics and loads no content from third parties. The data controller is Kiln & Clay, Mira de Vries, at the address above.',
  },
}
