import { combineReducers } from 'redux'

import users from './users'
import matches from './matches'
import matchesLoaded from './matchesLoaded'

export default combineReducers({
  users,
  matches,
  matchesLoaded
})
