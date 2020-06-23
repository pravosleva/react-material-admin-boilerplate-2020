/* eslint-disable no-useless-concat */
import { put, takeLatest, call } from 'redux-saga/effects'
import { ASYNC_LOAD_USER_INFO_DATA, setIsLoadingUserInfoData, setUserInfoData, showAsyncToast } from '@/actions'
import { universalAxiosCatch } from '@/utils/errors'
import { apiErrorHandler, IResponseLocalResultSuccess, IResponseLocalResultError } from '@/utils/errors/api'
import axios from 'axios'
import { httpErrorHandler } from '@/utils/errors/http/axios'

async function fetchUserInfoData(url: string): Promise<IResponseLocalResultSuccess | IResponseLocalResultError> {
  const result = await axios({
    method: 'get',
    url,
    // validateStatus: (status: number) => status >= 200 && status < 300, // default
  })
    .then(httpErrorHandler) // res -> res.data
    .then(apiErrorHandler) // data -> data
    .then((data: any) => ({
      isOk: true,
      response: data,
    }))
    .catch(universalAxiosCatch)
  return result
}

interface IData {
  isOk: boolean
  response?: any
  msg?: string
}

function* asyncLoadUserInfoDataWorker() {
  yield put(setIsLoadingUserInfoData(true))

  const data: IData = yield call(fetchUserInfoData, 'https://jsonplaceholder.typicode.com/users')

  if (data.isOk && !!data.response) {
    yield put(setUserInfoData(data.response))
    yield put(
      showAsyncToast({
        text: `Data received as ${typeof data.response}`,
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

export function* watchAsyncLoadTestData() {
  yield takeLatest(ASYNC_LOAD_USER_INFO_DATA, asyncLoadUserInfoDataWorker)
}
