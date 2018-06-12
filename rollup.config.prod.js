import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import minify from 'rollup-plugin-babel-minify';

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/ambrosus.cjs.min.js',
      format: 'cjs'
    },
    {
      file: 'lib/ambrosus.min.js',
      format: 'iife',
      name: 'AmbrosusSDK'
    }
  ],
  plugins: [
    resolve(),
    babel({
      exclude: 'node_modules/**' // only transpile our source code
    }),
    minify({
      comments: false
    })
  ]
};
