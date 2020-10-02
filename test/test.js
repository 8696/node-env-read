const path = require('path')
const EnvConfig = require('../index')
// const EnvConfig = require('env-config')
const envConfig = new EnvConfig(path.resolve(__dirname, './.env'))
console.log(envConfig.get('PORT'))        // true
