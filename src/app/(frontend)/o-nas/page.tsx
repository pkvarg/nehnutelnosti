export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import type { Metadata } from 'next'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

export const metadata: Metadata = {
  title: 'O nás',
  description: 'Spoznajte Vaše Reality - Váš spoľahlivý partner pri predaji a kúpe nehnuteľností.',
}

interface PageDoc {
  title: string
  content?: SerializedEditorState | null
}

async function getAboutPage(): Promise<PageDoc | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: 'o-nas' } },
      limit: 1,
    })
    if (result.docs.length === 0) return null
    return result.docs[0] as unknown as PageDoc
  } catch {
    return null
  }
}

export default async function AboutPage() {
  const page = await getAboutPage()

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            O spoločnosti
          </p>
          <h1 className="heading-editorial mt-2 text-3xl text-navy md:text-4xl">
            {page?.title || 'O nás'}
          </h1>
          <div className="mt-3 h-px w-16 bg-gold" />
        </div>

        {page?.content ? (
          <div className="rich-text">
            <RichText data={page.content} />
          </div>
        ) : (
          <div className="rich-text">
            <p>
              Vaše Reality je realitná kancelária s dlhoročnými skúsenosťami na slovenskom trhu s
              nehnuteľnosťami. Naším cieľom je poskytnúť klientom profesionálne služby pri predaji,
              kúpe a prenájme nehnuteľností.
            </p>
            <p>
              Veríme, že každý si zaslúži nájsť svoj vysnívaný domov. Preto pristupujeme ku každému
              klientovi individuálne a hľadáme riešenia šité na mieru jeho potrebám a predstavám.
            </p>
            <h2>Naše hodnoty</h2>
            <p>
              Stavíme na profesionalite, transparentnosti a osobnom prístupe. Každá transakcia je
              pre nás rovnako dôležitá, bez ohľadu na jej veľkosť.
            </p>
            <p>
              Ak hľadáte spoľahlivého partnera pre vaše realitné potreby, neváhajte nás kontaktovať.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
