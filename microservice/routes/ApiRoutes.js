import handlers from '../handlers'
import utils from '../utils'
import { compose } from 'ramda'

const { then, catchP } = utils

export default (app, express) => {
  // create router instance
  const router = express.Router()

  router.route(/^(?:\/)([\D]+)$/)
    .get((req, res) => compose(
      catchP(err => res.status(500).send({ err: err.message })),
      then(data => res.status(200).send(data)),
      handlers.getShortenedUrl
    )(req))

  router.route(/^(?:\/)(\d+)$/)
    .get((req, res) => compose(
      catchP(err => res.status(500).send({ err: err.message })),
      then(data => res.status(200).send(data)),
      handlers.retrieveUrl
    )(req))

  // return router obj
  return router
}
