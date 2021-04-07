import users from './users'
import { addUser } from '../actions'

describe('users reducer', () => {
  test('initial state is an empty array', () => {
    const state = users(undefined, { type: '_INIT_' })
    expect(state).toEqual([])
  })
  test('ADD_USER adds a user to the state', () => {
    const fakeUser = { id: 6, username: 'mave', email: 'that@email.com', hash: 'hash', dog_name: 'Woofus', owner_name: 'Mave', breed: 'Chihuahua', location: 'EDA', bio: 'Ro-dawg loves the ladies. Here for a good time not a long time', image: 'https://peopledotcom.files.wordpress.com/2018/05/dog-ducks-6.jpg' }
    const action = addUser(fakeUser)
    const state = users(undefined, action)
    expect(state).toHaveLength(1)
    expect(state[0]).toEqual(fakeUser)
  }
  )
}
)
