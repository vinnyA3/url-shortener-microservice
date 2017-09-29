import mongoose from 'mongoose'
import { db } from '../../config'
import UrlData from '../../models/Url'
import retrieveUrl from '../retrieveUrl'
mongoose.Promise = global.Promise

const testUrl = 'http://www.reddit.com'
const testShortenedUrl = '8945'

beforeAll(async () => {
  mongoose.connect(db)
  const newData = new UrlData({
    url: testUrl,
    shortenedUrl: testShortenedUrl
  })
  await newData.save(err => {
    if (err) console.log(err)
    else {
      console.log('SAved!')
    }
  })
})

afterAll((done) => {
  UrlData.remove({ url: testUrl })
  mongoose.disconnect(done)
})

it('should return a promise', () => {
  const req = requestFactory(testShortenedUrl)
  const result = retrieveUrl(req)
  return expect(result).toBeInstanceOf(Promise)
})

it('should resolve to a valid url object', () => {
  const req = requestFactory(testShortenedUrl)
  const result = retrieveUrl(req).then(d => d.toJSON())
  return result.then(data => expect(data).toMatchObject({
    url: testUrl,
    shortenedUrl: testShortenedUrl
  }))
})

// requestFactory :: String -> Object
function requestFactory (shortenedUrl) {
  return {
    params: {
      '0': shortenedUrl
    }
  }
}
