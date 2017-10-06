// load env vars from .env
require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8080,
  db: process.env.MONGOLAB_URI || 'mongodb://127.0.0.1:27017/url-shortener-service',
  hostname: process.env.HOST || 'http://localhost:8080/api'
}
