import {model, Schema} from 'mongoose'

const urlDataSchema = new Schema({
  url: String,
  shortenedUrl: String
})

export default model('UrlData', urlDataSchema)
