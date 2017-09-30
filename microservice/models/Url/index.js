import mongoose from 'mongoose'
import utils from '../../utils'
import { not, compose, isNil, ifElse, prop } from 'ramda'

const {Schema} = mongoose

const UrlSchema = new Schema({
  url: { type: String, required: true },
  shortenedUrl: { type: String }
})

UrlSchema.pre('save', function (next) {
  const self = this

  ifElse(
    compose(isNil, prop('shortenedUrl')),
    genShortUrl,
    next
  )(self)

  function genShortUrl (doc) {
    doc.shortenedUrl = `${utils.genRandom(1000, 9999)}`
    next()
  }
})

module.exports = mongoose.model('Url', UrlSchema)
