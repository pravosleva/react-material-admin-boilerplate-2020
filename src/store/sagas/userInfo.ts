import { put, takeLatest, call } from 'redux-saga/effects'
import { ASYNC_LOAD_USER_INFO_DATA, setIsLoadingUserInfoData, setUserInfoData, showAsyncToast } from '@/actions'
import { getApiUrl } from '@/utils/getApiUrl'
import { NetworkError, networkErrorHandler } from '@/utils/errors/network'
import { HttpError } from '@/utils/errors/http'
import { apiErrorHandler, ApiError, IResponseLocalResultSuccess, IResponseLocalResultError } from '@/utils/errors/api'
import { httpErrorHandler as httpRequestErrorFetchHandler } from '@/utils/errors/http/fetch'

const apiUrl = getApiUrl()

function fetchUserInfoData(): Promise<IResponseLocalResultSuccess | IResponseLocalResultError> {
  const url = `${apiUrl}/user/me`

  return fetch(url, {
    method: 'POST',
  })
    .then(networkErrorHandler)
    .then(httpRequestErrorFetchHandler)
    .then(apiErrorHandler)
    .then((data: any) => ({
      isOk: true,
      response: data,
    }))
    .catch((err: any) => {
      switch (true) {
        case err instanceof NetworkError:
        case err instanceof HttpError:
        case err instanceof ApiError:
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
}

interface IData {
  isOk: boolean
  response?: any
  msg?: string
}

function* asyncLoadUserInfoDataWorker() {
  yield put(setIsLoadingUserInfoData(true))

  const data: IData = yield call(fetchUserInfoData)

  if (data.isOk && !!data.response) {
    yield put(setUserInfoData(data.response))

    yield put(
      showAsyncToast({
        text: `${typeof data.response} received`,
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

  yield put(setIsLoadingUserInfoData(false))
}

export function* watchAsyncLoadUserInfoData() {
  yield takeLatest(ASYNC_LOAD_USER_INFO_DATA, asyncLoadUserInfoDataWorker)
}
