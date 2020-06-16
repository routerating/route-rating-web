import { Config } from '@stencil/core';
import { sass } from '@stencil/sass'

// https://stenciljs.com/docs/config

export const config: Config = {
  globalStyle: 'src/global/app.css',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      // comment the following line to disable service workers in production
      serviceWorker: {
        globPatterns: [
          '**/*.{js,css,json,html,ico,png}'
        ]
      },
      baseUrl: 'https://lukeshay.com/'
    }
  ],
  plugins: [
    sass({
      injectGlobalPaths: [
        'src/global/variables.scss'
      ]
  })],
  testing: {
    testPathIgnorePatterns: ["src/__tests__"],
    collectCoverageFrom: [
      'src/**/*.ts',
      'src/**/*.tsx',
      '!**/*.d.ts',
      '!**/types.ts',
      '!**/*.spec.*',
      '!**/*.e2e.*',
      '!dist/**/*',
      '!src/index.ts',
      '!**/__tests__/**/*',
    ],
    coverageThreshold: {
      global: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100
      }
    },
    coverageReporters: ['lcov'],
    reporters: ['default'],
  }
};
