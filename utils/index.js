'use strict'
import { curry, prop } from 'ramda'
import { Task } from 'data.task'
import Either from 'data.either'

// eitherToTask :: Either -> Task
const eitherToTask = e => e.fold(Task.rejected, Task.of)

// getPropValue :: (String -> Object) -> Either
const getPropValue = curry((p, obj) =>
  Either.fromNullable(prop(p, obj)))

module.exports = {
  eitherToTask,
  getPropValue
}