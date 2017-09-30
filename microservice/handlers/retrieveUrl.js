// TODO -> add helpful comments
import { spawnSync } from 'child_process'
import UrlData from '../models/Url'
import utils from '../utils'
import { compose, prop, curry, chain, isNil, isEmpty, or } from 'ramda'
import { gets, is, maybeToEither } from 'sanctuary'

const { then } = utils

const safeGetAndIsString = req => gets(is(String), ['params', '0'], req)

const toEither = compose(maybeToEither('Not a valid short url!'), safeGetAndIsString)

const find = curry((db, shortenedUrl) =>
  db.findOne({ shortenedUrl: shortenedUrl }))

const findUrlAsync = shortUrl => find(UrlData, shortUrl)

const fetchUrl = compose(chain(findUrlAsync), toEither)

const open = urlData => {
  spawnSync('xdg-open', [prop('url', urlData)], { timeout: 5000 })
  return urlData
}

const wasFound = data => new Promise((resolve, reject) =>
  or(isNil(data), isEmpty(data))
    ? reject(new Error('url not found!')) : resolve(data))

const fetchAndOpenUrl = compose(then(open), then(wasFound), fetchUrl)

export default fetchAndOpenUrl
