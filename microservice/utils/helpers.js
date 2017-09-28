'use strict'

import { curry } from 'ramda'
import { toEither, prop, either } from 'sanctuary'

// getPropValue :: (String -> Object) -> Either
const safeGetProp = curry((p, obj) =>
toEither(`Prop: ${p} not found`, prop(p, obj)))

const then = curry((fn, thenable) => thenable.then(fn))

const catchP = curry((fn, thenable) => thenable.catch(fn))

// eitherToPromise :: Either -> Promise
const eitherToPromise = e => new Promise((resolve, reject) =>
either(v => reject(new Error(v)), resolve, e))

// testPattern :: (RegEx -> String) -> Boolean
const testPattern = curry((pattern, str) => pattern.test(str))

const alt = curry((fn1, fn2, val) => fn1(val) || fn2(val))

// genRandom :: Integer, Integer -> Integer
const genRandom = (min, max) =>
Math.floor(Math.random() * (max - min + 1)) + min

export default {
  safeGetProp,
  then,
  catchP,
  eitherToPromise,
  testPattern,
  alt,
  genRandom
}
