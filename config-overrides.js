const {
  override,
  addBabelPreset,
  addLessLoader,
  fixBabelImports,
} = require('customize-cra')
const Dotenv = require('dotenv-webpack')

const dotenvPlugin = (config) => {
  config.plugins.push(
    new Dotenv({
      path: process.env.ENV_FILE || './.env',
      systemvars: true,
      safe: true,
      allowEmptyValues: true,
    })
  )
  return config
}

module.exports = override(
  addBabelPreset('@emotion/babel-preset-css-prop'),
  dotenvPlugin,
  fixBabelImports('antd', {
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  }),
  addLessLoader({
    javascriptEnabled: true,
    lessOptions: {
      javascriptEnabled: true,
    },
    modifyVars: {
      '@primary-color': '#FAAAAA',
      '@border-radius-base': '20px',
    },
  })
)
