import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import PropertyCard from '@/components/PropertyCard'

interface PropertyDoc {
  title: string
  slug: string
  price: number
  propertyType?: string | null
  area?: number | null
  rooms?: number | null
  location: string
  status?: string | null
  images?: Array<{ image?: Record<string, unknown> | string | null }> | null
}

async function getFeaturedProperties(): Promise<PropertyDoc[]> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'properties',
      where: { featured: { equals: true } },
      limit: 6,
      sort: '-createdAt',
    })
    return result.docs as unknown as PropertyDoc[]
  } catch {
    return []
  }
}

export default async function HomePage() {
  const properties = await getFeaturedProperties()

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy-light opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,164,85,0.08)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="animate-fade-in-up mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Realitná kancelária
          </p>
          <h1 className="animate-fade-in-up delay-100 heading-editorial text-4xl text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            Nájdite svoj
            <br />
            <span className="text-gold">vysnívaný domov</span>
          </h1>
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/60">
            S profesionálnym prístupom a dlhoročnými skúsenosťami vám pomôžeme nájsť
            nehnuteľnosť presne podľa vašich predstáv.
          </p>
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/ponuka" className="btn-gold">
              Prezrieť ponuku
            </Link>
            <Link href="/kontakt" className="btn-outline">
              Kontaktujte nás
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Vybrané nehnuteľnosti
            </p>
            <h2 className="heading-editorial mt-3 text-3xl text-navy md:text-4xl">
              Odporúčané nehnuteľnosti
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold" />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.length > 0
              ? properties.map((property) => (
                  <PropertyCard
                    key={property.slug}
                    title={property.title}
                    slug={property.slug}
                    price={property.price}
                    propertyType={property.propertyType}
                    area={property.area}
                    rooms={property.rooms}
                    location={property.location}
                    status={property.status}
                    images={property.images as PropertyDoc['images']}
                  />
                ))
              : Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="property-card group">
                    <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-navy-light/60 to-navy/40">
                      <div className="flex h-full items-center justify-center">
                        <svg className="h-12 w-12 text-cream/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                        </svg>
                      </div>
                      <div className="absolute right-3 top-3 bg-gold/20 px-3 py-1.5 text-xs font-bold text-gold">
                        &mdash;
                      </div>
                    </div>
                    <div className="p-5">
                      <div className="h-5 w-3/4 rounded bg-cream-dark" />
                      <div className="mt-3 h-3 w-1/2 rounded bg-cream-dark" />
                      <div className="mt-4 flex gap-5 border-t border-cream-dark pt-3">
                        <div className="h-3 w-16 rounded bg-cream-dark" />
                        <div className="h-3 w-16 rounded bg-cream-dark" />
                      </div>
                    </div>
                  </div>
                ))}
          </div>

          {properties.length > 0 && (
            <div className="mt-12 text-center">
              <Link href="/ponuka" className="btn-outline">
                Zobraziť všetky nehnuteľnosti
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="bg-cream-dark py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Naše výhody
            </p>
            <h2 className="heading-editorial mt-3 text-3xl text-navy md:text-4xl">
              Prečo si vybrať nás
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold" />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="group bg-white p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-navy">
                <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy">Skúsenosti</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-gray">
                Dlhoročné pôsobenie na slovenskom realitnom trhu nám umožňuje poskytnúť vám
                tie najlepšie služby a poradenstvo.
              </p>
            </div>

            <div className="group bg-white p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-navy">
                <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy">Osobný prístup</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-gray">
                Každý klient je pre nás jedinečný. Venujeme sa vašim potrebám individuálne a
                hľadáme riešenie šité na mieru.
              </p>
            </div>

            <div className="group bg-white p-8 transition-shadow hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center bg-navy">
                <svg className="h-7 w-7 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="font-display text-xl font-semibold text-navy">Transparentnosť</h3>
              <p className="mt-3 text-sm leading-relaxed text-warm-gray">
                Dbáme na úplnú transparentnosť v každom kroku. Vždy budete informovaní o
                stave a priebehu celého procesu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative overflow-hidden bg-navy py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,164,85,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="heading-editorial text-3xl text-cream md:text-4xl">
            Máte záujem o nehnuteľnosť?
          </h2>
          <p className="mt-4 text-cream/60">
            Neváhajte nás kontaktovať. Radi vám poradíme a pomôžeme s výberom tej pravej nehnuteľnosti.
          </p>
          <Link href="/kontakt" className="btn-gold mt-8 inline-flex">
            Kontaktujte nás
          </Link>
        </div>
      </section>
    </>
  )
}
