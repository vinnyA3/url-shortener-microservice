'use strict'

import { compose, curry, isNil, tap } from 'ramda'
import { equals, maybeToEither, gets } from 'sanctuary'
import utils from '../utils'

const { testPattern, eitherToPromise, alt,
	findUrlAsync, createUrlAsync, then, catchP } = utils

// eslint-disable-next-line
const pattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

// validateUrl :: String -> Boolean
const validateUrl = url => equals(testPattern(pattern, url), true)

// safeGetAndValidate :: Object -> Maybe
const safeGetAndValidate = req => gets(validateUrl, ['params', '0'], req)

// validateToEither :: Object -> Either
const validateToEither = compose(maybeToEither(`Invalid Url!`), safeGetAndValidate)

// validateToPromise :: Object -> Promise
const validateToPromise = compose(eitherToPromise, validateToEither)

// findOrCreate :: String -> Promise
// const findOrCreate = alt(findUrlAsync, createUrlAsync)

// validateAndPerform :: Object(Request) -> Promise
const validateAndPerform = compose(
  then(url => compose(
    then(res => res || createUrlAsync(url)), findUrlAsync(url)
  )(url)),
  validateToPromise
)

// export functionality and push side effects down pipe
export default (req, res) => compose(
  catchP(err => res.render('response', {title: 'Response', response: err})),
  then(result => res.render('response', {title: 'Response', response: result})),
  validateAndPerform
)(req)
