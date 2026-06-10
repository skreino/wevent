'use client'

import { useCallback, useEffect, useState } from 'react'

export function useGeolocation() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const cached = sessionStorage.getItem('wevent_geo')
    if (cached) setCoords(JSON.parse(cached))
  }, [])

  const request = useCallback(() => {
    setError(null)
    if (!navigator.geolocation) {
      setError('Geolocalizzazione non disponibile')
      return
    }
    setLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const next = { lat: position.coords.latitude, lng: position.coords.longitude }
        setCoords(next)
        sessionStorage.setItem('wevent_geo', JSON.stringify(next))
        setLoading(false)
      },
      () => {
        setError('Permesso posizione negato')
        setLoading(false)
      },
      { enableHighAccuracy: true, timeout: 8000 }
    )
  }, [])

  return { lat: coords?.lat, lng: coords?.lng, error, loading, request }
}
