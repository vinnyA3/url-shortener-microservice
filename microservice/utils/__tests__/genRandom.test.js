import utils from '../index'
const { genRandom } = utils

describe('helpers testing', () => {
  it('genRandom should gen random int between min/max', () => {
    const min = 10
    const max = 20
    const result = genRandom(min, max)

    expect(typeof result).toBe('number')
    expect(result).toBeGreaterThanOrEqual(min)
    expect(result).toBeLessThanOrEqual(max)
  })
})
