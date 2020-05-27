import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { myDevice } from './myDevice'
import { toaster } from './toaster'
import { userInfo } from './userInfo'

export const rootReducer = combineReducers({
  form: formReducer,
  myDevice,
  toaster,
  userInfo,
})
