exports.up = function (knex) {
  return knex.schema.createTable('matches', table => {
    table.increments('id')
    table.integer('swiper')
    table.integer('swiped')
    table.boolean('liked')
  })
}

exports.down = function (knex) {
  return knex.schema.dropTable('matches')
}
