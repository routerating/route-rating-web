module.exports = {
  extends: ['@lukeshay/eslint-config-typescript'],
  plugins: ['jest'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        jsxSingleQuote: false,
        semi: false,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
      },
    ],
  },
  env: {
    jest: true,
  },
}
