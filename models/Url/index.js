import mongoose from 'mongoose'
const {Schema} = mongoose

const UrlSchema = new Schema({
  url: String,
  shortenedUrl: String
})

module.exports = mongoose.model('Url', UrlSchema)
