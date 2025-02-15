const express = require('express')
const app = express()
const Dataconnect = require('./db')
require('dotenv').config()
const port = process.env.PORT || 5000
const cors = require('cors')

app.use(
  cors({
    origin: "http://localhost:3000", 
    credentials: true, 
  })
);

app.use(express.json())

const routes = require('./router')

app.use('/api', routes)

app.get('/', (req, res) => {
  res.send('Server is running')
})

const start = async () => {
  try {
    await Dataconnect(process.env.Mongo_URI)
    app.listen(port, () => {
      console.log(`Server listening on port ${port}...`)
    })
  } catch (error) {
    console.log('Error starting server:', error)
  }
}

start()
