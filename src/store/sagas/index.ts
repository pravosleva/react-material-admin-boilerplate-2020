import { all } from 'redux-saga/effects'
import { watchToaster } from './toaster'
// import { watchAsyncLoadTestData } from './example-fetchTestData'
import { watchAsyncLoadUserInfoData } from './userInfo'

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export function* rootSaga() {
  yield all([watchToaster(), watchAsyncLoadUserInfoData()])
}
