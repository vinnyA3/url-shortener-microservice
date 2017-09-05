import mongoose from 'mongoose'
import { genRandom } from '../../utils'
const {Schema} = mongoose

const UrlSchema = new Schema({
  url: { type: String, required: true },
  shortenedUrl: { type: String }
})

UrlSchema.pre('save', function (next) {
  const random = genRandom(1000, 9999)
  this.shortenedUrl = `${random}`
  next()
})

module.exports = mongoose.model('Url', UrlSchema)
