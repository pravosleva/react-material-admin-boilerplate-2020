import React from 'react'
import ImageGallery from '@/utils/react-image-gallery/src@1.0.8' // from 'react-image-gallery'
import { withStyles, Theme as ITheme } from '@material-ui/core/styles'
import styled, { css } from 'styled-components'
import { IProps } from './interfaces'

const defaultBannerHeight = 360
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
    height: ${defaultBannerHeight}px;
    object-fit: contain;
    cursor: pointer;
  }
  ${({ bannerHeight }) =>
    bannerHeight &&
    css`
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
`
interface IGradientWrapperProps {
  color1: string
  color2: string
  bannerHeight: number
}
const ImgGradientWrapper = styled('div')<IGradientWrapperProps>`
  height: ${defaultBannerHeight}px;
  ${({ bannerHeight }) =>
    bannerHeight &&
    css`
      height: ${bannerHeight}px;
      border: 1px solid blue;
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
      height: 1%;
      background-size: 100% ${defaultBannerHeight}px;
      background-repeat: no-repeat;
    `}
  ${({ bannerHeight }) =>
    bannerHeight &&
    css`
      background-size: 100% ${bannerHeight}px;
    `}
`

export const BannerAsGallery = withStyles((_theme: ITheme) => ({}), {
  name: 'custom-banner-gallery',
})(({ bannerHeight, ...props }: IProps) => (
  <BannerGalleryWrapper bannerHeight={bannerHeight} mobileOnly={props.mobileOnly} desktopOnly={props.desktopOnly}>
    <ImageGallery
      {...props}
      showBullets
      showPlayButton={false}
      // showNav={false}
      showThumbnails={false}
      showFullscreenButton={false}
      renderItem={({ original, color1, color2, url }: any) => (
        <ImgGradientWrapper bannerHeight={bannerHeight} color1={color1} color2={color2}>
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
      renderRightNav={(onClick: () => void, disabled: boolean) => (
        <button
          type="button"
          className="image-gallery-icon image-gallery-right-nav"
          disabled={disabled}
          onClick={onClick}
          aria-label="Next Slide"
          style={{ border: '1px dashed red' }}
        >
          Custom R
        </button>
      )}
    />
  </BannerGalleryWrapper>
))
