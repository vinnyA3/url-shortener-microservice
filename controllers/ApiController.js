// [] safe get url data from db
// [] implement boolean logic for if we have/don't have
//    the url in the database. ex: if we have, return shortUrl
//    else, create new shortUrl, save it, then return it
import _ from 'ramda'
import Either from 'data.either'
const { Left, Right } = Either

/* eslint-disable */
const match = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
/* eslint-enable */

// tap :: a -> a
const _tap = f => {
  console.log(f)
  return f
}

// getPropValue :: (String -> Object) -> Maybe
const getPropValue = _.curry((prop, obj) => {
  return Either.fromNullable(_.prop(prop, obj))
})

// requestParamCheck :: Maybe -> Result
const requestParamCheck = result =>
  result ? Right(result) : Left('Param not found')

// validate :: RegEx -> String -> Boolean
const validate = _.curry((pattern, str) => pattern.test(str))

// validateUrl :: String -> Result
const validateUrl = url =>
  validate(match, url)
    ? Right(url)
    : Left(`Invalid Url: ${url !== '' ? url : 'Empty'}`)

// shortenedUrl :: Object -> Result
const shortenedUrl = _.compose(
  _tap,
  _.chain(validateUrl),
  _tap,
  _.map(requestParamCheck),
  getPropValue('params')
)

export default (req, res) => {
  const response = shortenedUrl(req).merge()
  return res.render('response', { title: 'Response Page', response })
}
