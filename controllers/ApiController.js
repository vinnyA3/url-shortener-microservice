'use strict'
// Import Url Data Model
import Url from '../models/Url'
import { compose, curry, chain } from 'ramda'
import { Right, Left, equals } from 'sanctuary'
import { safeGetProp, then, catchP, eitherToPromise, testPattern } from '../utils'

// eslint-disable-next-line
const pattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

// validateUrl :: String -> Either(String)
const validateUrl = url => equals(testPattern(pattern, url), true)
  ? Right(url) : Left(`${url} is not a valid url`)

const safeGetQueryParams = compose(chain(safeGetProp('0')), safeGetProp('params'))

const promiseGetAndValidate = compose(
  eitherToPromise,
  chain(validateUrl),
  safeGetQueryParams
)

// find :: DB, String -> Promise(Url)
const find = (db, url) => db.findOne({ url })

// fetchUrlDBAsync :: DB -> String -> Promise(Url)
const fetchUrlDBAsync = curry((db, url) => find(db, url))

// findUrlAsync :: String -> Promise
const findUrlAsync = fetchUrlDBAsync(Url)

const validateAndFindUrl = compose(then(findUrlAsync), promiseGetAndValidate)

export default (req, res) => compose(
  catchP(err => res.render('response', {title: 'Response', response: err})),
  then(result => res.render('response', {title: 'Response', response: result})),
  validateAndFindUrl
)(req)
