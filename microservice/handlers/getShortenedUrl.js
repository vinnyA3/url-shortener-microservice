'use strict'

import { compose } from 'ramda'
import { equals, maybeToEither, gets } from 'sanctuary'
import utils from '../utils'

const { testPattern, eitherToPromise, findUrlAsync,
  createUrlAsync, then } = utils

/* eslint-disable */
const pattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
/* eslint-enable */

// validateUrl :: String -> Boolean
const validateUrl = url => equals(testPattern(pattern, url), true)

// safeGetAndValidate :: Object -> Maybe
const safeGetAndValidate = req => gets(validateUrl, ['params', '0'], req)

// validateToEither :: Object -> Either
const validateToEither = compose(maybeToEither(`Invalid Url!`), safeGetAndValidate)

// validateToPromise :: Object -> Promise
const validateToPromise = compose(eitherToPromise, validateToEither)

// findOrCreate :: String -> Promise
const findOrCreate = url =>
  compose(then(res => res || createUrlAsync(url)), findUrlAsync)(url)

// validateThenFindOrCreate :: Object(Request) -> Promise
const validateThenFindOrCreate = compose(then(findOrCreate), validateToPromise)

// export functionality and push side effects down pipe
export default validateThenFindOrCreate
