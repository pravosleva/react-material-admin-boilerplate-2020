import React from 'react'
import { number, oneOf, string } from 'prop-types'
import { ChevronRightIcon as NextSmartPriceSVG } from '@/mui/custom-components/BannerAsGallery/svg/ChevronRightIcon'
// import { Back as BackSmartPriceSVG } from '@/mui/custom-components/BannerAsGallery/svg/Back'

const left = () => <polyline points="15 18 9 12 15 6" />
const leftSmartPrice = ({ color }) => <NextSmartPriceSVG color={color} />
const right = () => <polyline points="9 18 15 12 9 6" />
const rightSmartPrice = ({ color }) => <NextSmartPriceSVG color={color} />
const maximize = () => (
  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
)
const minimize = () => (
  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
)
const play = () => <polygon points="5 3 19 12 5 21 5 3" />
const pause = () => (
  <React.Fragment>
    <rect x="6" y="4" width="4" height="16" />
    <rect x="14" y="4" width="4" height="16" />
  </React.Fragment>
)

const iconMapper = {
  left,
  leftSmartPrice,
  right,
  rightSmartPrice,
  maximize,
  minimize,
  play,
  pause,
}

const SVG = (props) => {
  const { strokeWidth, viewBox, icon, color } = props
  return (
    <svg
      className="image-gallery-svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      // fill="none"
      // stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {iconMapper[icon]({ color })}
    </svg>
  )
}

SVG.propTypes = {
  strokeWidth: number,
  viewBox: string,
  icon: oneOf(['left', 'leftSmartPrice', 'right', 'rightSmartPrice', 'maximize', 'minimize', 'play', 'pause'])
    .isRequired,
  color: string,
}

SVG.defaultProps = {
  strokeWidth: 1,
  viewBox: '0 0 24 24',
  color: '#fff',
}

export default SVG
