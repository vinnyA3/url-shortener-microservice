import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'
// api routes import
import ApiRoutes from './routes/ApiRoutes'
// export port & db uri
import { port, db } from '../config'
// define app
const app = express()
// connect to mongoose db and set promise lib
mongoose.connect(db)
mongoose.Promise = global.Promise
// enable cors
app.use(cors())
// set up morgan logger
app.use(morgan('dev'))
// include api routes
app.use('/api', ApiRoutes(app, express))
// main route
app.get('*', (req, res) => {
  res.status(200).send({ message: 'Hello There!' })
})
// start server
app.listen(port, (err) => {
  if (err) throw new Error(err)
  else console.log(`Listening on port: ${port}`)
})
