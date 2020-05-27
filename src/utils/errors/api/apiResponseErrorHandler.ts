import { ApiResponseError } from './ApiResponseError'

export const apiResponseErrorHandler = (res: any): any | ApiResponseError => {
  if (!!res.success) {
    return res
  } else {
    throw new ApiResponseError(res?.errors)
  }
}
