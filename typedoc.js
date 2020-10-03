const pkg = require('./package.json')

module.exports = {
  name: pkg.name,
  mode: 'modules',
  readme: './README.md',
  gitRevision: 'master',
  out: 'docs',
  inputFiles: ['./src'],
  excludePrivate: true,
  excludeExternals: true,
  excludeNotExported: true,
  exclude: ['src/index.ts', 'src/**/*.spec.ts', 'src/**/*.test.ts'],
  ignoreCompilerErrors: true
}
