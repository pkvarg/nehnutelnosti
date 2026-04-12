export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Playfair_Display, DM_Sans } from 'next/font/google'
import { getPayload } from 'payload'
import config from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '../globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Vaše Reality | Predaj nehnuteľností',
    template: '%s | Vaše Reality',
  },
  description:
    'Vaše Reality - Váš spoľahlivý partner pri predaji a kúpe nehnuteľností. Byty, domy, pozemky a komerčné priestory na Slovensku.',
}

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-body',
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
})

export default async function FrontendLayout({ children }: { children: React.ReactNode }) {
  let navItems: Array<{ label?: string | null; url?: string | null; id?: string | null }> = []
  let ctaButton: { label?: string | null; url?: string | null; show?: boolean | null } = {}
  let siteName: string | null = null
  let footerData: Record<string, unknown> = {}

  try {
    const payload = await getPayload({ config })

    const [pages, siteSettings, footer] = await Promise.all([
      payload.find({
        collection: 'pages',
        where: { showInNav: { equals: true } },
        sort: 'navOrder',
        limit: 20,
      }),
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'footer' }),
    ])

    const coreItems = [
      { label: 'Ponuka', url: '/ponuka', id: 'core-ponuka' },
      { label: 'O nás', url: '/o-nas', id: 'core-o-nas' },
      { label: 'Kontakt', url: '/kontakt', id: 'core-kontakt' },
    ]
    const cmsItems = pages.docs
      .filter((page) => {
        const slug = (page.slug as string).replace(/^\//, '')
        return !['o-nas', 'kontakt', 'ponuka'].includes(slug)
      })
      .map((page) => ({
        label: page.title as string,
        url: `/${(page.slug as string).replace(/^\//, '')}`,
        id: page.id as string,
      }))
    navItems = [...coreItems, ...cmsItems]
    ctaButton = { show: false }
    siteName = (siteSettings.siteName as string) || 'Vaše Reality'
    footerData = footer as Record<string, unknown>
  } catch {
    navItems = [
      { label: 'Ponuka', url: '/ponuka', id: 'core-ponuka' },
      { label: 'O nás', url: '/o-nas', id: 'core-o-nas' },
      { label: 'Kontakt', url: '/kontakt', id: 'core-kontakt' },
    ]
    ctaButton = { show: false }
    siteName = 'Vaše Reality'
  }

  return (
    <html lang="sk" className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="frontend min-h-full flex flex-col">
        <Header navItems={navItems} ctaButton={ctaButton} siteName={siteName} />
        <main className="flex-1">{children}</main>
        <Footer
          navItems={navItems}
          companyName={footerData.companyName as string | undefined}
          description={footerData.description as string | undefined}
          phone={footerData.phone as string | undefined}
          email={footerData.email as string | undefined}
          address={footerData.address as string | undefined}
          openingHours={footerData.openingHours as string | undefined}
          socialLinks={
            footerData.socialLinks as
              | Array<{
                  platform?: 'facebook' | 'instagram' | 'linkedin' | null
                  url?: string | null
                  id?: string | null
                }>
              | undefined
          }
          mapEmbedUrl={footerData.mapEmbedUrl as string | undefined}
          copyrightText={footerData.copyrightText as string | undefined}
        />
      </body>
    </html>
  )
}
