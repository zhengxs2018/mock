export default {
  entry: './src/index.ts',
  esm: 'rollup',
  cjs: 'rollup',
  umd: {
    name: 'aMock',
    minFile: true,
    globals: {
      'better-mock': 'Mock',
      "path-to-regexp": "pathToRegexp",
      'tslib': 'window',
    }
  },
  extraExternals: [
    "better-mock",
    "path-to-regexp",
    "tslib"
  ],
  replace: {
    __VERSION__: require('./package.json').version
  }
}
