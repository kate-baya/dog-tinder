export const ADD_USER = 'ADD_USER'
export const RECEIVE_USERS = 'RECEIVE_USERS'
export const EDIT_USER = 'EDIT_USER'
export const LIKE_RESPONSE = 'LIKE_RESPONSE'
export const RECEIVE_MATCHES = 'RECEIVE_MATCHES'
export const DELETE_MATCH = 'DELETE_MATCH'

export const addUser = (user) => {
  return {
    type: ADD_USER,
    user
  }
}

export const receiveUsers = (users) => {
  return {
    type: RECEIVE_USERS,
    users: users
  }
}

export const editUser = (user) => {
  return {
    type: EDIT_USER,
    user
  }
}

export const addLikeResponse = (swiped) => {
  return {
    type: LIKE_RESPONSE,
    swiped
  }
}

export const receiveMatches = (matches) => {
  return {
    type: RECEIVE_MATCHES,
    matches
  }
}

export const removeMatch = (match) => {
  return {
    type: DELETE_MATCH,
    match
  }
}
