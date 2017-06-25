import UrlData from '../models/UrlData'
import _ from 'ramda'
import Either from 'data.either'
import Task from 'data.task'
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

// findUrlData :: Either(String) -> Task(Object)
const findUrlData = url =>
  new Task((reject, result) =>
    UrlData.findOne({ url })
      .then(err => reject(err))
      .then(data => result(data)))

// shortenedUrl :: Object -> Either
const shortenedUrl = _.compose(
  chain(findUrlData),
  chain(validateUrl),
  chain(requestParamCheck),
  map(_.prop('0')),
  getPropValue('params')
)

export default (req, res) => {
  shortenedUrl(req)
    .fork(console.error, (data) =>
      res.render('response', {title: 'Response', response: data}))
}
