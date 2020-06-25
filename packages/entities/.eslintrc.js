module.exports = {
  extends: ['../../configs/.eslintrc'],
  parserOptions: {
    project: './tsconfig.json',
  },
  ignorePatterns: ['*.config.js', '.eslintrc.js'],
}
