'use strict'
// Import Url Data Model
import Url from '../models/Url'
import { compose, curry, chain } from 'ramda'
import { Right, Left, equals } from 'sanctuary'
import { safeGetProp, then, catchP } from '../utils'

// eslint-disable-next-line
const pattern =
  /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/

// testPattern :: (RegEx -> String) -> Boolean
const testPattern = curry((pattern, str) => pattern.test(str))

// validate :: String -> Either(String)
const validate = url => equals(testPattern(pattern, url), true)
  ? Right(url) : Left(`Error: ${url} is not a valid url`)

const validateUrl = compose(chain(validate), safeGetProp('0'))

const getAndValidateUrl = compose(chain(validateUrl), safeGetProp('params'))

// find :: DB, String -> Promise(Url)
const find = (db, url) => db.findOne({ url })

// fetchUrlDBAsync :: DB -> String -> Promise(Url)
const fetchUrlDBAsync = curry((db, url) => find(db, url))

const findUrlAsync = fetchUrlDBAsync(Url)

const validateAndFindUrl = compose(chain(findUrlAsync), getAndValidateUrl)

export default (req, res) => {
  const result = compose(
    catchP(err => res.render('response', {title: 'Response', response: err})),
    then(result => res.render('response', {title: 'Response', response: result})),
    validateAndFindUrl
  )
  result(req)
}
