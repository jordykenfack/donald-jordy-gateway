/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        // Data Science world — analytical navy / graphite / restrained cyan
        data: {
          base: '#0a1526',
          deep: '#0d1b2e',
          panel: '#0f2038',
          card: '#122238',
          cardhi: '#16294380',
          line: '#22375a',
          linehi: '#2f4a72',
          cyan: '#38bdf8',
          teal: '#2dd4bf',
          amber: '#f5b657',
          green: '#4ade80',
          ink: '#e8eef6',
          mist: '#9fb3c8',
          dim: '#65809f',
        },
        // AI Studio world — warm charcoal canvas, off-white product cards
        studio: {
          base: '#0c0c0d',
          deep: '#131315',
          panel: '#1a1a1d',
          line: '#2a2a2f',
          accent: '#a3e635', // lime
          blue: '#5b9dff', // electric blue
          amber: '#f5a524',
          coral: '#f2765a',
          mist: '#a1a1aa',
          // light product-UI surfaces (browser/CRM/hub cards)
          paper: '#f7f7f5',
          papersub: '#eeeeec',
          ink: '#1b1b1a',
          inksub: '#6b6b68',
          hairline: '#e6e6e2',
        },
      },
    },
  },
  plugins: [],
};
