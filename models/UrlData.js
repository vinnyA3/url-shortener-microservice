const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* eslint-disable */
const match = [
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
  'Please use a valid URL! Ex: http://www.foobar.com'
]
/* eslint-enable */
const urlDataSchema = new Schema({
  url: {
    type: String,
    match: match
  },
  shortenedUrl: String
})

module.exports = mongoose.model('UrlData', urlDataSchema)
