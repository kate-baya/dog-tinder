exports.up = function (knex, Promise) {
  return knex.schema.createTable('users', table => {
    table.increments('id')
    table.string('username')
    table.string('email')
    table.binary('hash')
    table.string('dog_name')
    table.string('owner_name')
    table.string('breed')
    table.string('location')
    table.string('bio')
    table.string('image')
  })
}

exports.down = function (knex, Promise) {
  return knex.schema.dropTable('users')
}
