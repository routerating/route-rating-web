module.exports = {
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/types.ts',
    '!**/*.spec.*',
    '!**/*.e2e.*',
    '!src/index.ts',
    '!**/__tests__/**/*',
  ],
  resetMocks: true,
  verbose: true,
  coverageThreshold: {
    global: {
      statements: 100,
      branches: 100,
      functions: 100,
      lines: 100,
    },
  },
  transform: {
    '^.+.(ts|tsx)$': 'ts-jest',
  },
  coverageReporters: ['lcov'],
  reporters: ['default', 'jest-junit'],
  // eslint-disable-next-line prettier/prettier
  testRegex: '(test|spec).(js|jsx|ts|tsx)$'
}
