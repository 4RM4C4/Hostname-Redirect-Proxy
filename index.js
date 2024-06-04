const https = require('https')
const app = require('./app')
const config = require('./utils/config')

https.createServer(config.CREDENTIALS, app).listen(config.PORT)
