export const dynamic = 'force-dynamic'

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

interface HomePageData {
  heroSubtitle?: string | null
  heroHeading?: string | null
  heroHighlight?: string | null
  heroDescription?: string | null
  heroPrimaryButton?: { label?: string | null; url?: string | null } | null
  heroSecondaryButton?: { label?: string | null; url?: string | null } | null
  featuredSubtitle?: string | null
  featuredHeading?: string | null
  featuredButtonLabel?: string | null
  benefitsSubtitle?: string | null
  benefitsHeading?: string | null
  benefits?: Array<{
    title: string
    description: string
    icon?: string | null
    id?: string | null
  }> | null
  ctaHeading?: string | null
  ctaDescription?: string | null
  ctaButton?: { label?: string | null; url?: string | null } | null
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

async function getHomePageData(): Promise<HomePageData> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'home-page' })
    return data as unknown as HomePageData
  } catch {
    return {}
  }
}

function BenefitIcon({ icon }: { icon: string }) {
  const cls = "h-7 w-7 text-gold"
  switch (icon) {
    case 'star':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
    case 'shield':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    case 'users':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
      )
    case 'home':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      )
    case 'heart':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
        </svg>
      )
    case 'chart':
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
        </svg>
      )
    default:
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
        </svg>
      )
  }
}

function renderHeroHeading(heading: string, highlight: string | null) {
  if (!highlight || !heading.includes(highlight)) {
    return <>{heading}</>
  }

  const idx = heading.indexOf(highlight)
  const before = heading.slice(0, idx)
  const after = heading.slice(idx + highlight.length)

  return (
    <>
      {before}
      {before.length > 0 && <br />}
      <span className="text-gold">{highlight}</span>
      {after}
    </>
  )
}

const defaultBenefits = [
  {
    id: 'default-1',
    title: 'Skúsenosti',
    description:
      'Dlhoročné pôsobenie na slovenskom realitnom trhu nám umožňuje poskytnúť vám tie najlepšie služby a poradenstvo.',
    icon: 'star',
  },
  {
    id: 'default-2',
    title: 'Osobný prístup',
    description:
      'Každý klient je pre nás jedinečný. Venujeme sa vašim potrebám individuálne a hľadáme riešenie šité na mieru.',
    icon: 'users',
  },
  {
    id: 'default-3',
    title: 'Transparentnosť',
    description:
      'Dbáme na úplnú transparentnosť v každom kroku. Vždy budete informovaní o stave a priebehu celého procesu.',
    icon: 'shield',
  },
]

export default async function HomePage() {
  const [properties, page] = await Promise.all([
    getFeaturedProperties(),
    getHomePageData(),
  ])

  const heroSubtitle = page.heroSubtitle ?? 'Realitná kancelária'
  const heroHeading = page.heroHeading ?? 'Nájdite svoj vysnívaný domov'
  const heroHighlight = page.heroHighlight ?? 'vysnívaný domov'
  const heroDescription =
    page.heroDescription ??
    'S profesionálnym prístupom a dlhoročnými skúsenosťami vám pomôžeme nájsť nehnuteľnosť presne podľa vašich predstáv.'
  const primaryLabel = page.heroPrimaryButton?.label ?? 'Prezrieť ponuku'
  const primaryUrl = page.heroPrimaryButton?.url ?? '/ponuka'
  const secondaryLabel = page.heroSecondaryButton?.label ?? 'Kontaktujte nás'
  const secondaryUrl = page.heroSecondaryButton?.url ?? '/kontakt'

  const featuredSubtitle = page.featuredSubtitle ?? 'Vybrané nehnuteľnosti'
  const featuredHeading = page.featuredHeading ?? 'Odporúčané nehnuteľnosti'
  const featuredButtonLabel = page.featuredButtonLabel ?? 'Zobraziť všetky nehnuteľnosti'

  const benefitsSubtitle = page.benefitsSubtitle ?? 'Naše výhody'
  const benefitsHeading = page.benefitsHeading ?? 'Prečo si vybrať nás'
  const benefits =
    page.benefits && page.benefits.length > 0 ? page.benefits : defaultBenefits

  const ctaHeading = page.ctaHeading ?? 'Máte záujem o nehnuteľnosť?'
  const ctaDescription =
    page.ctaDescription ??
    'Neváhajte nás kontaktovať. Radi vám poradíme a pomôžeme s výberom tej pravej nehnuteľnosti.'
  const ctaLabel = page.ctaButton?.label ?? 'Kontaktujte nás'
  const ctaUrl = page.ctaButton?.url ?? '/kontakt'

  return (
    <>
      {/* HERO */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden bg-navy">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-navy to-navy-light opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(200,164,85,0.08)_0%,transparent_60%)]" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="animate-fade-in-up mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {heroSubtitle}
          </p>
          <h1 className="animate-fade-in-up delay-100 heading-editorial text-4xl text-cream sm:text-5xl md:text-6xl lg:text-7xl">
            {renderHeroHeading(heroHeading, heroHighlight)}
          </h1>
          <p className="animate-fade-in-up delay-200 mx-auto mt-6 max-w-xl text-lg leading-relaxed text-cream/60">
            {heroDescription}
          </p>
          <div className="animate-fade-in-up delay-300 mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href={primaryUrl} className="btn-gold">
              {primaryLabel}
            </Link>
            <Link href={secondaryUrl} className="btn-outline">
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED PROPERTIES */}
      <section className="py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {featuredSubtitle}
            </p>
            <h2 className="heading-editorial mt-3 text-3xl text-navy md:text-4xl">
              {featuredHeading}
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
                {featuredButtonLabel}
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
              {benefitsSubtitle}
            </p>
            <h2 className="heading-editorial mt-3 text-3xl text-navy md:text-4xl">
              {benefitsHeading}
            </h2>
            <div className="mx-auto mt-4 h-px w-16 bg-gold" />
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.id ?? benefit.title} className="group bg-white p-8 transition-shadow hover:shadow-lg">
                <div className="mb-6 flex h-14 w-14 items-center justify-center bg-navy">
                  <BenefitIcon icon={benefit.icon ?? 'star'} />
                </div>
                <h3 className="font-display text-xl font-semibold text-navy">{benefit.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-warm-gray">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative overflow-hidden bg-navy py-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(200,164,85,0.06)_0%,transparent_60%)]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="heading-editorial text-3xl text-cream md:text-4xl">
            {ctaHeading}
          </h2>
          <p className="mt-4 text-cream/60">
            {ctaDescription}
          </p>
          <Link href={ctaUrl} className="btn-gold mt-8 inline-flex">
            {ctaLabel}
          </Link>
        </div>
      </section>
    </>
  )
}
