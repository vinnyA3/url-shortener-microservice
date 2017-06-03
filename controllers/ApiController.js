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
