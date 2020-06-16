module.exports = {
  extends: ['@lukeshay/eslint-config-typescript'],
  rules: {
    'prettier/prettier': ['error', require('./.prettierrc.js')],
  },
}
