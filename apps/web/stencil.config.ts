import { Config } from '@stencil/core';
import { sass } from '@stencil/sass'

export const config: Config = {
  globalStyle: 'src/global/app.scss',
  globalScript: 'src/global/app.ts',
  taskQueue: 'async',
  outputTargets: [
    {
      type: 'www',
      serviceWorker: {
        globPatterns: [
          '**/*.{js,css,json,html,ico,png}'
        ],
        unregister: true
      },
      prerenderConfig: './prerender.config.ts',
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
    ...require('../../configs/jest.config'),
    testPathIgnorePatterns: ["src/__tests__"],
    transform: undefined
  }
};
