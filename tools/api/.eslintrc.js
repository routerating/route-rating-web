require('@lukeshay/eslint-config-typescript/patch');

module.exports = {
  extends: ['@lukeshay/eslint-config-typescript'],
  env: {
    browser: true,
    jest: true,
    node: true,
  },
};
