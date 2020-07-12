This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# ⌛ Time a task
Project for sum summer coding

## 🕰️ Available Scripts

In the project directory, you can run:

### ⌚ `npm run dev`
Runs backend and client simultaneously in one terminal window

`concurrently \"npm run server\" \"npm run client\""`

### ⏲️`nodemon server.js`
Runs server on localhost:5000 with continuous update through `nodemon`

### ⏰ `npm start --prefix client`
Runs client on localhost:3000

## How to make it work?

Well, in /config/ add keys.js:
``module.exports = {
  mongoURI: "mongodb+srv://XXXXXXXX.gcp.mongodb.net/test?retryWrites=true&w=majority"
}`

Where X's is your particular mongodb setup. Cheers