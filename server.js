import express from 'express'

const PORT = 8080
const app = express()

app.get('/', (req,res,next) => {
  res.sendFile(__dirname + '/views/index.html', err => {
    if (err) next(err)
    else {
      res.status(200).send('Good')
    }
  })
})

app.listen(PORT, (err) => {
  if (err) console.log(err)
  else console.log(`Listening on port: ${PORT}`)
})
