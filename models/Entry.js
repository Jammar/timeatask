const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* 

  Tänker att:
  
  Time    Borde vara lättast uttryckt i Minuter. 
          I MongoDB verkar den minsta inten vara: 32-bit integer “int”, 
          hade dock kunnat ha en Short. Men går eventuellt också med "Number"
  
  Task    String

  Tags    Array of strings
          tags: [{type: String}]

  Comment String

  Date    MongoDB's date med default: dagensDatum


*/

// Create Schema
const entrySchema = new Schema({
  time: {
    type: Number,
    required: true,
  },
  task: {
    type: String,
    required: true,
  },
  tags: [{ type: String }],
  comment: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

// The schema alone doesn't help us, we need to create a model from the schema
// Schema = our plan, the model = blueprint which incorporates that plan
// which we use to create objects with which we work with our application

// the first arg: name of the model. second arg: pointer to the schema
module.exports = Entry = mongoose.model('Entry', entrySchema)
