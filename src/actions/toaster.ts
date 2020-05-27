export type TToast = 'default' | 'error' | 'warning' | 'info' | 'success'
export type TStatus = 'show-started' | 'show-finished' | 'hide-started' | 'hide-finished'

export interface IToast {
  id: number
  text: string
  delay: number
  type: TToast
  status: TStatus
}
export interface IShowAsyncArg {
  text: string
  delay: number
  type: TToast
}

export const SHOW_TOAST_START = 'SHOW_TOAST_START'
export const SHOW_TOAST_FINISH = 'SHOW_TOAST_FINISH'
export const HIDE_TOAST_START = 'HIDE_TOAST_START'
export const HIDE_TOAST_FINISH = 'HIDE_TOAST_FINISH'
export const REMOVE_TOAST = 'REMOVE_TOAST'
export const FORCE_HIDE_TOAST = 'FORCE_HIDE_TOAST'
export const SHOW_TOAST_ASYNC = 'SHOW_TOAST_ASYNC'

export const showAsyncToast = (props: IShowAsyncArg) => {
  const { text, delay, type } = props

  return { type: SHOW_TOAST_ASYNC, payload: { text, delay, type } }
}

export const forceHideToast = (id: number) => {
  return { type: FORCE_HIDE_TOAST, payload: id }
}
