import { combineReducers } from 'redux'

import messagesReducer from './messagesReducer'
import userReducer from './userReducer'

export default combineReducers({
  messagesReducer,
  userReducer,
})