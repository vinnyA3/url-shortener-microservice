import utils from '../index'
import { Left, Right } from 'sanctuary'

const { eitherToPromise } = utils

it('should return a resolved promise upon input of a Right', () => {
  const value = 'Hello There'
  const right = Right(value)
  const result = eitherToPromise(right)
  return expect(result).resolves.toBe('Hello There')
})

it('should return a rejected promise containing an error upon Left input', () => {
  const errMessage = 'I solemly swear that I am up to no good.'
  const left = Left(errMessage)
  const result = eitherToPromise(left)
  return expect(result).rejects.toBeInstanceOf(Error)
})
