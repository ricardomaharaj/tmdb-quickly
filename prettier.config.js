/** @type {import('prettier').Config} */
const config = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
}

module.exports = config
