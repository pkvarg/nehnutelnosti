'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const CONSENT_COOKIE = 'CookieConsent'
const UMAMI_ID = 'fca8f8f8-65aa-4a5a-83a3-0a19036993dc'
export const OPEN_COOKIE_SETTINGS = 'open-cookie-settings'

const readConsent = () => document.cookie.match(/(?:^|; )CookieConsent=(true|false)/)?.[1] ?? null

const loadUmami = () => {
  if (document.querySelector(`script[data-website-id="${UMAMI_ID}"]`)) return
  const script = document.createElement('script')
  script.defer = true
  script.src = 'https://analytics.pictusweb.com/script.js'
  script.setAttribute('data-website-id', UMAMI_ID)
  document.head.appendChild(script)
}

// Umami runs only after consent; the choice is kept for 365 days and can be changed
// from "Nastavenia cookies" in the footer (see /gdpr).
export default function CookieConsent() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const consent = readConsent()
    if (consent === 'true') loadUmami()
    // The cookie can only be read in the browser, so the bar appears right after hydration.
    const timer = consent === null ? window.setTimeout(() => setOpen(true), 0) : undefined
    const reopen = () => setOpen(true)
    window.addEventListener(OPEN_COOKIE_SETTINGS, reopen)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(OPEN_COOKIE_SETTINGS, reopen)
    }
  }, [])

  const decide = (granted: boolean) => {
    document.cookie = `${CONSENT_COOKIE}=${granted}; max-age=${365 * 24 * 60 * 60}; path=/; SameSite=Lax`
    try {
      // Umami honours umami.disabled, so withdrawing consent stops tracking at once.
      if (granted) localStorage.removeItem('umami.disabled')
      else localStorage.setItem('umami.disabled', '1')
    } catch {
      // storage unavailable: the cookie alone still records the choice
    }
    if (granted) loadUmami()
    setOpen(false)
  }

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-label="Nastavenia cookies"
      className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/30 bg-navy px-6 py-4 text-sm text-cream shadow-2xl"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="leading-relaxed text-cream/80">
          So súhlasom meriame návštevnosť nástrojom Umami – bez cookies a bez ukladania IP adresy. Web
          funguje aj bez súhlasu.{' '}
          <Link href="/gdpr#cookies" className="underline hover:text-gold">
            Viac informácií
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => decide(false)}
            className="rounded-sm border border-cream/30 px-4 py-2 font-semibold hover:border-cream"
          >
            Nesúhlasím
          </button>
          <button type="button" onClick={() => decide(true)} className="btn-gold px-4 py-2">
            Súhlasím
          </button>
        </div>
      </div>
    </div>
  )
}
