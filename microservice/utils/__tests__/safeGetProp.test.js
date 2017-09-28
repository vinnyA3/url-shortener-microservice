import { isLeft, isRight } from 'sanctuary'
import utils from '../index'

const { safeGetProp } = utils

describe('safeGetProp', () => {
  it('should return an Either<Right>', () => {
    const prop = 'message'
    const obj = { message: 'There is always a lighthouse...' }
    const result = safeGetProp(prop, obj)
    expect(isRight(result)).toBe(true)
  })

  it('should return an Either<Left>', () => {
    const prop = 'message'
    const obj = { username: 'Booker Dewitt' }
    const result = safeGetProp(prop, obj)
    expect(isLeft(result)).toBe(true)
  })
})
