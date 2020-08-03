const express = require('express')
const mongoose = require('mongoose')
// const bodyParser = require('body-parser')

// MongoDB
const Entry = require('./models/Entry')

// GraphQl
const { graphqlHTTP } = require('express-graphql')
const { buildSchema } = require('graphql')

const app = express()

// Bodyparser middleware
// app.use(bodyParser.json())

// middleware for CORS, add headers to every response that is sent back by our server
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// Implementing GraphQL here
app.use(
  '/graphql',
  graphqlHTTP({
    schema: buildSchema(`

    type Entry {
      _id: ID!
      time: Int!
      task: String!
      tags: [String]
      comment: String
      date: String
    }

    input EntryInput {
      time: Int!
      task: String!
      tags: [String]
      comment: String
    }

    input EntryInputTwo {
      _id: ID!
    }
    
    type RootQuery {
      entries: [Entry!]!
    }

    type RootMutation {
      createEntry(entryInput: EntryInput): Entry
      deleteEntry(entryInputTwo: EntryInputTwo): Entry
    }

    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `),

    // A bundle of all of the resolvers, a resolver is just a function
    rootValue: {
      entries: () => {
        // return the whole operation, express-graphql knows we are doing something
        // asynchronous here, wait for it to finish, don't try to return something too early
        return Entry.find()
          .then((entries) => {
            return entries.map((entry) => {
              // leaving out all the meta data
              return entry
              // no need: return {...entry._doc, _id: entry._doc._id.toString()}
            })
          })
          .catch((err) => {
            throw err
          })
      },
      createEntry: (args) => {
        const entry = new Entry({
          time: args.entryInput.time,
          task: args.entryInput.task,
          tags: args.entryInput.tags,
          comment: args.entryInput.comment,
        })
        return entry
          .save()
          .then((result) => {
            console.log(result)
            return result
          })
          .catch((err) => {
            console.log(err)
            throw err
          })
        // return entry // no need, why?
      },
      deleteEntry: (id) => {
        return Entry.findById(id)
          .then((entry) => entry.remove())
          .then((result) => {
            console.log(result)
            return result
          })
          .catch((err) => {
            console.log(err)
            throw err
          })
      },
    },
    graphiql: true,
  })
)

//DB Config
const db = require('./config/keys').mongoURI

// Connect to Mongo
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb Connected'))
  .catch((err) => console.log('Error!!!! \n\n' + err))

const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server started on port ${port}`))
