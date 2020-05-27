import { put, takeLatest, call, select } from 'redux-saga/effects'
import { ASYNC_LOAD_TEST_DATA, setIsLoadingTestData, setTestData, showAsyncToast } from '@/actions'
// import { IRootState } from '@/store/IRootState'
import { NetworkError, networkErrorHandler } from '@/utils/errors/network'
import { HttpRequestError } from '@/utils/errors/http'
import {
  // apiResponseErrorHandler,
  // ApiResponseError,
  IResponseLocalResultSuccess,
  IResponseLocalResultError,
} from '@/utils/errors/api'
import { httpRequestErrorHandler as httpRequestErrorFetchHandler } from '@/utils/errors/http/fetch'

function fetchTestData(): Promise<IResponseLocalResultSuccess | IResponseLocalResultError> {
  const url = 'https://jsonplaceholder.typicode.com/users'

  return (
    fetch(url, {
      method: 'GET',
    })
      .then(networkErrorHandler)
      .then(httpRequestErrorFetchHandler)
      // .then(apiResponseErrorHandler)
      .then((data: any) => ({
        isOk: true,
        response: data,
      }))
      .catch((err: any) => {
        switch (true) {
          case err instanceof NetworkError:
          case err instanceof HttpRequestError:
            // case err instanceof ApiResponseError:
            return {
              isOk: false,
              msg: err.getErrorMsg(),
            }
          case err instanceof TypeError: // CORS?
            return {
              isOk: false,
              msg: err.message,
            }
          default:
            return {
              isOk: false,
              msg: url + '\nERR: Не удалось обработать ошибку',
            }
        }
      })
  )
}

interface IData {
  isOk: boolean
  response?: any
  msg?: string
}

function* asyncLoadTestDataWorker() {
  yield put(setIsLoadingTestData(true))

  const data: IData = yield call(fetchTestData)

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
