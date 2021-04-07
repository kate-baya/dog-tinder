exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('matches').del()
    .then(function () {
      // Inserts seed entries
      return knex('matches').insert([
        { id: 1, swiper: 1, swiped: 2, liked: true },
        { id: 2, swiper: 1, swiped: 3, liked: true },
        { id: 3, swiper: 2, swiped: 1, liked: false },
        { id: 4, swiper: 2, swiped: 3, liked: true },
        { id: 6, swiper: 3, swiped: 1, liked: true },
        { id: 7, swiper: 3, swiped: 2, liked: true },
        { id: 8, swiper: 3, swiped: 12, liked: true },
        { id: 9, swiper: 4, swiped: 12, liked: true },
        { id: 10, swiper: 5, swiped: 12, liked: true },
        { id: 11, swiper: 6, swiped: 12, liked: true },
        { id: 12, swiper: 7, swiped: 12, liked: true },
        { id: 13, swiper: 8, swiped: 12, liked: true },
        { id: 14, swiper: 9, swiped: 12, liked: true },
        { id: 15, swiper: 10, swiped: 12, liked: true },
        { id: 16, swiper: 11, swiped: 12, liked: true },
        { id: 17, swiper: 13, swiped: 12, liked: true }
      ])
    })
}
