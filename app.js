require('dotenv').config()
const express = require('express')
const cors = require('cors')
const api = require('./api')

const server = express()

server.use(cors())

server.get('/ping', (req, res) => {
  return res.json({ message: 'pong' })
})

server.use('/api', api)

const port = parseInt(process.env.NODE_PORT, 10) || 3000

server.listen(port, (err) => {
  if (err) console.error(err);
  console.log(`Example app listening at http://localhost:1337 form the host or http://localhost:${port} from vagrant`)
})

module.exports = server
