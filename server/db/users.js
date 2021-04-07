const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'
const connection = knex(config[env])

const { generateHash } = require('authenticare/server')

module.exports = {
  createUser,
  userExists,
  getUserByName,
  findUser,
  addUserDetails,
  editUser,
  getUsers
}

function createUser (user, db = connection) {
  return userExists(user.username, db)
    .then(exists => {
      if (exists) {
        throw new Error('User exists')
      }
      return null
    })
    .then(() => generateHash(user.password))
    .then(passwordHash => {
      return db('users').insert({ username: user.username, hash: passwordHash })
    })
}

function userExists (username, db = connection) {
  return db('users')
    .count('id as n')
    .where('username', username)
    .then(count => {
      return count[0].n > 0
    })
}

function getUserByName (username, db = connection) {
  return db('users')
    .select()
    .where({ username })
    .first()
}

function findUser (id, db = connection) {
  return db('users')
    .where({ id })
    .select()
    .first()
}

function addUserDetails (id, newUser, db = connection) {
  return db('users')
    .update(newUser)
    .where({ id })
}

function editUser (id, updatedUser, db = connection) {
  return db('users')
    .where({ id })
    .update(updatedUser)
    .then(user => {
      return findUser(id)
    })
}

function getUsers (db = connection) {
  return db('users')
    .select()
}
