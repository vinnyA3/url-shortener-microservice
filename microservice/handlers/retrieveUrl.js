// TODO -> add helpful comments
// + add some graceful err handling + fn renames + partial binding
import { spawnSync } from 'child_process'
import UrlData from '../models/Url'
import utils from '../utils'
import { compose, prop, curry, chain } from 'ramda'
import { gets, is, maybeToEither } from 'sanctuary'

const { then, catchP } = utils

const safeGetAndIsString = req => gets(is(String), ['params', '0'], req) 

const toEither = compose(maybeToEither('Not a valid short url!'), safeGetAndIsString)

const find = curry((db, shortenedUrl) =>
  db.findOne({ shortenedUrl: shortenedUrl }))

const findUrlAsync = shortUrl => find(UrlData, shortUrl)

const fetchUrl = compose(chain(findUrlAsync), toEither)

const openUrl = url => {
  const subprocess = spawnSync('xdg-open', [url], { timeout: 5000 })
  return url
}

export default (req, res) => compose(
  catchP(err => res.render('response', {title: 'Response', response: err})),
  then(url => res.render('response', {title: 'Response', response: url})),
  then(openUrl),
  then(prop('url')),
  fetchUrl
)(req)
