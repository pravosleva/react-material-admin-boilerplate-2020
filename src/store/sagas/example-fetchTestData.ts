import { put, takeLatest, call } from 'redux-saga/effects'
import { ASYNC_LOAD_TEST_DATA, setIsLoadingTestData, setTestData, showAsyncToast } from '@/actions'
import { networkErrorHandler } from '@/utils/errors/network'
import { apiErrorHandler, IResponseLocalResultSuccess, IResponseLocalResultError } from '@/utils/errors/api'
import { httpErrorHandler } from '@/utils/errors/http/fetch'
import { universalFetchCatch } from '@/utils/errors'

function fetchTestData(url: string): Promise<IResponseLocalResultSuccess | IResponseLocalResultError> {
  return fetch(url, {
    method: 'GET',
  })
    .then(networkErrorHandler)
    .then(httpErrorHandler) // res -> res.json()
    .then(apiErrorHandler) // data -> data
    .then((data: any) => ({
      isOk: true,
      response: data,
    }))
    .catch(universalFetchCatch)
}

interface IData {
  isOk: boolean
  response?: any
  msg?: string
}

function* asyncLoadTestDataWorker() {
  yield put(setIsLoadingTestData(true))

  const data: IData = yield call(fetchTestData, 'https://jsonplaceholder.typicode.com/users')

  if (data.isOk && !!data.response && Array.isArray(data.response)) {
    yield put(setTestData(data.response))

    yield put(
      showAsyncToast({
        text: `${data.response.length} received`,
        delay: 5000,
        type: 'success',
      })
    )
  } else {
    yield put(
      showAsyncToast({
        text: data.msg,
        delay: 20000,
        type: 'error',
      })
    )
  }

  yield put(setIsLoadingTestData(false))
}

export function* watchAsyncLoadTestData() {
  yield takeLatest(ASYNC_LOAD_TEST_DATA, asyncLoadTestDataWorker)
}
