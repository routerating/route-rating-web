import { createRollupConfig, typescript } from '@lukeshay/rollup-config'

import pkg from './package.json'

export default (args) =>
  createRollupConfig(args, pkg, [
    typescript({
      tsconfig: './tsconfig.json',
      useTsconfigDeclarationDir: true,
      tsconfigOverrides: {
        exclude: ['**/*.spec.ts', '**/*.e2e.ts'],
      },
    }),
  ])
