import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
// api routes import
import ApiRoutes from './routes/ApiRoutes'
// define port and app
const PORT = 8080
const app = express()
// setup database connection
const db = 'mongodb://127.0.0.1/url_data'
mongoose.connect(db)
// set up morgan logger
app.use(morgan('dev'))
// set view directory and default view engine
app.set('views', './views')
app.set('view engine', 'pug')
// include api routes
app.use('/new', ApiRoutes(app, express))
// main route
app.get('*', (req, res) => {
  res.render('index', { title: 'Welcome', message: 'Hello there' })
})
// start server
app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Listening on port: ${PORT}`)
})
