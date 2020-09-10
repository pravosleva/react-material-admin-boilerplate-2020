export interface IItem {
  original: string
  // description?: string
  url: string
  color1: string
  color2: string
}
export type TItems = IItem[]
export interface IBannerGalleryWrapperProps {
  desktopOnly?: boolean
  mobileOnly?: boolean
  bannerHeight: number
}

export interface IProps {
  desktopOnly?: boolean
  mobileOnly?: boolean
  items: IItem[]
  bannerHeight: number
}
