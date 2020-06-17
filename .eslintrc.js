module.exports = {
  extends: ['@lukeshay/eslint-config-typescript'],
  plugins: ['jest'],
  rules: {
    'prettier/prettier': ['error', require('./.prettierrc.js')],
  },
  env: {
    jest: true,
  },
}
