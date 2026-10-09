import Link from 'next/link'
import Image from 'next/image'

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

interface MediaImage {
  url?: string | null
  alt?: string | null
  sizes?: {
    card?: { url?: string | null } | null
    thumbnail?: { url?: string | null } | null
  } | null
}

interface PropertyCardProps {
  title: string
  slug: string
  price: number
  propertyType?: string | null
  area?: number | null
  rooms?: number | null
  location: string
  status?: string | null
  images?: Array<{ image?: MediaImage | string | null }> | null
}

export default function PropertyCard({
  title,
  slug,
  price,
  propertyType,
  area,
  rooms,
  location,
  status,
  images,
}: PropertyCardProps) {
  const firstImage = images?.find((item) => item.image && typeof item.image === 'object')?.image
  const imageObj = typeof firstImage === 'object' ? firstImage : null
  const imageUrl = imageObj?.sizes?.card?.url || imageObj?.url || null

  return (
    <Link href={`/ponuka/${slug}`} className="property-card group block">
      <div className="relative aspect-[16/10] overflow-hidden bg-navy-light">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageObj?.alt || title}
            fill
            className="property-card-image object-cover transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="property-card-image flex h-full w-full items-center justify-center bg-gradient-to-br from-navy-light to-navy transition-transform duration-500">
            <svg className="h-12 w-12 text-cream/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 7.5h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
            </svg>
          </div>
        )}

        <div className="absolute right-3 top-3 bg-gold px-3 py-1.5 text-xs font-bold text-navy">
          {formatPrice(price)}
        </div>

        {status && (
          <div className={`absolute left-3 top-3 ${statusBadgeClass(status)}`}>
            {STATUS_LABELS[status] || status}
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-semibold leading-tight text-navy group-hover:text-gold-dark transition-colors">
          {title}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-warm-gray">
          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
          </svg>
          {location}
        </div>

        {propertyType && (
          <span className="mt-3 inline-block border border-cream-dark px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-warm-gray">
            {TYPE_LABELS[propertyType] || propertyType}
          </span>
        )}

        <div className="mt-4 flex items-center gap-5 border-t border-cream-dark pt-3 text-sm text-warm-gray">
          {area != null && (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
              </svg>
              {area} m&sup2;
            </span>
          )}
          {rooms != null && (
            <span className="flex items-center gap-1.5">
              <svg className="h-4 w-4 text-gold/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
              </svg>
              {rooms} {rooms === 1 ? 'izba' : rooms < 5 ? 'izby' : 'izieb'}
            </span>
          )}
        </div>
      </div>
    </Link>
  )
}
