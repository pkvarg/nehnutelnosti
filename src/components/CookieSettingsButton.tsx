'use client'

import { OPEN_COOKIE_SETTINGS } from './CookieConsent'

export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_COOKIE_SETTINGS))}
      className="transition-colors hover:text-cream"
    >
      Nastavenia cookies
    </button>
  )
}
