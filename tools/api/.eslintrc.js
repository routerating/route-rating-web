require('@lukeshay/eslint-config-typescript/patch');

module.exports = {
  extends: ['@lukeshay/eslint-config-typescript'],
  plugins: ['@typescript-eslint', 'prettier', 'jest'],
  env: {
    browser: true,
    jest: true,
    node: true,
  },
};
