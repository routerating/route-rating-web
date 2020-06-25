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
    '@typescript-eslint/explicit-module-boundary-types': 0,
    "no-unused-vars": 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars-experimental': 2
  },
  env: {
    jest: true,
    browser: true
  },
}
