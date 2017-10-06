import utils from '../index'

const { testPattern } = utils

describe('testPattern util', () => {
  it('string should match pattern and return true', () => {
    const string = 'abc123'
    const pattern = /^[\w\d]/g
    const result = testPattern(pattern, string)
    expect(result).toEqual(true)
  })

  it('string should not match pattern and return false', () => {
    const string = ''
    const pattern = /pokemon/
    const result = testPattern(pattern, string)
    expect(result).toEqual(false)
  })
})
