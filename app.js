const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const player = require('./routes/player.route')
const app = express()

// Set up mongoose connection - done like this till custom params is available
const mongoDB = process.env.MONGODB_URI

mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/players', player)

let port = 80

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})
