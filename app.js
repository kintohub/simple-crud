require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const morgan = require('morgan')
const player = require('./routes/player.route')
const app = express()

// Set up mongoose connection - this is a env variable for the moment till custom params are available
const mongoDB = process.env.MONGODB_URI

mongoose.connect(mongoDB, { useNewUrlParser: true })
mongoose.set('useFindAndModify', false)
mongoose.Promise = global.Promise

let db = mongoose.connection
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('combined'))
app.use('/', player)

let port = process.env.PORT || 80

app.listen(port, () => {
  console.log(`app listening on this port here: ${port}`)
})
