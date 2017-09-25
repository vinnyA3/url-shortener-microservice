// TODO -> add helpful comments && see below ...
import { spawnSync } from 'child_process'
import UrlData from '../models/Url'
import utils from '../utils'
import { compose, prop, curry, tap, props, chain, map } from 'ramda'
import { gets, is, maybeToEither } from 'sanctuary'

const { then, catchP } = utils

const safeGetAndIsString = req => gets(is(String), ['params', 'num'], req) 

const toEither = compose(maybeToEither('Not a valid short url!'), safeGetAndIsString)

// refactor hardcoded uri for production
const find = curry((db, shortUrl) =>
  db.findOne({ shortenedUrl: `localhost:8080/api/${shortUrl}` }))

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
