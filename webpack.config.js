function config () {
  switch (process.env.NODE_ENV) {
    case 'production':
      return 'production'
    case 'test':
      return 'test'
    default:
      return 'development'
  }
}

module.exports = require(`./webpack.${config()}.config.js`)
