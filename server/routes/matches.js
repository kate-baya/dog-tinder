const express = require('express')
const router = express.Router()
const { getTokenDecoder } = require('authenticare/server')

const db = require('../db/matches')

router.post('/', getTokenDecoder(), (req, res) => {
  try {
    const id = req.user.id
    const liked = req.body.liked
    const swiped = req.body.swiped
    db.addLikedStatus(liked, swiped.id, id)
      .then(likedStatus => {
        res.status(201).json(likedStatus)
        return null
      })
      .catch((err) => {
        throw (err)
      })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.get('/', getTokenDecoder(), (req, res) => {
  try {
    const id = req.user.id
    db.getMatches(id)
      .then(matches => {
        res.json(matches)
        return null
      })
      .catch((err) => {
        throw (err)
      })
  } catch (err) {
    res.status(500).send(err.message)
  }
})

router.delete('/:swiper', getTokenDecoder(), (req, res) => {
  console.log(req.params)
  const swiper = Number(req.params.swiper)
  const swiped = req.user.id
  db.deleteMatch(swiper, swiped)
    .then(res.sendStatus(200))
    .catch(err => {
      res.status(500).send(err.message)
    })
})

module.exports = router
