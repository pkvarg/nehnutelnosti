'use client'

import Image from 'next/image'
import { useState } from 'react'

interface MediaImage {
  url?: string | null
  alt?: string | null
  sizes?: {
    card?: { url?: string | null } | null
    thumbnail?: { url?: string | null } | null
    full?: { url?: string | null } | null
  } | null
}

interface PropertyGalleryProps {
  images: Array<{ image?: MediaImage | string | null }>
  title: string
}

export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  const resolvedImages = images
    .map((item) => {
      if (!item.image || typeof item.image === 'string') return null
      return item.image
    })
    .filter(Boolean) as MediaImage[]

  if (resolvedImages.length === 0) {
    return (
      <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-navy-light to-navy">
        <svg className="h-20 w-20 text-cream/15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5a2.25 2.25 0 002.25-2.25V5.25a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25z" />
        </svg>
      </div>
    )
  }

  const activeImage = resolvedImages[activeIndex]
  const mainUrl = activeImage?.url || activeImage?.sizes?.full?.url || ''

  return (
    <div>
      <div className="relative aspect-video w-full overflow-hidden bg-navy-light">
        {mainUrl && (
          <Image
            src={mainUrl}
            alt={activeImage?.alt || `${title} - ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 65vw"
            priority
          />
        )}
        {resolvedImages.length > 1 && (
          <>
            <button
              onClick={() => setActiveIndex((prev) => (prev === 0 ? resolvedImages.length - 1 : prev - 1))}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-navy/60 text-cream transition-colors hover:bg-navy/80"
              aria-label="Predchádzajúca fotografia"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev === resolvedImages.length - 1 ? 0 : prev + 1))}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center bg-navy/60 text-cream transition-colors hover:bg-navy/80"
              aria-label="Nasledujúca fotografia"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </>
        )}
        <div className="absolute bottom-3 right-3 bg-navy/70 px-2 py-1 text-xs text-cream/80">
          {activeIndex + 1} / {resolvedImages.length}
        </div>
      </div>

      {resolvedImages.length > 1 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-2">
          {resolvedImages.map((img, i) => {
            const thumbUrl = img.url || img.sizes?.thumbnail?.url || ''
            return (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`relative h-16 w-24 shrink-0 overflow-hidden transition-opacity ${
                  i === activeIndex ? 'ring-2 ring-gold opacity-100' : 'opacity-50 hover:opacity-80'
                }`}
              >
                {thumbUrl && (
                  <Image
                    src={thumbUrl}
                    alt={img.alt || `${title} - ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                )}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
