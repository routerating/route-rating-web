import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import strip from '@rollup/plugin-strip';
import { terser } from 'rollup-plugin-terser';

export default {
  input: 'src/main.ts',
  output: [
    {
      file: pkg.cjs,
      format: 'cjs',
    },
    {
      file: pkg.es,
      format: 'es',
    },
    {
      file: pkg.umd,
      format: 'umd',
      name: 'routeRating',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {})],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    terser(),
    resolve(),
    commonjs(),
    strip(),
  ],
};
