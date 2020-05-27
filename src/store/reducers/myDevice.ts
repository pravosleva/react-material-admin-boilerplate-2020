import { SET_DEVICE_DATA } from '@/actions'

const inititalState = {
  width: 0,
  type: null,
  isDetected: false,
}

export const myDevice = (state = inititalState, action: any) => {
  switch (action.type) {
    case SET_DEVICE_DATA:
      if (action.payload.width === state.width) return state
      return { ...action.payload, isDetected: true }
    default:
      return state
  }
}
