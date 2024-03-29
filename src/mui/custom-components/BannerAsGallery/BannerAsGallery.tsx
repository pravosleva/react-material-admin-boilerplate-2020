/* eslint-disable max-len */
import React from 'react'
import ImageGallery, { SVG } from '@/utils/react-image-gallery/src@1.0.8' // from 'react-image-gallery'
import { withStyles, Theme as ITheme } from '@material-ui/core/styles'
import styled, { css } from 'styled-components'
import { IProps, IBannerGalleryWrapperProps } from './interfaces'
import { invertColor } from '@/utils/colors/invertColor'

const defaultBannerHeight = 360
const BannerGalleryWrapper = styled('div')<IBannerGalleryWrapperProps>`
  && .image-gallery-icon {
    color: #fff;
    transition: all .2s ease-out;
    appearance: none;
    background-color: transparent;
    border: 0;
    cursor: pointer;
    outline: none;
    position: absolute;
    z-index: 4;
    /* filter: drop-shadow(0 2px 2px #1a1a1a); } */
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.4)) !important;
  }
  && .image-gallery-using-mouse .image-gallery-icon:focus {
    outline: none;
  }
  && .image-gallery-left-nav .image-gallery-svg, .image-gallery-right-nav .image-gallery-svg {
    height: 110px !important;
    width: 50px !important;
  }

  && .image-gallery-right-nav svg,
  && .image-gallery-left-nav svg {
    transform: scale(1) !important;
  }
  && .image-gallery-right-nav svg:hover
  && .image-gallery-left-nav svg:hover {
    transform: scale(1);
  }

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
  /* width: 100vw;
  display: flex;
  justify-content: center;
  & > div {
    max-width: 1000px;
  } */
  height: ${defaultBannerHeight}px;
  ${({ bannerHeight }) =>
    bannerHeight &&
    css`
      height: ${bannerHeight}px;
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
      className="top_carousel"
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
      renderLeftNav={(onClick: () => void, disabled: boolean, { color2 }) => (
        <button
          type="button"
          className="image-gallery-icon image-gallery-left-nav"
          disabled={disabled}
          onClick={onClick}
          aria-label="Prev Slide"
        >
          {/* <i className="sp-ico sp-ico_for_rev slick-arrow"></i> */}
          <SVG
            icon="leftSmartPrice"
            // viewBox="0 0 5 8"
            viewBox="-7 -5 24 24"
            // strokeWidth={1}
            color={invertColor(color2)}
          />
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
            viewBox="-7 -5 24 24"
            // strokeWidth={1}
            color={invertColor(color2)}
          />
          {/* <i className="sp-ico sp-ico_for_fwd slick-arrow"></i> */}
        </button>
      )}
    />
  </BannerGalleryWrapper>
))
