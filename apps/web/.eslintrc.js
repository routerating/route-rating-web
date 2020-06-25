module.exports = {
  extends: ['plugin:@stencil/recommended', '../../configs/.eslintrc'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@stencil/strict-boolean-conditions': 0,
    '@typescript-eslint/no-explicit-any': 1,
    '@typescript-eslint/explicit-function-return-type': 0
  },
  ignorePatterns: ['*.config.ts', '.eslintrc.js'],
}
