export const ASYNC_LOAD_USER_INFO_DATA = 'ASYNC_LOAD_USER_INFO_DATA'
export const SET_USER_INFO_DATA = 'SET_USER_INFO_DATA'
export const SET_IS_LOADING_USER_INFO_DATA = 'SET_IS_LOADING_USER_INFO_DATA'

export const asyncLoadUserInfoData = () => {
  return { type: ASYNC_LOAD_USER_INFO_DATA }
}

export const setIsLoadingUserInfoData = (isLoading: boolean) => {
  return { type: SET_IS_LOADING_USER_INFO_DATA, payload: isLoading }
}

export const setUserInfoData = (data: any) => {
  return { type: SET_USER_INFO_DATA, payload: data }
}
