import { identity } from 'ramda'
import utils from '../index'

const { catchP } = utils

it('should return a promise', () => {
  const fn = identity
  const result = catchP(fn, Promise.reject(new Error('poop')))
  return expect(result).toBeInstanceOf(Promise)
})
