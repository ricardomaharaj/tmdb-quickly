const { addDynamicIconSelectors } = require('@iconify/tailwind')

/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.tsx'],
  theme: {
    extend: {},
  },
  plugins: [addDynamicIconSelectors()],
}

module.exports = config
