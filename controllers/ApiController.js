// [] safe get url data from db
// [] implement boolean logic for if we have/don't have
//    the url in the database. ex: if we have, return shortUrl
//    else, create new shortUrl, save it, then return it
import _ from 'ramda'
import Result from 'folktale/data/result'
import Maybe from 'folktale/data/maybe'

/* eslint-disable */
const match = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
/* eslint-enable */

// chain :: (ObjectA -> ObjectB), M -> ObjectB
const chain = _.curry((fn, container) => {
  return container.chain(fn)
})

// getPropValue :: (String -> Object) -> Maybe
const getPropValue = _.curry((prop, obj) => {
  return Maybe.fromNullable(_.prop(prop, obj))
})

// requestParamCheck :: Maybe -> Result
const requestParamCheck = result => Result.fromMaybe(result, 'Invalid Url')

// validate :: RegEx -> String -> Boolean
const validate = _.curry((pattern, str) => pattern.test(str))

// validateUrl :: String -> Result
const validateUrl = url => {
  return validate(match, url)
  ? Result.Ok(url) : Result.Error(`Invalid Url: ${url !== '' ? url : 'Empty'}`)
}

// shortenedUrl :: Object -> Result
const shortenedUrl = _.compose(
  validateUrl,
  chain(_.head),
  requestParamCheck,
  getPropValue('params')
)

export default (req, res) => {
  const response = shortenedUrl(req).merge()
  return res.render('response', { title: 'Response Page', response })
}
