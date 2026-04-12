export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import { notFound } from 'next/navigation'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

interface PageDoc {
  title: string
  subtitle?: string | null
  slug: string
  content?: SerializedEditorState | null
  meta?: {
    metaTitle?: string | null
    metaDescription?: string | null
  } | null
}

async function getPage(slug: string): Promise<PageDoc | null> {
  try {
    const payload = await getPayload({ config })
    const result = await payload.find({
      collection: 'pages',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    if (result.docs.length === 0) return null
    return result.docs[0] as unknown as PageDoc
  } catch {
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPage(slug)
  if (!page) return {}
  return {
    title: page.meta?.metaTitle || page.title,
    description: page.meta?.metaDescription || undefined,
  }
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const page = await getPage(slug)

  if (!page) notFound()

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="mb-10">
          {page.subtitle && (
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              {page.subtitle}
            </p>
          )}
          <h1 className="heading-editorial mt-2 text-3xl text-navy md:text-4xl">
            {page.title}
          </h1>
          <div className="mt-3 h-px w-16 bg-gold" />
        </div>

        {page.content && (
          <div className="rich-text">
            <RichText data={page.content} />
          </div>
        )}
      </div>
    </div>
  )
}
