export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import ContactForm from '@/components/ContactForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kontakt',
  description:
    'Kontaktujte nás - Vaše Reality. Radi vám poradíme s predajom alebo kúpou nehnuteľnosti.',
}

interface ContactData {
  phone?: string | null
  email?: string | null
  address?: string | null
  mapEmbedUrl?: string | null
}

async function getContactData(): Promise<ContactData> {
  try {
    const payload = await getPayload({ config })
    const [siteSettings, footer] = await Promise.all([
      payload.findGlobal({ slug: 'site-settings' }),
      payload.findGlobal({ slug: 'footer' }),
    ])
    return {
      phone: (siteSettings.phone as string) || (footer.phone as string) || null,
      email: (siteSettings.email as string) || (footer.email as string) || null,
      address: (siteSettings.address as string) || (footer.address as string) || null,
      mapEmbedUrl: (footer.mapEmbedUrl as string) || null,
    }
  } catch {
    return {}
  }
}

export default async function ContactPage() {
  const contact = await getContactData()

  return (
    <div className="pt-24 pb-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">Napíšte nám</p>
          <h1 className="heading-editorial mt-2 text-3xl text-navy md:text-4xl">Kontakt</h1>
          <div className="mt-3 h-px w-16 bg-gold" />
        </div>

        <div className="grid gap-12 lg:grid-cols-[1fr_400px] lg:items-stretch">
          <div className="flex flex-col">
            <h2 className="font-display text-xl font-semibold text-navy mb-6">
              Napíšte nám správu
            </h2>
            <ContactForm className="flex-1" />
          </div>

          <div className="flex flex-col">
            <div className="bg-white p-8 shadow-sm">
              <h2 className="font-display text-xl font-semibold text-navy mb-6">Kontaktné údaje</h2>

              <div className="space-y-5">
                {contact.phone && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy">
                      <svg
                        className="h-5 w-5 text-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-warm-gray">
                        Telefón
                      </p>
                      <a
                        href={`tel:${contact.phone}`}
                        className="mt-1 block text-navy font-medium hover:text-gold-dark transition-colors"
                      >
                        {contact.phone}
                      </a>
                    </div>
                  </div>
                )}

                {contact.email && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy">
                      <svg
                        className="h-5 w-5 text-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-warm-gray">
                        Email
                      </p>
                      <a
                        href={`mailto:${contact.email}`}
                        className="mt-1 block text-navy font-medium hover:text-gold-dark transition-colors"
                      >
                        {contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {contact.address && (
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-navy">
                      <svg
                        className="h-5 w-5 text-gold"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-warm-gray">
                        Adresa
                      </p>
                      <p className="mt-1 whitespace-pre-line text-navy font-medium">
                        {contact.address}
                      </p>
                    </div>
                  </div>
                )}

                {!contact.phone && !contact.email && !contact.address && (
                  <p className="text-sm text-warm-gray">
                    Kontaktné údaje ešte neboli nastavené v administrácii.
                  </p>
                )}
              </div>
            </div>

            {contact.mapEmbedUrl && (
              <div className="mt-6 aspect-video w-full overflow-hidden shadow-sm">
                <iframe
                  src={contact.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
