import { useState, useEffect } from 'react'

export interface IDataRequestProps {
  accessToken: string
  cbSuccess?: (length: number) => void
  cbFail?: (err: any) => void
}
export interface IDataItem {
  [x: string]: any
}

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms))

export function useRemoteTestData({
  accessToken,
  cbSuccess,
  cbFail,
}: IDataRequestProps): [IDataItem[], boolean] | null {
  const [dataFromServer, setDataFromServer] = useState<IDataItem[] | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const abortController = new AbortController()

    window
      .fetch('https://jsonplaceholder.typicode.com/users', {
        // headers: { Authorization: `Bearer ${accessToken}` },
        method: 'GET',
        // mode: 'cors',
        signal: abortController.signal,
      })
      // For abort demonstration:
      .then(async (smth) => {
        await delay(5000)
        return smth
      })
      .then((res: Response) => res.json())
      .then((resData: IDataItem[]) => {
        setDataFromServer(resData)
        setIsLoaded(true)
        if (!!cbSuccess) cbSuccess(resData.length)
      })
      .catch((error) => {
        if (!!cbFail) cbFail(error)
      })

    return function cancel() {
      abortController.abort()
    }
  }, [accessToken])

  return [dataFromServer, isLoaded]
}
