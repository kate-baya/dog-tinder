import { updateMatches, getMatches } from './matches'
import { RECEIVE_MATCHES, LIKE_RESPONSE } from '../actions/index'
import nock from 'nock'

describe('getMatches', () => {
  const fakeMatches = [{ id: 1, swiper: 1, swiped: 2, liked: true },
    { id: 3, swiper: 2, swiped: 1, liked: true }]
  const scope = nock('http://localhost')
    .get('/api/v1/matches')
    .reply(200, fakeMatches)

  test('returns all matches from api', () => {
    expect.assertions(3)
    const fakeDispatch = jest.fn()
    return getMatches(fakeDispatch).then(matches => {
      const action = fakeDispatch.mock.calls[0][0]
      expect(action.matches).toEqual(fakeMatches)
      expect(action.type).toEqual(RECEIVE_MATCHES)
      expect(scope.isDone()).toBe(true)
      return null
    })
  })
})

describe('updateMatches', () => {
  const mockMatches = [{ id: 1, swiper: 1, swiped: 2, liked: true },
    { id: 2, swiper: 2, swiped: 1, liked: true }]
  const scope = nock('http://localhost')
    .post('/api/v1/matches', { liked: true, swiped: 1 })
    .reply(200, mockMatches)

  test('adds new swipe data to match table', () => {
    expect.assertions(2)
    const fakeDispatch = jest.fn()
    return updateMatches(true, 1, fakeDispatch)
      .then(match => {
        const action = fakeDispatch.mock.calls[0][0]
        expect(action.swiped).toEqual(1)
        expect(action.type).toEqual(LIKE_RESPONSE)
        expect(scope.isDone()).toBe(true)
        return null
      })
  })
})
