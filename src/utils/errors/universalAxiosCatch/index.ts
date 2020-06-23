import { NetworkError } from '@/utils/errors/network'
import { HttpError } from '@/utils/errors/http'
import { ApiError, IResponseLocalResultSuccess, IResponseLocalResultError } from '@/utils/errors/api'

export const universalAxiosCatch = (err: any): IResponseLocalResultSuccess | IResponseLocalResultError => {
  switch (true) {
    case err.isAxiosError:
      try {
        if (!!err.response) {
          // Client received an error response (5xx, 4xx) - По сути, встроенный httpErrorHandler
          throw new HttpError(err.response.request.status, err.response.request.statusText)
        } else if (!!err.request) {
          // Client never received a response, or request never left - По сути, встроенный networkErrorHandler
          throw new NetworkError('(Axios Error) Client never received a response, or request never left')
        } else {
          return {
            isOk: false,
            msg: 'Axios Error: Не удалось обработать ошибку',
          }
        }
      } catch (err) {
        return {
          isOk: false,
          msg: err.getErrorMsg(),
        }
      }
    // case err instanceof NetworkError:
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
        msg: `Request Error (${err.constructor.name}): Не удалось обработать ошибку`,
      }
  }
}
