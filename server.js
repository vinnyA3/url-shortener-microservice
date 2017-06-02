import express from 'express'

const PORT = 8080
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there' })
})

app.get('/new/*', (req, res) => {
  const url = req.params[0]
  // Check if the passed in url is a valid url(re)
  //  if not, return error message(json)
  // else .....
  // Check if the passed url is already in the database
  //   if it is, return that url's shortened version(json)
  //   else, create a shortened url of the passed in url and add
  //    data to database, then return the shortened version(json)
  res.render('response', { title: 'Hey', response: url })
})

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Listening on port: ${PORT}`)
})
