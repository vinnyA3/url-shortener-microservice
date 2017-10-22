import mongoose from 'mongoose'
import utils from '../../utils'
import { not, compose, isNil, ifElse, prop } from 'ramda'
// This var introduces an additional side effect into our 'relatively' pure
// genUniqueShortUrl function located in the sole pre-save hook
import { hostname } from '../../../config'

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

  async function genUniqueShortUrl (doc, rand = utils.genRandom()) {
    const query = await Url.findOne({ shortenedUrl: rand })
    if (compose(not, isNil)(query)) {
      await genUniqueShortUrl(doc)
    } else {
      doc.shortenedUrl = `${hostname}/${rand}`
      next()
    }
  }
})

module.exports = mongoose.model('Url', UrlSchema)
