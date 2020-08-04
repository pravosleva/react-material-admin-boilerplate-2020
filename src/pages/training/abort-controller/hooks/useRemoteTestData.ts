import { useState, useEffect, useRef } from 'react'

export interface IDataRequestProps {
  url: string
  accessToken: string
  onCall?: (aborted: boolean) => void
  onAbortIfRequestStarted?: () => void
  onSuccess?: (length: number) => void
  onFail?: (err: any) => void
  debounce?: number
  // isForceAborted?: boolean
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
}: IDataRequestProps): [IDataItem[], boolean, boolean] | null {
  const [dataFromServer, setDataFromServer] = useState<IDataItem[] | null>(null)
  const [isLoaded, setIsLoaded] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const stratedImperativeRef: React.MutableRefObject<boolean> = useRef(false)

  useEffect(() => {
    stratedImperativeRef.current = false
    const abortController = new AbortController()

    const fetchData = () => {
      if (!!window) {
        setIsLoading(true)
        setIsLoaded(false)
        stratedImperativeRef.current = true
        if (!!onCall) onCall(abortController.signal.aborted)
        window
          .fetch(url, {
            // headers: { Authorization: `Bearer ${accessToken}` },
            method: 'GET',
            // mode: 'cors',
            signal: abortController.signal,
          })
          // Custom delay for demonstration:
          .then(async (smth) => {
            await delay(5000)
            return smth
          })
          .then((res: Response) => res.json())
          .then((resData: IDataItem[]) => {
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

      if (stratedImperativeRef.current && !!onAbortIfRequestStarted) {
        onAbortIfRequestStarted()
      }
    }
  }, [accessToken, url])

  return [dataFromServer, isLoaded, isLoading]
}
