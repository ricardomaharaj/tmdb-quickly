/** @type {import('prettier').Config} */
module.exports = {
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-tailwindcss', 'prettier-plugin-organize-imports'],
}
