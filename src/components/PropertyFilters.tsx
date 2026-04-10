'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState } from 'react'

const PROPERTY_TYPES = [
  { value: '', label: 'Všetky typy' },
  { value: 'byt', label: 'Byt' },
  { value: 'dom', label: 'Dom' },
  { value: 'pozemok', label: 'Pozemok' },
  { value: 'komercny-priestor', label: 'Komerčný priestor' },
  { value: 'ine', label: 'Iné' },
]

const ROOM_OPTIONS = [
  { value: '', label: 'Všetky' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5+' },
]

export default function PropertyFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [propertyType, setPropertyType] = useState(searchParams.get('propertyType') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [rooms, setRooms] = useState(searchParams.get('rooms') || '')

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams()
    if (propertyType) params.set('propertyType', propertyType)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (location) params.set('location', location)
    if (rooms) params.set('rooms', rooms)
    const qs = params.toString()
    router.push(qs ? `/ponuka?${qs}` : '/ponuka')
  }, [propertyType, minPrice, maxPrice, location, rooms, router])

  const resetFilters = useCallback(() => {
    setPropertyType('')
    setMinPrice('')
    setMaxPrice('')
    setLocation('')
    setRooms('')
    router.push('/ponuka')
  }, [router])

  return (
    <div className="bg-white p-6 shadow-sm">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
            Typ
          </label>
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="form-input"
          >
            {PROPERTY_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
            Cena od
          </label>
          <input
            type="number"
            placeholder="0 €"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
            Cena do
          </label>
          <input
            type="number"
            placeholder="Max €"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
            Lokalita
          </label>
          <input
            type="text"
            placeholder="Mesto, obec..."
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-warm-gray">
            Izby
          </label>
          <select
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            className="form-input"
          >
            {ROOM_OPTIONS.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button onClick={applyFilters} className="btn-gold">
          Filtrovať
        </button>
        <button onClick={resetFilters} className="btn-outline">
          Zrušiť
        </button>
      </div>
    </div>
  )
}
