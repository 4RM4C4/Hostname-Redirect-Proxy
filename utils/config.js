require('dotenv').config()
const fs = require('fs');

// Change 12345 for your listening port
const PORT = process.env.PORT || 12345

// Locate your credentials for HTTPS
const CREDENTIALS = { key: fs.readFileSync("/etc/letsencrypt/live/yoursite.com.ar/privkey.pem"),
	cert: fs.readFileSync("/etc/letsencrypt/live/yoursite.com.ar/fullchain.pem")
}

module.exports = {
  PORT,
  CREDENTIALS
}
