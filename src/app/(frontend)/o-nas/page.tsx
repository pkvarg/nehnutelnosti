export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'O nás',
  description: 'Spoznajte Vaše Reality - Váš spoľahlivý partner pri predaji a kúpe nehnuteľností.',
}

interface AboutPageData {
  subtitle?: string | null
  title?: string | null
  paragraphs?: Array<{
    type?: 'paragraph' | 'heading' | null
    text?: string | null
    id?: string | null
  }> | null
}

async function getAboutPageData(): Promise<AboutPageData> {
  try {
    const payload = await getPayload({ config })
    const data = await payload.findGlobal({ slug: 'about-page' })
    return data as unknown as AboutPageData
  } catch {
    return {}
  }
}

const defaultParagraphs: AboutPageData['paragraphs'] = [
  {
    type: 'paragraph',
    text: 'Vaše Reality je realitná kancelária s dlhoročnými skúsenosťami na slovenskom trhu s nehnuteľnosťami. Naším cieľom je poskytnúť klientom profesionálne služby pri predaji, kúpe a prenájme nehnuteľností.',
  },
  {
    type: 'paragraph',
    text: 'Veríme, že každý si zaslúži nájsť svoj vysnívaný domov. Preto pristupujeme ku každému klientovi individuálne a hľadáme riešenia šité na mieru jeho potrebám a predstavám.',
  },
  {
    type: 'heading',
    text: 'Naše hodnoty',
  },
  {
    type: 'paragraph',
    text: 'Stavíme na profesionalite, transparentnosti a osobnom prístupe. Každá transakcia je pre nás rovnako dôležitá, bez ohľadu na jej veľkosť.',
  },
  {
    type: 'paragraph',
    text: 'Ak hľadáte spoľahlivého partnera pre vaše realitné potreby, neváhajte nás kontaktovať.',
  },
]

export default async function AboutPage() {
  const page = await getAboutPageData()

  const subtitle = page.subtitle ?? 'O spoločnosti'
  const title = page.title ?? 'O nás'
  const paragraphs =
    page.paragraphs && page.paragraphs.length > 0 ? page.paragraphs : defaultParagraphs

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            {subtitle}
          </p>
          <h1 className="heading-editorial mt-2 text-3xl text-navy md:text-4xl">
            {title}
          </h1>
          <div className="mt-3 h-px w-16 bg-gold" />
        </div>

        <div className="rich-text">
          {paragraphs?.map((item, i) =>
            item.type === 'heading' ? (
              <h2 key={item.id || i}>{item.text}</h2>
            ) : (
              <p key={item.id || i}>{item.text}</p>
            ),
          )}
        </div>
      </div>
    </div>
  )
}
