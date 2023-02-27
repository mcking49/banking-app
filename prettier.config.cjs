// prettier.config.js
module.exports = {
  plugins: [require('prettier-plugin-tailwindcss')],
  tailwindConfig: './tailwind.config.cjs',
  singleQuote: true,
  semi: false,
  trailingComma: 'es5',
  printWidth: 100,
}
