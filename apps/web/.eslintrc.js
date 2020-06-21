module.exports = {
  extends: ['plugin:@stencil/recommended', '../../configs/.eslintrc'],
  parserOptions: {
    project: './tsconfig.json',
  },
  rules: {
    '@stencil/strict-boolean-conditions': 0,
    'react/jsx-no-bind': 0,
  },
  ignorePatterns: 'stencil.config.ts',
}
