import { Store } from 'redux'
import { IToast } from '../actions'

export interface IRootState extends Store {
  [x: string]: any
  toaster: {
    items: IToast[]
  }
  myDevice: {
    width: number
    type: string | null
    isDetected: boolean
  }
}
