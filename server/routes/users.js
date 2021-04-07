const express = require('express')
const router = express.Router()
const { getTokenDecoder } = require('authenticare/server')

const db = require('../db/users')
const matchesdb = require('../db/matches')

router.get('/', getTokenDecoder(), async (req, res) => {
  try {
    const id = req.user.id
    const allUsers = await db.getUsers()
    matchesdb.getAllProfilesSwipedBy(id)
      .then((swipes) => {
        const notSwiped = allUsers.filter(user => {
          const result = shouldIncludeUser(user, swipes)
          return result
        })
        res.json(notSwiped)
        return null
      })
      .catch(err => {
        res.status(500).send(err.message)
      })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

function shouldIncludeUser (user, swipes) {
  const swipeArray = swipes.filter(swipe => swipe.swiped === user.id)
  const swipe = swipeArray.find(swipe => swipe.liked == true)
  if (!swipe) {
    return true
  } else if (swipe.swiped === user.id && swipe.liked == true) {
    return false
  } else {
    return true
  }
}

router.patch('/', getTokenDecoder(), (req, res) => {
  try {
    const newUser = req.body
    const id = req.user.id
    db.addUserDetails(id, newUser)
      .then(newUser => {
        res.status(201).json(newUser)
        return null
      })
      .catch((err) => {
        throw (err)
      })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/current', getTokenDecoder(), async (req, res) => {
  try {
    const id = req.user.id
    const user = await db.findUser(id)
    delete user.hash
    res.json(user)
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.patch('/current', getTokenDecoder(), (req, res) => {
  try {
    const updatedUser = req.body
    const id = req.user.id
    db.editUser(id, updatedUser)
      .then(updatedUser => {
        res.status(201).json(updatedUser)
        return null
      })
      .catch((err) => {
        throw (err)
      })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

module.exports = router
