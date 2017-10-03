import { map, chain, recoverWith, throwError } from 'most'
import { curry } from 'ramda'

export const curriedMap = curry(map)

export const curriedChain = curry(chain)

export const curriedRecover = curry(recoverWith)

export const curriedThrow = curry(throwError)
