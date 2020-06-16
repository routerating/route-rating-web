module.exports = {
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/types/**',
    '!**/__mocks__/**',
    '!**/__tests__/**',
    '!**/*.test.*',
    '!**/*.spec.*',
    '!dist/**/*',
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 70,
      lines: 80,
    },
  },
  transform: {
    '^.+.(ts|tsx)$': 'ts-jest',
  },
  coverageReporters: ['lcov'],
  reporters: ['default', 'jest-junit'],
  // eslint-disable-next-line prettier/prettier
  testRegex: '(test|spec).(js|jsx|ts|tsx)$',
};
