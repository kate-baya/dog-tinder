import { RECEIVE_MATCHES, DELETE_MATCH } from '../actions/index'

const matches = (state = [], action) => {
  switch (action.type) {
    case RECEIVE_MATCHES:
      return action.matches

    case DELETE_MATCH:
      return state.filter(match => match.swiper !== action.match.swiper)

    default:
      return state
  }
}

export default matches
