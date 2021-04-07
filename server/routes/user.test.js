const request = require('supertest')
const server = require('../server')
const { getUsers } = require('../db/users')
// const { generateHash } = require('authenticare/server')

// PASSING TEST
// fake db content
// const hash = generateHash('greg')
const user =
{ id: 1, username: 'roy', email: 'this@email.com', hash: 'hash', dog_name: 'Roy-boi', owner_name: 'Roy', breed: 'Pupps', location: 'EDA', bio: 'Roy-boi likes long walks on the beach and eating shoes', image: 'https://www.nationalgeographic.com/content/dam/animals/thumbs/rights-exempt/mammals/d/domestic-dog_thumb.ngsversion.1546554600360.adapt.1900.1.jpg' }

jest.mock('authenticare/server', () => ({
  getTokenDecoder: jest.fn(() => {
    return (req, res, next) => {
      req.user = user
      next()
    }
  }),
  applyAuthRoutes: jest.fn()

}))

jest.mock('../db/users', () => ({
  // editUser: jest.fn(),
  // generateHash: jest.fn(),
  getUsers: jest.fn(() => Promise.resolve(['ss', 'ff']))
}))

describe('GET /api/v1/users', () => {
  test('list users', () => {
    expect.assertions(1)

    return request(server)
      .get('/api/v1/users')
      .then(res => {
        expect(getUsers).toHaveBeenCalled()
        // expect(res.body).toHaveLength(1)
        return null
      })
  })
  test('show error when route fails', () => {
    const err = new Error('Uhm nope')
    getUsers.mockImplementation(() => Promise.reject(err))
    expect.assertions(1)
    return request(server)
      .get('/api/v1/users')
      .then(res => {
        expect(res.status).toBe(500)
        return null
      })
  })
})
