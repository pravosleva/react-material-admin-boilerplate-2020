export const ASYNC_LOAD_TEST_DATA = 'ASYNC_LOAD_TEST_DATA'
export const SET_TEST_DATA = 'SET_TEST_DATA'
export const SET_IS_LOADING_TEST_DATA = 'SET_IS_LOADING_TEST_DATA'

export const asyncLoadTestData = () => {
  return { type: ASYNC_LOAD_TEST_DATA }
}

export const setIsLoadingTestData = (isLoading: boolean) => {
  return { type: SET_IS_LOADING_TEST_DATA, payload: isLoading }
}

export const setTestData = (data: any) => {
  return { type: SET_TEST_DATA, payload: data }
}
