const env = require('./env')
const parserOptions = require('./parserOptions')
const plugins = require('./plugins')
const rules = require('./rules')
const overrides = require('./overrides')

module.exports = {
  env,
  parser: 'babel-eslint',
  parserOptions,
  plugins,
  rules,
  overrides,
}
