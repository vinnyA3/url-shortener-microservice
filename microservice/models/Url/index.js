import mongoose from 'mongoose'
import utils from '../../utils'
import { not, compose, isNil, ifElse, prop } from 'ramda'

const {Schema} = mongoose

const UrlSchema = new Schema({
  url: { type: String, required: true },
  shortenedUrl: { type: String }
})

UrlSchema.pre('save', function (next) {
  const Url = mongoose.model('Url', UrlSchema)
  const self = this

  ifElse(
    compose(isNil, prop('shortenedUrl')),
    genUniqueShortUrl,
    next
  )(self)

  async function genUniqueShortUrl (doc, rand = utils.genRandom(1000, 9999)) {
    const query = await Url.findOne({ shortenedUrl: rand })
    if (compose(not, isNil)(query)) {
      await genUniqueShortUrl(doc)
    } else {
      doc.shortenedUrl = `${rand}`
      next()
    }
  }
})

module.exports = mongoose.model('Url', UrlSchema)
