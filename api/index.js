const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes')

const api = express()

api.use(bodyParser.json())
api.use(bodyParser.urlencoded({ extended: false }))

// Big cheat to create connection to db
const { MONGO_HOST, MONGO_PORT, MONGO_DB, MONGO_USER, MONGO_PASSWORD } = process.env
mongoose.connect(`mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`, 
    { useNewUrlParser: true, useUnifiedTopology: true })

Object.keys(routes).forEach((route) => {
  api.use(`/${route}`, routes[route])
})

api.use((e, req, res, next) => {
  const status = e.response ? e.response.status : 500
  res.status(status).json({ message: e.message })
  next(e)
})

module.exports = api
