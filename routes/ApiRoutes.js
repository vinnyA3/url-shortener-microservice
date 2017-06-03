import getShortenedUrl from '../controllers/ApiController'

export default (app, express) => {
  // create router instance
  const router = express.Router()
  router.route('/*')
    .get(getShortenedUrl)
  // return router obj
  return router
}
