import { ADD_USER, RECEIVE_USERS, EDIT_USER, LIKE_RESPONSE } from '../actions/index'

const users = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_USERS:
      return action.users

    case ADD_USER:
      return [...state, action.user]

    case EDIT_USER:
      return action.user

    case LIKE_RESPONSE:
      return state.filter(user => user !== action.swiped)

    default:
      return state
  }
}

export default users
