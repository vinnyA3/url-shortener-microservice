import { identity } from 'ramda'
import utils from '../index'

const { then } = utils

it('should return a promise', () => {
  const fn = identity
  const result = then(fn, Promise.resolve(5))
  return expect(result).toBeInstanceOf(Promise)
})
