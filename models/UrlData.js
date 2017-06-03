import mongoose from 'mongoose'
const {Schema} = mongoose

const urlDataSchema = new Schema({
  url: String,
  shortenedUrl: String
})

module.exports = mongoose.model('UrlData', urlDataSchema)
