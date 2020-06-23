import { createRollupConfig, typescript } from '@lukeshay/rollup-config'

import pkg from './package.json'

export default createRollupConfig(pkg, [
  typescript({
    tsconfig: './tsconfig.json',
    tsconfigOverrides: {
      exclude: ['**/*.spec.ts', '**/*.e2e.ts'],
    },
  }),
])
