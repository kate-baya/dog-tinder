const knex = require('knex')
const config = require('./knexfile')
const env = process.env.NODE_ENV || 'development'
const connection = knex(config[env])
const { getUserMatches, getRightSwipes } = require('./utils')

module.exports = {
  addLikedStatus,
  getMatches,
  deleteMatch,
  getAllProfilesSwipedBy
}

function getMatches (id, db = connection) {
  return db('users')
    .join('matches', 'matches.swiper', 'users.id')
    .select('matches.swiper', 'matches.swiped', 'users.dog_name', 'users.owner_name', 'users.breed', 'users.image', 'matches.liked')
    .where({ liked: true })
    .then(matches => {
      const rightSwipes = getRightSwipes(matches, id)
      const userIsLiked = rightSwipes[0]
      const userLiked = rightSwipes[1]

      return getUserMatches(userIsLiked, userLiked)
    })
}

function addLikedStatus (liked, swiped, swiper, db = connection) {
  return db('matches')
    .insert({ liked, swiped, swiper })
}

function deleteMatch (swiper, swiped, db = connection) {
  return db('matches')
    .where({ swiper: swiper, swiped: swiped })
    .delete()
}

function getAllProfilesSwipedBy (id, db = connection) {
  return db('matches')
    .select()
    .where({ swiper: id })
}
