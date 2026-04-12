'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

interface NavItem {
  label?: string | null
  url?: string | null
  id?: string | null
}

interface CtaButton {
  label?: string | null
  url?: string | null
  show?: boolean | null
}

interface HeaderProps {
  navItems?: NavItem[] | null
  ctaButton?: CtaButton | null
  siteName?: string | null
}

export default function Header({ navItems, ctaButton, siteName }: HeaderProps) {
  const pathname = usePathname()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(!isHome)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    if (!isHome) {
      setScrolled(true)
      return
    }
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-navy/95 backdrop-blur-md shadow-lg shadow-navy-dark/20' : 'bg-transparent'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
          <Link href="/" className="group flex items-center gap-2">
            <span className="font-display text-xl font-bold tracking-wide text-cream lg:text-2xl">
              {siteName || 'VAŠE REALITY'}
            </span>
          </Link>

          <button
            onClick={() => setMobileOpen(true)}
            className={`items-center justify-center text-cream lg:hidden ${navItems && navItems.length > 0 ? 'flex' : 'hidden'}`}
            aria-label="Otvoriť menu"
          >
            <svg
              width="28"
              height="28"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          </button>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 z-60 bg-navy flex flex-col lg:hidden">
          <div className="flex items-center justify-between px-6 py-4">
            <span className="font-display text-xl font-bold text-cream">
              {siteName || 'VAŠE REALITY'}
            </span>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-cream"
              aria-label="Zavrieť menu"
            >
              <svg
                width="28"
                height="28"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col items-center justify-center gap-8">
            {navItems?.map((item) =>
              item.label && item.url ? (
                <Link
                  key={item.id || item.url}
                  href={item.url}
                  onClick={() => setMobileOpen(false)}
                  className="font-display text-3xl font-semibold text-cream/80 transition-colors hover:text-gold"
                >
                  {item.label}
                </Link>
              ) : null,
            )}
            {ctaButton?.show && ctaButton.label && ctaButton.url && (
              <Link
                href={ctaButton.url}
                onClick={() => setMobileOpen(false)}
                className="btn-gold mt-4"
              >
                {ctaButton.label}
              </Link>
            )}
          </nav>
        </div>
      )}
    </>
  )
}
