import type { Metadata } from 'next'

import { content } from '../content'

export const metadata: Metadata = {
  title: content.title,
  description: content.hero.pitch,
}

const h2 = 'text-2xl sm:text-3xl'

/** The one page. Plain server HTML from the content module, complete with JavaScript off (ADR-0008). */
export default function Home() {
  const { hero, about, classes, contact, footer } = content
  return (
    <>
      <main className="mx-auto max-w-2xl px-6 pt-12 pb-8 sm:px-8 sm:pt-20" id="main">
        <h1 className="text-4xl sm:text-6xl">{hero.name}</h1>
        <p className="text-ink-soft mt-4 text-xl">{hero.pitch}</p>

        <section className="mt-14 sm:mt-20">
          <h2 className={h2}>{about.heading}</h2>
          <p className="mt-4 text-lg">{about.text}</p>
        </section>

        <section className="mt-14 sm:mt-20">
          <h2 className={h2}>{classes.heading}</h2>
          <ul className="mt-4">
            {classes.items.map((item) => (
              // DOM order is name, length, price; the grid puts the price beside the name.
              <li
                key={item.name}
                className="border-clay/30 grid grid-cols-[1fr_auto] gap-x-6 border-t py-4 last:border-b"
              >
                <span className="font-heading text-xl font-semibold">{item.name}</span>
                <span className="text-ink-soft col-start-1">{item.length}</span>
                <span className="col-start-2 row-start-1 row-end-3 self-center text-lg font-semibold">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
          <p className="text-ink-soft mt-4 text-sm">{classes.note}</p>
        </section>

        <section className="mt-14 sm:mt-20">
          <h2 className={h2}>{contact.heading}</h2>
          <address className="mt-4 text-lg not-italic">
            <a href={`mailto:${contact.email}`}>{contact.email}</a>
            <br />
            {contact.address}
          </address>
        </section>
      </main>
      <footer className="bg-sand text-ink-soft mt-16 text-sm sm:mt-24">
        <div className="mx-auto max-w-2xl space-y-1 px-6 py-10 sm:px-8">
          <p>{footer.owner}</p>
          <p>{footer.address}</p>
          <p>{footer.email}</p>
          <p>{footer.kvk}</p>
          <p>{footer.vatId}</p>
          <p className="pt-3">{footer.privacy}</p>
        </div>
      </footer>
    </>
  )
}
