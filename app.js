const express = require('express');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const cors = require('cors');
require('express-async-errors');
const app = express();
const sequelize = require('./config/database');
const Url = require('./models/url');
const logger = require('./utils/logger');

app.use(cors());

const cache = new Map();

app.use(async (req, res, next) => {
  const hostname = req.hostname;
  const cachedUrl = cache.get(hostname);

  if (cachedUrl && cachedUrl.expiry > Date.now()) {
    return proxyRequest(cachedUrl.url, req, res, next);
  }

  try {
    const url = await Url.findOne({ where: { hostname } });
    if (url && url.status === true) {
      cache.set(hostname, { url, expiry: Date.now() + 10000 });
      return proxyRequest(url, req, res, next);
    } else {
      res.status(503).send('Service Unavailable');
    }
  } catch (error) {
    console.error('Error in proxy middleware:', error);
    res.status(500).send('Internal Server Error');
  }
});

function proxyRequest(url, req, res, next) {
  const target = `http://localhost:${url.port}`;
  createProxyMiddleware({
    target,
    changeOrigin: true,
    onProxyReq: fixRequestBody,
  })(req, res, next);
}

sequelize.sync()
  .then(() => {
    logger.info('Database & tables created!');
  })
  .catch(err => {
    logger.error('Unable to connect to the database:', err);
  });

module.exports = app;

