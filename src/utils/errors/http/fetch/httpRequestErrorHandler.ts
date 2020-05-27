import { HttpRequestError } from '@/utils/errors/http/HttpRequestError'

export const httpRequestErrorHandler = (res: any): any | HttpRequestError => {
  if (res.ok && res.status === 200) {
    return res.json()
  } else {
    throw new HttpRequestError(res.status, res.statusText)
  }
}
