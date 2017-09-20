'use strict'

import { compose, curry, isNil, tap } from 'ramda'
import { equals, maybeToEither, gets } from 'sanctuary'
import { then, catchP, eitherToPromise, testPattern,
  alt } from '../utils'

// eslint-disable-next-line
const pattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

// validateUrl :: String -> Either(String)
const validateUrl = url => equals(testPattern(pattern, url), true)

const safeGetAndValidate = req => gets(validateUrl, ['params', '0'], req)

const validateToEither = compose(maybeToEither(`Invalid Url!`), safeGetAndValidate)

const validateToPromise = compose(eitherToPromise, validateToEither)

// find :: DB, String -> Promise(Url)
const find = async (db, url) => {
	const result = await db.findOne({ url })
	return isNil(result) ? false : new Promise((resolve, reject) =>
		resolve(result))
} 

// fetchUrlDBAsync :: DB -> String -> Promise(Url)
const fetchUrlDBAsync = curry((db, url) => find(db, url))

// findUrlAsync :: String -> Promise
const findUrlAsync = fetchUrlDBAsync(Url)

const create = (db, url) => db.create({ url })

const createUrlDBAsync = curry((db, url) => create(db, url))

const createUrlAsync = createUrlDBAsync(Url)

const findOrCreate = alt(compose(tap(console.log), findUrlAsync), createUrlAsync)

const validateAndPerform = compose(then(findOrCreate), validateToPromise)

export default (req, res) => compose(
  catchP(err => res.render('response', {title: 'Response', response: err})),
  then(result => res.render('response', {title: 'Response', response: result})),
  validateAndPerform
)(req)
