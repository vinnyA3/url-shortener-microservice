'use strict'

import { compose, curry, isNil, tap } from 'ramda'
import { equals, maybeToEither, gets } from 'sanctuary'
import { then, catchP, eitherToPromise, testPattern,
	findUrlAsync, createUrlAsync } from '../utils'

console.log(then)

// eslint-disable-next-line
const pattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
const alt = curry((fn1, fn2, val) => fn1(val) || fn2(val))

// validateUrl :: String -> Either(String)
const validateUrl = url => equals(testPattern(pattern, url), true)

const safeGetAndValidate = req => gets(validateUrl, ['params', '0'], req)

const validateToEither = compose(maybeToEither(`Invalid Url!`), safeGetAndValidate)

const validateToPromise = compose(eitherToPromise, validateToEither)

const findOrCreate = alt(findUrlAsync, createUrlAsync)

const validateAndPerform = compose(then(findOrCreate), tap(console.log), validateToPromise)

export default (req, res) => compose(
  catchP(err => res.render('response', {title: 'Response', response: err})),
  then(result => res.render('response', {title: 'Response', response: result})),
  validateAndPerform
)(req)
