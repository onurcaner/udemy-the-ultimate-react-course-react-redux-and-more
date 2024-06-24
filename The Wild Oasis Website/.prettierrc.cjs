module.exports = {
  singleQuote: true,
  trailingComma: 'all',
  // prettier-ignore
  importOrder: [
    '^(\w|@\w)', // node_modules
    '^(\.\/|\.\.\/|@\/)', // local
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
  ],
};
