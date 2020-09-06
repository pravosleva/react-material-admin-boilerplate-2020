/* eslint-disable max-len */
import React, { useState } from 'react'
import ImageGallery, { SVG } from '@/utils/react-image-gallery/src@1.0.8' // from 'react-image-gallery'
import { withStyles, Theme as ITheme } from '@material-ui/core/styles'
import styled, { css } from 'styled-components'
import { IProps } from './interfaces'
import './css/styles.css'
import { invertColor } from '@/utils/colors/invertColor'
// import { fadeIn } from '@/utils/styled-mui/animations/fadeIn'
// animation: ${fadeIn} 0.3s ease-in-out;

const defaultBannerHeight = 360
const defautBannerMaxWidthPercentage = 100
const BannerGalleryWrapper = styled('div')<IProps>`
  ${({ desktopOnly }) =>
    desktopOnly &&
    css`
      @media (max-width: 767px) {
        display: none;
      }
    `}
  ${({ mobileOnly }) =>
    mobileOnly &&
    css`
      @media (min-width: 768px) {
        display: none;
      }
    `}
  max-height: ${defaultBannerHeight}px;
  & > div {
    max-height: ${defaultBannerHeight}px;
  }
  & > div div {
    max-height: ${defaultBannerHeight}px;
  }
  & > div img {
    width: 100%;
    max-width: 100%;
    height: ${defaultBannerHeight}px;
    // object-fit: cover;
    object-fit: contain;
    cursor: pointer;
  }
  max-width: ${defautBannerMaxWidthPercentage}%;
  width: 100%;
  ${({ bannerMaxWidth }) =>
    bannerMaxWidth &&
    css`
      & > div img {
        width: 100%;
        max-width: ${bannerMaxWidth}px;
      }
    `}
  ${({ color1, color2 }) =>
    color1 &&
    color2 &&
    css`
      background: linear-gradient(top, ${color1} 0%, ${color2} 100%);
      background-image: -moz-linear-gradient(top, ${color1} 0%, ${color2} 100%);
      background-image: -o-linear-gradient(top, ${color1} 0%, ${color2} 100%);
      background-image: -webkit-gradient(
        linear,
        left top,
        left bottom,
        color-stop(0, ${color1}),
        color-stop(1, ${color2})
      );
      background-image: -webkit-linear-gradient(
        top,
        ${color1} 0%,
        ${color2} 100%
      );
      background: -ms-linear-gradient(top, ${color1} 0%, ${color2} 100%);
      background: linear-gradient(top, ${color1} 0%, ${color2} 100%);
      filter: progid:DXImageTransform.Microsoft.gradient(GradientType=0,startColorstr=${color1}, endColorstr=${color2});
      background-size: 100% ${defaultBannerHeight}px;
      background-repeat: no-repeat;
    `}
  position: relative;
  z-index: 1;
  &::before {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    /* background-image: linear-gradient(
      to bottom,
      hsl(344, 100%, 50%),
      hsl(31, 100%, 40%)
    ); */
    
    ${({ color1, color2 }) =>
      color1 &&
      color2 &&
      css`
        background: linear-gradient(top, ${color1} 0%, ${color2} 100%);
      `}
    z-index: -1;
    transition: opacity 0.5s linear;
    opacity: 0.5;
  }
  &:hover::before {
    opacity: 1;
  }

  ${({ bannerHeight }) =>
    bannerHeight &&
    css`
      background-size: 100% ${bannerHeight}px;
      max-height: ${bannerHeight}px;
      & > div {
        max-height: ${bannerHeight}px;
      }
      & > div div {
        max-height: ${bannerHeight}px;
      }
      & > div img {
        height: ${bannerHeight}px;
      }
    `}
  
  display: flex;
  justify-content: center;
`
interface IGradientWrapperProps {
  color1: string
  color2: string
  bannerHeight?: number
  bannerMaxWidth?: number
}
const ImgGradientWrapper = styled('div')<IGradientWrapperProps>`
  /* width: 100vw;
  display: flex;
  justify-content: center;
  & > div {
    max-width: 1000px;
  } */
  /* ${({ bannerMaxWidth }) =>
    bannerMaxWidth &&
    css`
      width: ${bannerMaxWidth}px;
    `} */
  height: ${defaultBannerHeight}px;
  ${({ bannerHeight }) =>
    bannerHeight &&
    css`
      height: ${bannerHeight}px;
    `}
  ${({ bannerHeight }) =>
    bannerHeight &&
    css`
      background-size: 100% ${bannerHeight}px;
    `}
`

export const BannerAsGallery = withStyles((_theme: ITheme) => ({}), {
  name: 'custom-banner-gallery',
})(({ bannerHeight, bannerMaxWidth, ...props }: IProps) => {
  const [color1, setColor1] = useState(props.items[0].color1)
  const [color2, setColor2] = useState(props.items[0].color2)

  return (
    <BannerGalleryWrapper
      // key={`${color1};${color2}`}
      color1={color1}
      color2={color2}
      bannerMaxWidth={bannerMaxWidth}
      bannerHeight={bannerHeight}
      mobileOnly={props.mobileOnly}
      desktopOnly={props.desktopOnly}
    >
      <ImageGallery
        onSlide={(index: number) => {
          // eslint-disable-next-line no-console
          setColor1(props.items[index].color1)
          setColor2(props.items[index].color2)
        }}
        className="top_carousel"
        {...props}
        showBullets
        showPlayButton={false}
        // showNav={false}
        showThumbnails={false}
        showFullscreenButton={false}
        renderItem={({ original, color1, color2, url }: any) => (
          <ImgGradientWrapper
            bannerMaxWidth={bannerMaxWidth}
            bannerHeight={bannerHeight}
            color1={color1}
            color2={color2}
          >
            <img
              src={original}
              alt="no"
              title={`${color1}, ${color2}; GO TO ${url}`}
              onClick={() => {
                if (!!window && !!url) window.location.href = url
              }}
            />
          </ImgGradientWrapper>
        )}
        renderLeftNav={(onClick: () => void, disabled: boolean, { color2 }) => (
          <button
            type="button"
            className="image-gallery-icon image-gallery-left-nav"
            disabled={disabled}
            onClick={onClick}
            aria-label="Prev Slide"
          >
            <div style={{ transform: 'rotateY(180deg)' }}>
              {/* <i className="sp-ico sp-ico_for_rev slick-arrow"></i> */}
              <SVG
                icon="leftSmartPrice"
                viewBox="0 0 5 8"
                // strokeWidth={1}
                color={invertColor(color2)}
              />
            </div>
          </button>
        )}
        renderRightNav={(onClick: () => void, disabled: boolean, { color2 }) => (
          <button
            type="button"
            className="image-gallery-icon image-gallery-right-nav"
            disabled={disabled}
            onClick={onClick}
            aria-label="Next Slide"
          >
            <SVG
              icon="rightSmartPrice"
              viewBox="0 0 5 8"
              // strokeWidth={1}
              color={invertColor(color2)}
            />
            {/* <i className="sp-ico sp-ico_for_fwd slick-arrow"></i> */}
          </button>
        )}
      />
    </BannerGalleryWrapper>
  )
})
