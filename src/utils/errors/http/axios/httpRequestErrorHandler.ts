import { HttpRequestError } from '@/utils/errors/http/HttpRequestError'

export const httpRequestErrorHandler = (obj: any): any | HttpRequestError => {
  if (obj.request?.status === 200) {
    return obj
  } else {
    throw new HttpRequestError(obj.request?.status, obj.request?.statusText)
  }
}
