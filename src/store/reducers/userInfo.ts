import { SET_USER_INFO_DATA, SET_IS_LOADING_USER_INFO_DATA } from '@/actions'

const inititalState = {
  isLoading: false,
  data: null,
}

export const userInfo = (state = inititalState, action: any) => {
  switch (action.type) {
    case SET_IS_LOADING_USER_INFO_DATA:
      return {
        ...state,
        isLoading: action.payload,
      }
    case SET_USER_INFO_DATA:
      return { ...state, data: action.payload, isLoading: false }
    default:
      return state
  }
}
