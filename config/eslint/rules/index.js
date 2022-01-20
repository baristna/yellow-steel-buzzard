const formatRules = require('./formating')
const importRules = require('./import')
const syntaxRules = require('./syntax')
const reactRules = require('./react')

module.exports = Object.assign(
  {},
  formatRules,
  importRules,
  syntaxRules,
  reactRules
)
