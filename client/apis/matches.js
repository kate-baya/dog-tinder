import request from 'superagent'
import { getAuthorizationHeader } from 'authenticare/client'
import { addLikeResponse, receiveMatches, removeMatch } from '../actions/index'

const apiUrl = '/api/v1'

export const updateMatches = (liked, swiped, dispatch) => {
  console.log(liked, swiped, dispatch)
  return request
    .post(`${apiUrl}/matches`)
    .set(getAuthorizationHeader())
    .send({ liked, swiped })
    .then(res => {
      return dispatch(addLikeResponse(swiped))
    })
    .catch(err => console.log(err))
}

export const getMatches = (dispatch) => {
  return request
    .get(`${apiUrl}/matches`)
    .set(getAuthorizationHeader())
    .then(res => {
      return dispatch(receiveMatches(res.body))
    })
    .catch(err => console.log(err))
}

export const deleteMatch = (match, dispatch) => {
  return request
    .delete(`${apiUrl}/matches/${match.swiper}`)
    .set(getAuthorizationHeader())
    .then(res => {
      return dispatch(removeMatch(match))
    })
    .catch(err => console.log(err))
}
