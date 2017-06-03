// [] safe get url data from db
// [] implement boolean logic for if we have/don't have
//    the url in the database. ex: if we have, return shortUrl
//    else, create new shortUrl, save it, then return it

import _ from 'ramda'

/* eslint-disable */
const match = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
/* eslint-enable */

// getRequestParams :: Object -> String
const getRequestParams = req => _.prop('params', req)

// validate :: RegEx -> String -> Boolean
const validate = _.curry((pattern, str) => pattern.test(str))

// isUrlValid :: Object -> Boolean
const isUrlValid = _.compose(
  validate(match),
  _.head,
  getRequestParams
)

export default (req, res) => {
  const response = isUrlValid(req) ? 'Valid Url' : 'Invalid Url'
  return res.render('response', { title: 'Response Page', response })
}
