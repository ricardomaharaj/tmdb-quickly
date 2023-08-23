const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        subtext: '#94a3b8',
        primary: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
        },
        secondary: {
          900: '#064e3b',
          800: '#065f46',
          700: '#047857',
          600: '#059669',
        },
      },
    },
  },
  plugins: [addDynamicIconSelectors()],
}
