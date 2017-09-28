import mongoose from 'mongoose'
import { prop } from 'ramda'
import { db } from '../../config'
import getShortenedUrl from '../getShortenedUrl'
mongoose.Promise = global.Promise

beforeAll(() => {
  mongoose.connect(db)
})

afterAll((done) => {
  mongoose.disconnect(done)
})

it('should return a promise', () => {
  const req = requestFactory()
  const result = getShortenedUrl(req)
  return expect(result).toBeInstanceOf(Promise)
})

it('should resolved to an object', () => {
  const doc = docFactory({
    url: 'http://www.google.com', shortenedUrl: '5972'
  })
  const req = requestFactory()
  const result = getShortenedUrl(req).then(d => d.toJSON())
  return expect(result).resolves.toMatchObject(doc)
})

// requestFactory :: String -> Object
function requestFactory (url = 'http://www.google.com') {
  return {
    params: {
      '0': url
    }
  }
}

function docFactory (fields) {
  return Object.assign({}, fields)
}
