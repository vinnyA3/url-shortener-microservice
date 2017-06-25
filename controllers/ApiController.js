import UrlData from '../models/UrlData'
import _ from 'ramda'
import Either from 'data.either'
import Task from 'data.task'
const { Left, Right } = Either


// alt :: (Function, Function, a) -> Function(a)
const alt = _.curry((fn1, fn2, val) => fn1(val) || fn2(val))

// chain :: (ObjectA -> ObjectB), M -> ObjectB
const chain = _.curry((fn, container) =>
  container.chain(fn))

// eitherToTask :: Either -> Task
const eitherToTask = e => e.fold(Task.rejected, Task.of)

// getPropValue :: (String -> Object) -> Either
const getPropValue = _.curry((prop, obj) =>
  Either.fromNullable(_.prop(prop, obj)))

// validate :: (RegEx -> String) -> Boolean
const validate = _.curry((pattern, str) => pattern.test(str))

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
      .then(data => result(data))
      .catch(err => reject(err)))

const shortUrlGen = () =>
  (Math.floor(100000 + Math.random() * 900000))
    .toString()
    .substring(0, 4)

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
