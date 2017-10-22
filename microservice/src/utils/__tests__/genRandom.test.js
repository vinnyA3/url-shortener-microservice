import utils from '../index'
const { genRandom } = utils

describe('helpers testing', () => {
  it('genRandom should gen random string of len 5', () => {
    const result = genRandom()
    expect(typeof result).toBe('string')
    expect(result).toHaveLength(5)
  })
})
