import UrlData from '../models/UrlData'
import { compose, curry, prop, chain } from 'ramda'
import Either from 'data.either'
import Task from 'data.task'
const { Left, Right } = Either

// eitherToTask :: Either -> Task
const eitherToTask = e => e.fold(Task.rejected, Task.of)

// getPropValue :: (String -> Object) -> Either
const getPropValue = curry((p, obj) =>
  Either.fromNullable(prop(p, obj)))

// validate :: (RegEx -> String) -> Boolean
const validate = curry((pattern, str) => pattern.test(str))

// validateUrl :: Either(String) -> Either(String)
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
      .then(data => result(Either.fromNullable(data)))
      .catch(err => reject(err)))

// getShortenedUrl :: Object -> Task
const getShortenedUrl = compose(
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
