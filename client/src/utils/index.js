import { map, chain } from 'most'
import { curry } from 'ramda'

export const curriedMap = curry(map)

export const curriedChain = curry(chain)

