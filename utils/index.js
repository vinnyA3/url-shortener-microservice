'use strict'

import { curry } from 'ramda'
import { toEither, prop } from 'sanctuary'

// getPropValue :: (String -> Object) -> Either
export const safeGetProp = curry((p, obj) =>
  toEither(`Prop: ${p} not found`, prop(p, obj)))

export const then = curry((fn, thenable) => thenable.then(fn))

export const catchP = curry((fn, thenable) => thenable.catch(fn))
