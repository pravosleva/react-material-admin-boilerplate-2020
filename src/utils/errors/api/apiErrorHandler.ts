import { ApiError } from './ApiError'

export const apiErrorHandler = (res: any): any | ApiError => {
  if (!!res.success) {
    // For example like uremont api
    return res
  } else {
    throw new ApiError(res?.errors)
  }
}
