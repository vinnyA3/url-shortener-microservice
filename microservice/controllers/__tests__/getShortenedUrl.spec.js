import getShortenedUrl from '../getShortenedUrl'

it('should return a promise', () => {
  const url = 'http://www.google.com'
  const req = requestFactory(url)
  const result = getShortenedUrl(req)
  return expect(result).toBeInstanceOf(Promise)
})


// requestFactory :: String -> Object
function requestFactory(input) {
  return {
    params: {
      '0': input
    }
  }
}
