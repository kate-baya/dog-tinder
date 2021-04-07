import {
  RECEIVE_USERS,
  receiveUsers,
  RECEIVE_MATCHES,
  receiveMatches,
  DELETE_MATCH,
  removeMatch
} from './index'

describe('receiveUsers', () => {
  describe('this bit works', () => {
    const fakeUser = [{
      id: 1,
      name: 'Dolphin'
    }]

    test('Calls the correct type on action', () => {
      const testAction = receiveUsers(fakeUser)
      expect(testAction.type).toBe(RECEIVE_USERS)
    })

    test('Receives the correct information on action', () => {
      const testAction = receiveUsers(fakeUser)
      expect(testAction.users[0].id).toEqual(1)
    })
  })
})

describe('receiveMatches', () => {
  describe('this bit works', () => {
    const fakeMatch = [{
      id: 1,
      swiper: 'Roy',
      swiped: 'Lukin'
    }]

    test('Calls the correct type on action', () => {
      const testAction = receiveMatches(fakeMatch)
      expect(testAction.type).toBe(RECEIVE_MATCHES)
    })

    test('Receives the correct information on action', () => {
      const testAction = receiveMatches(fakeMatch)
      expect(testAction.matches[0].id).toEqual(1)
    })
  })
})

describe('removeMatch', () => {
  describe('this bit works', () => {
    const fakeMatch = [{
      id: 1,
      swiper: 'Roy',
      swiped: 'Lukin'
    }]

    test('Calls the correct type on action', () => {
      const testAction = removeMatch(fakeMatch)
      expect(testAction.type).toBe(DELETE_MATCH)
    })

    test('Receives the correct information on action', () => {
      const testAction = removeMatch(fakeMatch)
      expect(testAction.match[0].id).toEqual(1)
    })
  })
})
