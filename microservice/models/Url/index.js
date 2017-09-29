import mongoose from 'mongoose'
import utils from '../../utils'
import { not, compose, isNil, ifElse, prop } from 'ramda'

const {Schema} = mongoose

const UrlSchema = new Schema({
  url: { type: String, required: true },
  shortenedUrl: { type: String }
})

const Url = mongoose.model('Url', UrlSchema)

UrlSchema.pre('save', function (next) {
  const self = this

  const genUniqueShortUrl = async (rand = utils.getRandom(1000, 9999)) => {
    const searchShortUrl = await Url.findOne({ shortenedUrl: rand })
    if (compose(not, isNil)(searchShortUrl)) {
      await genUniqueShortUrl()
    } else {
      self.shortenedUrl = `${rand}`
      next()
    }
  }
  ifElse(
    compose(not, isNil, prop('shortenedUrl')),
    next(),
    genUniqueShortUrl()
  )
})

module.exports = Url
