import express from 'express'

const PORT = 8080
const app = express()

app.set('views', './views')
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
})

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Listening on port: ${PORT}`)
})
