'use strict'

import { curry, prop } from 'ramda'
import { toEither, either } from 'sanctuary'

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

export const alt = curry((fn1, fn2, val) => fn1(val) || fn2(val))

// genRandom :: Integer, Integer -> Integer
export const genRandom = (min, max) =>
Math.floor(Math.random() * (max - min + 1)) + min
