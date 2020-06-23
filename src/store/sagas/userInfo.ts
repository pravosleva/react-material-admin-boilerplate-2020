import { put, takeLatest, call } from 'redux-saga/effects'
import { ASYNC_LOAD_USER_INFO_DATA, setIsLoadingUserInfoData, setUserInfoData, showAsyncToast } from '@/actions'
import { getApiUrl } from '@/utils/getApiUrl'
import { networkErrorHandler } from '@/utils/errors/network'
import { apiErrorHandler, IResponseLocalResultSuccess, IResponseLocalResultError } from '@/utils/errors/api'
import { httpErrorHandler as httpRequestErrorFetchHandler } from '@/utils/errors/http/fetch'
import { universalFetchCatch } from '@/utils/errors'

const apiUrl = getApiUrl()

function fetchUserInfoData(url: string): Promise<IResponseLocalResultSuccess | IResponseLocalResultError> {
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
    .catch(universalFetchCatch)
}

interface IData {
  isOk: boolean
  response?: any
  msg?: string
}

function* asyncLoadUserInfoDataWorker() {
  yield put(setIsLoadingUserInfoData(true))

  const data: IData = yield call(fetchUserInfoData, `${apiUrl}/user/me`)

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
