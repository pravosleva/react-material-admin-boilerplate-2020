/* eslint-disable no-useless-concat */
import { put, takeLatest, call } from 'redux-saga/effects'
import { ASYNC_LOAD_USER_INFO_DATA, setIsLoadingUserInfoData, setUserInfoData, showAsyncToast } from '@/actions'
// import { NetworkError, networkErrorHandler } from '@/utils/errors/network'
import { HttpError } from '@/utils/errors/http'
import { apiErrorHandler, ApiError, IResponseLocalResultSuccess, IResponseLocalResultError } from '@/utils/errors/api'
import axios from 'axios'
import { httpErrorHandler } from '@/utils/errors/http/axios'

async function fetchUserInfoData(url: string): Promise<IResponseLocalResultSuccess | IResponseLocalResultError> {
  const result = await axios({
    method: 'get',
    url,
    validateStatus: (status: number) => status >= 200 && status < 500, // default
  })
    // .then(networkErrorHandler)
    .then(httpErrorHandler) // res -> res.data
    .then(apiErrorHandler) // data -> data
    .then((data: any) => ({
      isOk: true,
      response: data,
    }))
    .catch((err) => {
      switch (true) {
        case err.isAxiosError:
          if (!!err.response) {
            // Client received an error response (5xx, 4xx) - По сути, встроенный httpErrorHandler
            return {
              isOk: false,
              msg: `Axios Error ${err.response.request.status}: ${err.response.request.statusText}`,
            }
          } else if (!!err.request) {
            // Client never received a response, or request never left - По сути, встроенный networkErrorHandler
            return {
              isOk: false,
              msg: 'Axios Error: Client never received a response, or request never left',
            }
          } else {
            return {
              isOk: false,
              msg: 'Axios Error: Не удалось обработать ошибку',
            }
          }
        // case err instanceof NetworkError:
        case err instanceof HttpError:
        case err instanceof ApiError:
          return {
            isOk: false,
            msg: err.getErrorMsg(),
          }
        case err instanceof TypeError:
          return {
            isOk: false,
            msg: err.message,
          }
        default:
          return {
            isOk: false,
            msg: `Request Error (${err.constructor.name}): Не удалось обработать ошибку`,
          }
      }
    })
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
