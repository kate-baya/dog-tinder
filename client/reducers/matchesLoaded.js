import { RECEIVE_MATCHES } from '../actions/index'

export default function matchesLoaded (state = false, action) {
  switch (action.type) {
    case RECEIVE_MATCHES:
      return true

    default:
      return state
  }
}
