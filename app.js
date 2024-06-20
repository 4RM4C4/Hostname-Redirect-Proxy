const express = require('express');
const { createProxyMiddleware, fixRequestBody } = require('http-proxy-middleware');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(cors());

app.use((req, res, next) => {
  const hostnamePath = path.join(__dirname, 'hostname.json');
  const hostnameConfig = JSON.parse(fs.readFileSync(hostnamePath, 'utf-8'));
  if(hostnameConfig[req.hostname] && hostnameConfig[req.hostname].status === "online"){
    const target = `http://localhost:${hostnameConfig[req.hostname].port}`;
    createProxyMiddleware({
      target,
      changeOrigin: true,
      onProxyReq: fixRequestBody,
    })(req, res, next);
  } else {
    res.status(503).send('Service Unavailable');
  }
});

module.exports = app;
