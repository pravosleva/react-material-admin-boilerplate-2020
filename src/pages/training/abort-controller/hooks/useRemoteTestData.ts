import { useState, useEffect, useRef } from 'react'
import { httpErrorHandler } from '@/utils/errors/http/fetch'

export interface IDataRequestProps {
  url: string
  accessToken: string
  onCall?: () => void
  onAbortIfRequestStarted?: (startedReqWasAborted: boolean) => void
  onSuccess?: (length: number) => void
  onFail?: (err: any) => void
  debounce?: number
  // shouldBeAborted?: boolean
  isActiveDelay?: boolean
}
export interface IDataItem {
  [x: string]: any
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export function useRemoteTestData({
  url,
  accessToken,
  onCall,
  onAbortIfRequestStarted,
  onSuccess,
  onFail,
  debounce = 0,
  isActiveDelay,
}: // shouldBeAborted,
IDataRequestProps): [IDataItem[], boolean, boolean] | null {
  const [dataFromServer, setDataFromServer] = useState<IDataItem[] | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const stratedImperativeRef: React.MutableRefObject<boolean> = useRef(false)

  useEffect(() => {
    stratedImperativeRef.current = false
    const abortController = new AbortController()
    setIsLoading(false)

    const fetchData = () => {
      if (!!window) {
        setIsLoading(true)
        setIsLoaded(false)
        stratedImperativeRef.current = true
        if (!!onCall) onCall()
        window
          .fetch(url, {
            // headers: { Authorization: `Bearer ${accessToken}` },
            method: 'GET',
            mode: 'cors',
            signal: abortController.signal,
          })
          .then(async (res: Response) => {
            if (isActiveDelay) await delay(5000)
            return res
          })
          .then(httpErrorHandler) // .then((res: Response) => res.json())
          .then((resData: IDataItem[]) => {
            if (!Array.isArray(resData)) {
              setIsLoaded(false)
              setIsLoading(false)
              throw new Error('Data is not correct')
            }
            setDataFromServer(resData)
            setIsLoaded(true)
            setIsLoading(false)
            if (!!onSuccess) onSuccess(resData.length)
            stratedImperativeRef.current = false
          })
          .catch((error) => {
            if (!!onFail) onFail(error)
            stratedImperativeRef.current = false
          })
      }
    }

    const debouncedHandler = setTimeout(fetchData, debounce)

    return function cancel() {
      clearTimeout(debouncedHandler)
      abortController.abort()

      if (!!stratedImperativeRef.current && !!onAbortIfRequestStarted) {
        onAbortIfRequestStarted(stratedImperativeRef.current)
      }
    }
  }, [accessToken, url, debounce, isActiveDelay, onCall, onAbortIfRequestStarted])

  return [dataFromServer, isLoaded, isLoading]
}