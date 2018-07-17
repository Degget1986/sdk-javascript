import eslint from 'rollup-plugin-eslint';
import buble from 'rollup-plugin-buble';
import sourceMaps from 'rollup-plugin-sourcemaps';
import json from 'rollup-plugin-json';

const pkg = require('./package.json');

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'lib/ambrosus.cjs.js',
      format: 'cjs',
      banner: '/* Ambrosus Javascript SDK v' + pkg.version + ' */',
      sourcemap: true
    },
    {
      file: 'lib/ambrosus.js',
      format: 'iife',
      name: 'AmbrosusSDK',
      banner: '/* Ambrosus Javascript SDK v' + pkg.version + ' */',
      sourcemap: true
    }
  ],
  watch: {
    chokidar: true,
    exclude: ['node_modules/**']
  },
  plugins: [json(), eslint(), buble(), sourceMaps()]
};
