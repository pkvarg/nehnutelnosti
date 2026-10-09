'use client'

import { useState, type FormEvent } from 'react'

export default function ContactForm({ className }: { className?: string }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [sendError, setSendError] = useState(false)
  // Hidden field humans never fill; bots that do are silently ignored.
  const [website, setWebsite] = useState('')

  function validate(): boolean {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Meno je povinné'
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email je povinný'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Zadajte platný email'
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Správa je povinná'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    if (website) {
      setSubmitted(true)
      return
    }

    setSubmitting(true)
    setSendError(false)

    // Same contact pipeline as Pictusweb's other sites: hono-api e-mails a copy to the
    // sender and to the NEHNUTELNOSTI mailbox.
    try {
      const response = await fetch('https://hono-api.pictusweb.com/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          mailMessage: formData.message,
          locale: 'sk',
          origin: 'NEHNUTELNOSTI',
          subject: 'Správa z ukážkového webu Vaše Reality',
        }),
      })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      setSubmitted(true)
    } catch (error) {
      console.error(error)
      setSendError(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <div className="bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center bg-navy">
          <svg className="h-8 w-8 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <h3 className="font-display text-xl font-semibold text-navy">
          Ďakujeme za vašu správu!
        </h3>
        <p className="mt-2 text-warm-gray">
          Potvrdenie sme vám poslali e-mailom. Ozveme sa vám čo najskôr.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col space-y-5 ${className || ''}`} noValidate>
      <div>
        <label htmlFor="name" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
          Meno *
        </label>
        <input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
          className={`form-input ${errors.name ? 'border-red-400' : ''}`}
          placeholder="Vaše meno"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
          Email *
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
          className={`form-input ${errors.email ? 'border-red-400' : ''}`}
          placeholder="vas@email.sk"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
          Telefón
        </label>
        <input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
          className="form-input"
          placeholder="+421 9XX XXX XXX"
        />
      </div>

      <div className="flex flex-1 flex-col">
        <label htmlFor="message" className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
          Správa *
        </label>
        <textarea
          id="message"
          rows={10}
          value={formData.message}
          onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
          className={`form-input flex-1 resize-none ${errors.message ? 'border-red-400' : ''}`}
          placeholder="Vaša správa..."
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input
          id="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      {sendError && (
        <p className="text-sm text-red-500">
          Správu sa nepodarilo odoslať. Skúste to znova alebo napíšte na info@pictusweb.sk.
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="btn-gold w-full disabled:opacity-50"
      >
        {submitting ? 'Odosielam...' : 'Odoslať správu'}
      </button>
    </form>
  )
}
