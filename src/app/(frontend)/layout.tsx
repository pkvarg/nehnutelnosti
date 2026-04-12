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

    const [navigation, siteSettings, footer] = await Promise.all([
      payload.findGlobal({ slug: 'navigation' }),
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'footer' }),
    ])

    navItems = (navigation.navItems as typeof navItems) || []
    ctaButton = (navigation.ctaButton as typeof ctaButton) || {}
    siteName = (siteSettings.siteName as string) || null
    footerData = footer as Record<string, unknown>
  } catch {
    navItems = [
      { label: 'Ponuka', url: '/ponuka' },
      { label: 'O nás', url: '/o-nas' },
      { label: 'Kontakt', url: '/kontakt' },
    ]
    ctaButton = { label: 'Kontaktujte nás', url: '/kontakt', show: true }
    siteName = 'Vaše Reality'
  }

  return (
    <html lang="sk" className={`${playfair.variable} ${dmSans.variable} h-full antialiased`}>
      <body className="frontend min-h-full flex flex-col">
        <Header navItems={navItems} ctaButton={ctaButton} siteName={siteName} />
        <main className="flex-1">{children}</main>
        <Footer
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
        />
      </body>
    </html>
  )
}
