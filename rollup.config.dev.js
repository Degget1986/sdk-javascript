import eslint from 'rollup-plugin-eslint';
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
  watch: {
    chokidar: true,
    exclude: ['node_modules/**']
  },
  plugins: [
    eslint()
  ]
};
