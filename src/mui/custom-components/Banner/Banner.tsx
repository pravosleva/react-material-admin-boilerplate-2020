import React from 'react'
import ImageGallery from 'react-image-gallery'
import { withStyles, Theme as ITheme } from '@material-ui/core/styles'
import styled, { css } from 'styled-components'
import { IProps3 } from './interfaces'

const maxBannerHeight = 400
const BannerGalleryWrapper = styled('div')<IProps3>`
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
  max-height: ${maxBannerHeight}px;
  & > div {
    max-height: ${maxBannerHeight}px;
  }
  & > div > div {
    max-height: ${maxBannerHeight}px;
  }
  & > div > div > div {
    max-height: ${maxBannerHeight}px;
  }
  & > div > div > div > div {
    max-height: ${maxBannerHeight}px;
  }
  & > div > div > div > div > div {
    max-height: ${maxBannerHeight}px;
  }
`
interface IGradientWrapperProps {
  color1: string
  color2: string
}
const ImgGradientWrapper = styled('div')<IGradientWrapperProps>`
  height: ${maxBannerHeight}px;
  /* background: linear-gradient(0.25turn, #3f87a6, #ebf8e1, #f69d3c); */
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
      background-size: 100% 360px;
      background-repeat: no-repeat;
    `}
  display: flex;
  justify-content: center;
  align-items: center;
`

export const Banner = withStyles((_theme: ITheme) => ({}), {
  name: 'custom-banner-gallery',
})((props: IProps3) => (
  <BannerGalleryWrapper mobileOnly={props.mobileOnly} desktopOnly={props.desktopOnly}>
    <ImageGallery
      {...props}
      showBullets
      showPlayButton={false}
      // showNav={false}
      showThumbnails={false}
      showFullscreenButton={false}
      renderItem={({ original, color1, color2, url }: any) => (
        <ImgGradientWrapper color1={color1} color2={color2}>
          <img src={original} alt="no" title={`${color1}, ${color2}, ${url}`} width="100%" height="auto" />
        </ImgGradientWrapper>
      )}
    />
  </BannerGalleryWrapper>
))
