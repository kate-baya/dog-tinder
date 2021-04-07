const express = require('express')
const path = require('path')

const auth = require('./routes/auth')
const users = require('./routes/users')
const matches = require('./routes/matches')

const server = express()

server.use(express.json())
server.use(express.static(path.join(__dirname, 'public')))

server.use('/', auth)
server.use('/api/v1/users', users)
server.use('/api/v1/matches', matches)

module.exports = server
