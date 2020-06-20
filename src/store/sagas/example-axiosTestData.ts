import { put, takeLatest, call } from 'redux-saga/effects'
import { ASYNC_LOAD_USER_INFO_DATA, setIsLoadingUserInfoData, setUserInfoData, showAsyncToast } from '@/actions'
// import { NetworkError, networkErrorHandler } from '@/utils/errors/network'
import { HttpError } from '@/utils/errors/http'
import { apiErrorHandler, ApiError, IResponseLocalResultSuccess, IResponseLocalResultError } from '@/utils/errors/api'
import axios from 'axios'
/* NOTE 1
  Axios многое делает под капотом, поэтому вручную отлавливать все - нет смысла,
  иначе кода будет неоправдано больше, поэтому в этом проекте (без ssr) советую fetch.
*/
import { httpErrorHandler } from '@/utils/errors/http/axios'

async function fetchUserInfoData(url: string): Promise<IResponseLocalResultSuccess | IResponseLocalResultError> {
  const result = await axios
    .get(url)
    // NOTE 1
    // .then(networkErrorHandler)
    .then(httpErrorHandler) // res -> res.data
    .then(apiErrorHandler) // data -> data
    .then((data: any) => ({
      isOk: true,
      response: data,
    }))
    .catch((err) => {
      if (err.response) {
        // Client received an error response (5xx, 4xx) - По сути, встроенный httpErrorHandler
        return {
          isOk: false,
          // eslint-disable-next-line no-useless-concat
          msg: url + '\n' + `ERR ${err.response.request.status}: ${err.response.request.statusText}`,
        }
      } else if (err.request) {
        // Client never received a response, or request never left - По сути, встроенный networkErrorHandler
        return {
          isOk: false,
          msg: url + '\nERR: Client never received a response, or request never left',
        }
      } else {
        // Anything else
        switch (true) {
          // NOTE 2
          // Доп. обрабочики (помимо apiErrorHandler) будут нужны,
          // если настройки options будут позволять провалиться дальше: axios по умолчанию все перехватит сам
          // (см. обработку выше)
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
              msg: url + '\nAXIOS ERR: Не удалось обработать ошибку',
            }
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
