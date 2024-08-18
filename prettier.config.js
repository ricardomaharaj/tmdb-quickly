/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-organize-imports', 'prettier-plugin-tailwindcss'],
}

module.exports = config
