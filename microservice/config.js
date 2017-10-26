// load env vars from .env
require('dotenv').config()

module.exports = {
  port: process.env.PORT || 8000,
  db: process.env.MONGOLAB_URI || process.env.DB_LOCAL,
  hostname: process.env.HOST || 'http://localhost:8000/api'
}
