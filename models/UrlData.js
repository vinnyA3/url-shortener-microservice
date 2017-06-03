const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlDataSchema = new Schema({
  url: String,
  shortenedUrl: String
})

export default mongoose.model('UrlData', urlDataSchema)
