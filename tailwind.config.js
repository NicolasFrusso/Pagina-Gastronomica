/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        menu: '0 28px 80px var(--brand-shadow)',
        card: '0 18px 38px var(--brand-shadow-soft)',
        glow: '0 14px 40px rgba(255, 255, 255, 0.16)',
      },
      fontFamily: {
        sans: ['var(--font-body)'],
        heading: ['var(--font-heading)'],
      },
    },
  },
  plugins: [],
}
