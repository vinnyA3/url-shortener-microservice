import mongoose from 'mongoose'
import utils from '../../utils'

const {Schema} = mongoose

const UrlSchema = new Schema({
  url: { type: String, required: true },
  shortenedUrl: { type: String }
})

UrlSchema.pre('save', async function (next) {
  const random = utils.genRandom(1000, 9999)
  this.shortenedUrl = `${random}`
  next()
})

module.exports = mongoose.model('Url', UrlSchema)
