import { combineReducers } from 'redux'

import messagesReducer from './messagesReducer'
import userReducer from './userReducer'
import groupReducer from './groupReducer'
import randomReducer from './randomReducer'

export default combineReducers({
  messagesReducer,
  userReducer,
  groupReducer,
  randomReducer
})