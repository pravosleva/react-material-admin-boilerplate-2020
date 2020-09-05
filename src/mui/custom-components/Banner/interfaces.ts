export interface IItem {
  original: string
  description?: string
  color1?: string
  color2?: string
  url: string
}
export type TItems = IItem[]
export interface IProps3 {
  desktopOnly?: boolean
  mobileOnly?: boolean
  items: IItem[]
  [key: string]: any
}
