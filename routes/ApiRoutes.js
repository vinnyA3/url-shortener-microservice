import getShortenedUrl from '../controllers/ApiController'
import retrieveUrl from '../controllers/retrieveUrl'

export default (app, express) => {
  // create router instance
  const router = express.Router()
  router.route(/^(?:\/)([\D]+)$/)
    .get(getShortenedUrl)

  //router.route(/^(?:\/)(\d+)$/)
  router.route('/:num')
    .get(retrieveUrl)
  // return router obj
  return router
}
