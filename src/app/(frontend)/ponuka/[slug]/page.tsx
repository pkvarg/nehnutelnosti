export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayload } from 'payload'
import config from '@payload-config'
import PropertyGallery from '@/components/PropertyGallery'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

const TYPE_LABELS: Record<string, string> = {
  byt: 'Byt',
  dom: 'Dom',
  pozemok: 'Pozemok',
  'komercny-priestor': 'Komerčný priestor',
  ine: 'Iné',
}

const STATUS_LABELS: Record<string, string> = {
  aktivna: 'Aktívna',
  predana: 'Predaná',
  rezervovana: 'Rezervovaná',
}

function statusBadgeClass(status: string): string {
  switch (status) {
    case 'predana':
      return 'badge-sold'
    case 'rezervovana':
      return 'badge-reserved'
    default:
      return 'badge-active'
  }
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('sk-SK', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(price)
}

interface PropertyDoc {
  title: string
  slug: string
  price: number
  propertyType?: string | null
  area?: number | null
  rooms?: number | null
  location: string
  address?: string | null
  status?: string | null
  description?: SerializedEditorState | null
  images?: Array<{ image?: Record<string, unknown> | string | null }> | null
}

async function getProperty(slug: string): Promise<PropertyDoc | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'properties',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (result.docs.length === 0) return null
    return result.docs[0] as unknown as PropertyDoc
  } catch {
    return null
  }
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await props.params
  const property = await getProperty(slug)
  if (!property) return { title: 'Nehnuteľnosť nenájdená' }
  return {
    title: property.title,
    description: `${property.title} - ${property.location}. ${formatPrice(property.price)}`,
  }
}

export default async function PropertyDetailPage(props: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await props.params
  const property = await getProperty(slug)

  if (!property) {
    notFound()
  }

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-warm-gray">
          <Link href="/" className="transition-colors hover:text-navy">Domov</Link>
          <span>/</span>
          <Link href="/ponuka" className="transition-colors hover:text-navy">Ponuka</Link>
          <span>/</span>
          <span className="text-navy">{property.title}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1fr_380px]">
          <div>
            <PropertyGallery
              images={property.images || []}
              title={property.title}
            />

            {property.description && (
              <div className="rich-text mt-10">
                <h2 className="font-display text-2xl font-semibold text-navy">Popis</h2>
                <div className="mt-4">
                  <RichText data={property.description} />
                </div>
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="bg-white p-8 shadow-sm">
              <div className="text-3xl font-bold text-gold heading-editorial">
                {formatPrice(property.price)}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {property.status && (
                  <span className={statusBadgeClass(property.status)}>
                    {STATUS_LABELS[property.status] || property.status}
                  </span>
                )}
                {property.propertyType && (
                  <span className="inline-block border border-cream-dark px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-warm-gray">
                    {TYPE_LABELS[property.propertyType] || property.propertyType}
                  </span>
                )}
              </div>

              <h1 className="mt-6 font-display text-2xl font-semibold leading-tight text-navy">
                {property.title}
              </h1>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-warm-gray">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                {property.location}
              </div>

              <div className="mt-6 space-y-3 border-t border-cream-dark pt-6">
                {property.area != null && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-warm-gray">Rozloha</span>
                    <span className="font-medium text-navy">{property.area} m&sup2;</span>
                  </div>
                )}
                {property.rooms != null && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-warm-gray">Počet izieb</span>
                    <span className="font-medium text-navy">{property.rooms}</span>
                  </div>
                )}
                {property.address && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-warm-gray">Adresa</span>
                    <span className="font-medium text-navy text-right">{property.address}</span>
                  </div>
                )}
              </div>

              <Link
                href="/kontakt"
                className="btn-gold mt-8 w-full text-center"
              >
                Mám záujem o túto nehnuteľnosť
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
