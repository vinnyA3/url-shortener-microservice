import utils from '../index'

const { alt } = utils

it('should return the result of the function argument', () => {
  const value = 'Hello from: '
  const fn1 = val => val + 'function1'
  const fn2 = val => val + 'function2'
  const result = alt(fn1, fn2, value)
  expect(result).toBe('Hello from: function1')
})

it(`should return the result of the second function argument\
when first function results to false`, () => {
  const value = 'Hello from: '
  const fn1 = val => false
  const fn2 = val => val + 'function2'
  const result = alt(fn1, fn2, value)
  expect(result).toBe('Hello from: function2')
})

it(`should return the result of the second function argument\
when first function results to null`, () => {
  const value = 'Hello from: '
  const fn1 = val => null
  const fn2 = val => val + 'function2'
  const result = alt(fn1, fn2, value)
  expect(result).toBe('Hello from: function2')
})

it(`should return the result of the second function argument\
when first function results to undefined`, () => {
  const value = 'Hello from: '
  const fn1 = val => undefined
  const fn2 = val => val + 'function2'
  const result = alt(fn1, fn2, value)
  expect(result).toBe('Hello from: function2')
})
