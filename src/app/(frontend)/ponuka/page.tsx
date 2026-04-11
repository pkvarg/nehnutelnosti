export const dynamic = 'force-dynamic'

import { Suspense } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import PropertyCard from '@/components/PropertyCard'
import PropertyFilters from '@/components/PropertyFilters'
import type { Metadata } from 'next'
import type { Where } from 'payload'

export const metadata: Metadata = {
  title: 'Ponuka nehnuteľností',
  description: 'Prehliadajte našu ponuku bytov, domov, pozemkov a komerčných priestorov.',
}

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

interface SearchParams {
  propertyType?: string
  minPrice?: string
  maxPrice?: string
  location?: string
  rooms?: string
}

async function getProperties(searchParams: SearchParams): Promise<{ docs: PropertyDoc[]; totalDocs: number }> {
  try {
    const payload = await getPayload({ config })

    const where: Where = {}

    if (searchParams.propertyType) {
      where.propertyType = { equals: searchParams.propertyType }
    }

    if (searchParams.minPrice || searchParams.maxPrice) {
      where.price = {}
      if (searchParams.minPrice) {
        ;(where.price as Record<string, unknown>).greater_than_equal = Number(searchParams.minPrice)
      }
      if (searchParams.maxPrice) {
        ;(where.price as Record<string, unknown>).less_than_equal = Number(searchParams.maxPrice)
      }
    }

    if (searchParams.location) {
      where.location = { contains: searchParams.location }
    }

    if (searchParams.rooms) {
      const roomsNum = Number(searchParams.rooms)
      if (roomsNum >= 5) {
        where.rooms = { greater_than_equal: 5 }
      } else {
        where.rooms = { equals: roomsNum }
      }
    }

    const result = await payload.find({
      collection: 'properties',
      where,
      limit: 50,
      sort: '-createdAt',
    })

    return {
      docs: result.docs as unknown as PropertyDoc[],
      totalDocs: result.totalDocs,
    }
  } catch {
    return { docs: [], totalDocs: 0 }
  }
}

export default async function PonukaPage(props: {
  searchParams: Promise<SearchParams>
}) {
  const searchParams = await props.searchParams
  const { docs: properties, totalDocs } = await getProperties(searchParams)

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Nehnuteľnosti
          </p>
          <h1 className="heading-editorial mt-2 text-3xl text-navy md:text-4xl">
            Ponuka nehnuteľností
          </h1>
          <div className="mt-3 h-px w-16 bg-gold" />
        </div>

        <Suspense fallback={<div className="h-20 bg-cream-dark animate-pulse" />}>
          <PropertyFilters />
        </Suspense>

        <p className="mt-6 text-sm text-warm-gray">
          {totalDocs > 0
            ? `Nájdených ${totalDocs} ${totalDocs === 1 ? 'nehnuteľnosť' : totalDocs < 5 ? 'nehnuteľnosti' : 'nehnuteľností'}`
            : ''}
        </p>

        {properties.length > 0 ? (
          <div className="mt-8 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
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
            ))}
          </div>
        ) : (
          <div className="mt-16 flex flex-col items-center justify-center py-20 text-center">
            <svg className="mb-6 h-16 w-16 text-cream-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <h3 className="font-display text-xl font-semibold text-navy">
              Žiadne nehnuteľnosti
            </h3>
            <p className="mt-2 text-warm-gray">
              Žiadne nehnuteľnosti nezodpovedajú vašim kritériám. Skúste upraviť filtre.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
