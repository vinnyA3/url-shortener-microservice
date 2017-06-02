import {getUrlData} from '../controllers/ApiController'

export default (app, express) => {
  // create router instance
  const router = express.Router()
  router.route('/*')
    .get(getUrlData)
  // return router obj
  return router
}
