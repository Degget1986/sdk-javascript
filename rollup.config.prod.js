import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/ambrosus.cjs.js',
      format: 'cjs'
    },
    {
      file: 'lib/ambrosus.js',
      format: 'iife',
      name: 'AmbrosusSDK'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    })
  ]
};
