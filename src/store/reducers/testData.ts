import { SET_TEST_DATA, SET_IS_LOADING_TEST_DATA } from '@/actions'

const inititalState = {
  isLoading: false,
  data: null,
}

export const myDevice = (state = inititalState, action: any) => {
  switch (action.type) {
    case SET_IS_LOADING_TEST_DATA:
      return {
        ...state,
        isLoading: action.payload,
      }
    case SET_TEST_DATA:
      return { ...state, data: action.payload, isLoading: false }
    default:
      return state
  }
}
