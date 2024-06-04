const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const httpProxy = require('http-proxy');
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const proxy = httpProxy.createProxyServer({});
const fs = require('fs');
const path = require('path');


app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

// Locates your .json to know the hostname <-> port relation
const configPath = path.join(__dirname, 'hostname.json');
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

app.use((req, res) => {
  // Checks if the hostname is present on the .json file
  const backendPort = config[req.hostname] || null;
  logger.info(`Redirecting to port ${backendPort}`);
if (backendPort) {
    // If ok redirects to backendPort set on .json file
    proxy.web(req, res, { target: `http://localhost:${backendPort}` });
  } else {
    // If nok send 404 "Backend not found"
    res.status(404).send('Backend not found');
  }
});

proxy.on('error', (err, req, res) => {
  res.status(500).send('Internal error');
});

app.use(middleware.unknownEndpoint)

module.exports = app
