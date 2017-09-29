import mongoose from 'mongoose'
import utils from '../../utils'
import { not } from 'ramda'

const { Schema } = mongoose

const UrlSchema = new Schema({
  url: { type: String, required: true },
  shortenedUrl: { type: String, required: true }
})

const UrlData = mongoose.model('Url', UrlSchema)

UrlSchema.pre('save', function (next) {
  if (not(this.shortenedUrl)) {
    const random = utils.genRandom(1000, 9999)
    this.shortenedUrl = `${random}`
  }
  next()
})

module.exports = UrlData
