import UrlData from '../models/UrlData'
import _ from 'ramda'
import Either from 'data.either'
import Task from 'data.task'
const { Left, Right } = Either

// _tap :: a -> a
const _tap = f => {
  console.log(f)
  return f
}

// chain :: (ObjectA -> ObjectB), M -> ObjectB
const chain = _.curry((fn, container) =>
  container.chain(fn))

// getPropValue :: (String -> Object) -> Either
const getPropValue = _.curry((prop, obj) =>
  Either.fromNullable(_.prop(prop, obj)))

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
      .then(data => result(data))
      .catch(err => reject(err)))

const eitherToTask = e => e.fold(Task.rejected, Task.of)

// getShortenedUrl :: Object -> Task
const getShortenedUrl = _.compose(
  chain(findUrlData),
  eitherToTask,
  chain(validateUrl),
  chain(getPropValue('0')),
  getPropValue('params')
)

export default (req, res) => {
  getShortenedUrl(req)
    .fork(
      error => {
        res.render('response', {title: 'Response', response: error})
      },
      response => {
        res.render('response', {title: 'Response', response})
      }
    )
}
