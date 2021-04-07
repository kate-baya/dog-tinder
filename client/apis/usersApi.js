import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'
import { addUser, editUser } from '../actions/index'

const apiUrl = '/api/v1'

export function saveUser (user, dispatch) {
  return request
    .patch(`${apiUrl}/users/`)
    .set(getAuthorizationHeader())
    .send(user)
    .then(res => {
      return dispatch(addUser(res.body))
    })
}

export function getUsers () {
  return request
    .get(`${apiUrl}/users`)
    .set(getAuthorizationHeader())
    .then(res => {
      return res.body
    })
}

export function getUser () {
  return request
    .get(`${apiUrl}/users/current`)
    .set(getAuthorizationHeader())
    .then(res => {
      return res.body
    })
}

export function updateUser (userSettings, dispatch) {
  return request
    .patch(`${apiUrl}/users/current`)
    .set(getAuthorizationHeader())
    .send(userSettings)
    .then(res => {
      console.log(res.body)
      return dispatch(editUser(res.body))
    })
}
