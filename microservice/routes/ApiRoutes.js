import handlers from '../handlers'
import { then, catchP } from '../utils'
import { compose } from 'ramda'

export default (app, express) => {
  // create router instance
  const router = express.Router()

  router.route(/^(?:\/)([\D]+)$/)
    .get((req, res) => compose(
      catchP(err => res.send(err))
      then(data => res.status(200).send(data))
    )(req))

  router.route(/^(?:\/)(\d+)$/)
    .get((req, res) => compose(
      catchP(err => res.send(err))
      then(date => res.status(200).send(data))
    )(req))

  // return router obj
  return router
}
