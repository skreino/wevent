import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0A0A0A',
        surface: '#141414',
        surface2: '#1E1E1E',
        lime: '#C7FF3D',
        coral: '#FF5F87',
        cobalt: '#0930B8',
        cream: '#F0EBE0',
        muted: '#85827A',
        border: '#292929'
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      },
      borderRadius: {
        card: '16px',
        chip: '999px'
      },
      boxShadow: {
        lime: '0 0 0 1px rgba(199,255,61,0.18), 0 18px 60px rgba(199,255,61,0.08)'
      }
    }
  },
  plugins: []
}

export default config
