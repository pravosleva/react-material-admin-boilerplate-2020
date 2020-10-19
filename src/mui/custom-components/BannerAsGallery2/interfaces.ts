export interface IItem {
  original: string
  // description?: string
  color1?: string
  color2?: string
  url: string
}
export type TItems = IItem[]
export interface IProps {
  desktopOnly?: boolean
  mobileOnly?: boolean
  items: IItem[]
  color1: string
  color2: string
  bannerHeight?: number
  bannerMaxWidth?: number
  onSlide: (index: number) => void
}
export interface IWrapperProps {
  desktopOnly?: boolean
  mobileOnly?: boolean
  color1: string
  color2: string
  bannerHeight?: number
  bannerMaxWidth?: number
}
