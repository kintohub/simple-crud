require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const player = require('./routes/player.route')
const app = express()

// Set up mongoose connection - this is a env variable for the moment - later this will be provided in headers for individual connections
const mongoDB = process.env.MONGODB_URI

mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/', player)

const port = process.env.PORT || '8000'

app.listen(port, () => {
  console.log(`app listening on this port here: ${port}`)
})
