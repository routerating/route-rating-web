import { Config } from '@stencil/core'

export const config: Config = {
  namespace: 'components',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
    },
  ],
  testing: {
    ...require('../../configs/jest.config'),
    testPathIgnorePatterns: ['src/__tests__'],
    transform: undefined,
  },
  tsconfig: './tsconfig.build.json',
}
