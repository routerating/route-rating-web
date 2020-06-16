module.exports = {
  extends: ['plugin:@stencil/recommended', 'prettier'],
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['prettier'],
  rules: {
    '@stencil/strict-boolean-conditions': 0,
    'prettier/prettier': ['error'],
    'react/jsx-no-bind': 0,
  },
  ignorePatterns: 'stencil.config.ts',
}
