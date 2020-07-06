import { createRollupConfig } from '@lukeshay/rollup-config'
import pkg from './package.json'

export default (args) => createRollupConfig(args, pkg)
