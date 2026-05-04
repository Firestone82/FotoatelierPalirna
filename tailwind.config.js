/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        'site-bg':           '#f5f0e8',
        'site-bg-alt':       '#ede8df',
        'site-text':         '#1c1917',
        'site-muted':        '#6b6460',
        'site-accent':       '#9b4c2f',
        'site-accent-light': '#d4917c',
        'site-border':       '#d6cfc4',
      },
      fontFamily: {
        'site-serif': ['Cormorant Garamond', 'Georgia', 'serif'],
        'site-sans':  ['Jost', 'sans-serif'],
      },
      maxWidth: {
        'site': '1200px',
      },
    },
  },
  plugins: [],
}
