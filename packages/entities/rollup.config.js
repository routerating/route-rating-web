import { createRollupConfig, typescript } from '@lukeshay/rollup-config'

import pkg from './package.json'

export default createRollupConfig(pkg, [
  typescript({ tsconfig: './tsconfig.build.json' }),
])
