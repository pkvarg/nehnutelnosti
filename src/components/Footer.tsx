import Link from 'next/link'

interface SocialLink {
  platform?: 'facebook' | 'instagram' | 'linkedin' | null
  url?: string | null
  id?: string | null
}

interface FooterProps {
  companyName?: string | null
  description?: string | null
  phone?: string | null
  email?: string | null
  address?: string | null
  openingHours?: string | null
  socialLinks?: SocialLink[] | null
  mapEmbedUrl?: string | null
}

function SocialIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'facebook':
      return (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
      )
    case 'instagram':
      return (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    case 'linkedin':
      return (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      )
    default:
      return null
  }
}

export default function Footer({
  companyName,
  description,
  phone,
  email,
  address,
  openingHours,
  socialLinks,
  mapEmbedUrl,
}: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy text-cream/80">
      <div className="h-px bg-linear-to-r from-transparent via-gold to-transparent" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-display text-xl font-semibold text-cream mb-6">
              {companyName || 'Vaše Reality'}
            </h3>
            <p className="text-sm leading-relaxed text-cream/60">
              {description || 'Váš spoľahlivý partner pri predaji a kúpe nehnuteľností. S nami nájdete domov, ktorý si zaslúžite.'}
            </p>
            {socialLinks && socialLinks.length > 0 && (
              <div className="mt-6 flex gap-4">
                {socialLinks.map((link) =>
                  link.platform && link.url ? (
                    <a
                      key={link.id || link.url}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cream/50 transition-colors hover:text-gold"
                      aria-label={link.platform}
                    >
                      <SocialIcon platform={link.platform} />
                    </a>
                  ) : null,
                )}
              </div>
            )}
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gold">
              Kontakt
            </h4>
            <ul className="space-y-3 text-sm">
              {phone && (
                <li className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold/60"
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
                  <a href={`tel:${phone}`} className="transition-colors hover:text-cream">
                    {phone}
                  </a>
                </li>
              )}
              {email && (
                <li className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold/60"
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
                  <a href={`mailto:${email}`} className="transition-colors hover:text-cream">
                    {email}
                  </a>
                </li>
              )}
              {address && (
                <li className="flex items-start gap-3">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-gold/60"
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
                  <span className="whitespace-pre-line">{address}</span>
                </li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gold">
              Navigácia
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="transition-colors hover:text-cream">
                  Domov
                </Link>
              </li>
              <li>
                <Link href="/ponuka" className="transition-colors hover:text-cream">
                  Ponuka
                </Link>
              </li>
              <li>
                <Link href="/o-nas" className="transition-colors hover:text-cream">
                  O nás
                </Link>
              </li>
              <li>
                <Link href="/kontakt" className="transition-colors hover:text-cream">
                  Kontakt
                </Link>
              </li>
            </ul>
            {openingHours && (
              <div className="mt-6">
                <h4 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold">
                  Otváracie hodiny
                </h4>
                <p className="text-sm">{openingHours}</p>
              </div>
            )}
          </div>

          {mapEmbedUrl && (
            <div>
              <h4 className="mb-6 text-xs font-semibold uppercase tracking-widest text-gold">
                Kde nás nájdete
              </h4>
              <div className="aspect-square w-full overflow-hidden rounded-sm">
                <iframe
                  src={mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Mapa"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-12 border-t border-cream/10 pt-8 text-center text-xs text-cream/40">
          &copy; {year} {companyName || 'Vaše Reality'}. Všetky práva vyhradené.
        </div>
      </div>
    </footer>
  )
}
