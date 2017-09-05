'use strict'
// Import Url Data Model
import Url from '../models/Url'
import { compose, curry } from 'ramda'
import { equals, maybeToEither, gets } from 'sanctuary'
import { then, catchP, eitherToPromise, testPattern } from '../utils'

// eslint-disable-next-line
const pattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

// validateUrl :: String -> Either(String)
const validateUrl = url => equals(testPattern(pattern, url), true)

const safeGetAndValidate = req => gets(validateUrl, ['params', '0'], req)

const validateToEither = compose(maybeToEither(`Invalid Url!`), safeGetAndValidate)

const validateToPromise = compose(eitherToPromise, validateToEither)

// find :: DB, String -> Promise(Url)
const find = (db, url) => db.findOne({ url })

// fetchUrlDBAsync :: DB -> String -> Promise(Url)
const fetchUrlDBAsync = curry((db, url) => find(db, url))

// findUrlAsync :: String -> Promise
const findUrlAsync = fetchUrlDBAsync(Url)

const validateAndFindUrl = compose(then(findUrlAsync), validateToPromise)

export default (req, res) => compose(
  catchP(err => res.render('response', {title: 'Response', response: err})),
  then(result => res.render('response', {title: 'Response', response: result})),
  validateAndFindUrl
)(req)
