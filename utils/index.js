'use strict'

import { curry } from 'ramda'
import { toEither, prop, either } from 'sanctuary'

// getPropValue :: (String -> Object) -> Either
export const safeGetProp = curry((p, obj) =>
  toEither(`Prop: ${p} not found`, prop(p, obj)))

export const then = curry((fn, thenable) => thenable.then(fn))

export const catchP = curry((fn, thenable) => thenable.catch(fn))

// eitherToPromise :: Either -> Promise
export const eitherToPromise = e => new Promise((resolve, reject) =>
  either(v => reject(new Error(v)), resolve, e))

// testPattern :: (RegEx -> String) -> Boolean
export const testPattern = curry((pattern, str) => pattern.test(str))
