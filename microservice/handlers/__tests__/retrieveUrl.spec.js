import mongoose from 'mongoose'
import { db } from '../../config'
import Url from '../../models/Url'
import retrieveUrl from '../retrieveUrl'
mongoose.Promise = global.Promise

const testUrl = 'http://www.reddit.com'
const testShortenedUrl = '8945'

beforeAll(async () => {
  await mongoose.connect(db)
})

afterAll((done) => {
  mongoose.disconnect(done)
})

beforeEach((done) => {
  const newData = new Url({
    url: testUrl,
    shortenedUrl: testShortenedUrl
  })
  newData.save()
  done()
})

afterEach((done) => {
  Url.remove({})
  done()
})

it('should return a promise', () => {
  const req = requestFactory(testShortenedUrl)
  const result = retrieveUrl(req)
  return expect(result).toBeInstanceOf(Promise)
})

// requestFactory :: String -> Object
function requestFactory (shortenedUrl) {
  return {
    params: {
      '0': shortenedUrl
    }
  }
}
