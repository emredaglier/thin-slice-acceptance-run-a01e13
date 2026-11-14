import type { Metadata } from 'next'

import { content } from '../content'

export const metadata: Metadata = {
  title: content.title,
  description: content.hero.pitch,
}

/** The one page. Plain server HTML from the content module, complete with JavaScript off (ADR-0008). */
export default function Home() {
  const { hero, about, classes, contact, footer } = content
  return (
    <>
      <main className="mx-auto max-w-2xl p-8" id="main">
        <h1 className="text-4xl font-semibold">{hero.name}</h1>
        <p className="mt-2 text-lg">{hero.pitch}</p>

        <section>
          <h2 className="mt-8 text-2xl font-semibold">{about.heading}</h2>
          <p>{about.text}</p>
        </section>

        <section>
          <h2 className="mt-8 text-2xl font-semibold">{classes.heading}</h2>
          <ul>
            {classes.items.map((item) => (
              <li key={item.name}>
                {item.name}: {item.length}, {item.price}
              </li>
            ))}
          </ul>
          <p>{classes.note}</p>
        </section>

        <section>
          <h2 className="mt-8 text-2xl font-semibold">{contact.heading}</h2>
          <address className="not-italic">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            {contact.address}
          </address>
        </section>
      </main>
      <footer className="mx-auto max-w-2xl p-8 text-sm">
        <p>{footer.owner}</p>
        <p>{footer.address}</p>
        <p>{footer.email}</p>
        <p>{footer.kvk}</p>
        <p>{footer.vatId}</p>
        <p>{footer.privacy}</p>
      </footer>
    </>
  )
}
