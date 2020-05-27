export const SET_DEVICE_DATA = 'SET_DEVICE_DATA'

interface IDeviceData {
  type: string | null
  width: number
}

export const setDeviceType = (deviceData: IDeviceData) => {
  return { type: SET_DEVICE_DATA, payload: deviceData }
}
