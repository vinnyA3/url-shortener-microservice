import _ from 'ramda'
/* eslint-disable */
const match = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
/* eslint-enable */

const requestLens = _.lensProp('params')

const getRequestParams = _.curry((lens, reqObj) => _.view(lens, reqObj))

const validate = _.curry((pattern, url) => pattern.test(url))

const isValidUrl = _.compose(
  validate(match),
  _.head,
  getRequestParams(requestLens)
)

export const getUrlData = (req, res) => {
  const response = isValidUrl(req) ? 'Valid Url' : 'Invalid Url'
  return res.render('response', { title: 'Response Page', response })
}

