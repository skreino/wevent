import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'wevent',
    short_name: 'wevent',
    description: 'Che si fa stasera?',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#C7FF3D',
    icons: [{ src: '/brand/wevent-logo.png', sizes: '512x512', type: 'image/png' }]
  }
}
