import _ from 'ramda'
import Either from 'data.either'
const { Left, Right } = Either

// map :: (ObjectA -> ObjectB), M -> M[ObjectB]
const map = _.curry((fn, container) =>
  container.map(fn))

// chain :: (ObjectA -> ObjectB), M -> ObjectB
const chain = _.curry((fn, container) =>
  container.chain(fn))

// getPropValue :: (String -> Object) -> Either
const getPropValue = _.curry((prop, obj) =>
  Either.fromNullable(_.prop(prop, obj)))

// requestParamCheck :: Right -> Either
const requestParamCheck = result =>
  result ? Right(result) : Left('Param not found')

// validate :: RegEx -> String -> Boolean
const validate = _.curry((pattern, str) => pattern.test(str))

// validateUrl :: Either(String) -> Either
const validateUrl = url =>
  validate(
    // eslint-disable-next-line
    /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/,
    url
  ) ? Right(url) : Left(`Invalid Url: ${url}`)

// shortenedUrl :: Object -> Either
const shortenedUrl = _.compose(
  chain(validateUrl),
  chain(requestParamCheck),
  map(_.prop('0')),
  getPropValue('params')
)

export default (req, res) => {
  const response = shortenedUrl(req).merge()
  return res.render('response', { title: 'Response Page', response })
}
