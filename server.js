const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

// Any requests, api/items/ANYTHING should go to this file:
const items = require('./routes/api/items')

const app = express()

// Bodyparser middleware
app.use(bodyParser.json())

// Var tvungen att använda CORS, annars fungerade det inte att göra requests
// till localhost:5000 (backend) från localhost:3000 (frontend)
app.use(cors())

//DB Config
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb Connected'))
  .catch((err) => console.log('Error!!!! \n\n' + err))

// Use Routes
app.use('/api/items', items)

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
