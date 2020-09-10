/* eslint-disable max-len */
import React from 'react'
import ImageGallery, { SVG } from '@/utils/react-image-gallery/src@1.0.8' // from 'react-image-gallery'
import { withStyles, Theme as ITheme } from '@material-ui/core/styles'
import styled, { css } from 'styled-components'
import { IProps, IWrapperProps } from './interfaces'
import { invertColor } from '@/utils/colors/invertColor'
// import { fadeIn } from '@/utils/styled-mui/animations/fadeIn'
// animation: ${fadeIn} 0.3s ease-in-out;

const defaultBannerHeight = 360
const defautBannerMaxWidthPercentage = 100
const BannerGalleryWrapper = styled('div')<IWrapperProps>`
  && .image-gallery-icon.modified2 {
    filter: drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2)) !important;
  }
  && .image-gallery-right-nav.modified2 svg {
    transform: scale(1) !important;
  }
  && .image-gallery-left-nav.modified2 svg {
    transform: scale(1) !important;
  }
  && .image-gallery-right-nav.modified2 svg:hover,
  && .image-gallery-left-nav.modified2 svg:hover {
    opacity: 0.6;
  }
  @media(min-width: 768px) {
    && .image-gallery-right-nav.modified2 svg {
      transform: scale(1) translateX(100%) !important;
    }
    && .image-gallery-left-nav.modified2 svg {
      transform: scale(1) translateX(-100%) !important;
    }
  }
  @media(min-width: 1500px) {
    && .image-gallery-right-nav.modified2 svg {
      transform: scale(1) translateX(100%) !important;
    }
    && .image-gallery-left-nav.modified2 svg {
      transform: scale(1) translateX(-100%) !important;
    }
  }
  && .image-gallery-icon.modified2:focus {
    outline: none;
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
  bannerHeight?: number
  bannerMaxWidth?: number
}
const ImgGradientWrapper = styled('div')<IGradientWrapperProps>`
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
  name: 'custom-banner-gallery2',
})(({ bannerHeight, bannerMaxWidth, onSlide, color1, color2, ...props }: IProps) => {
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
        onSlide={onSlide}
        className="top_carousel"
        {...props}
        showBullets
        showPlayButton={false}
        // showNav={false}
        showThumbnails={false}
        showFullscreenButton={false}
        // onErrorImageURL="/steamuserimages-a.akamaihd.net.gif"
        // onErrorImageURL="https://cmates.blob.core.windows.net/cmmaterial/material_18_4_25_rqyps.jpeg"
        // autoPlay
        // slideInterval={3000}
        renderItem={({ original, color1, color2, url }: any) => (
          <ImgGradientWrapper bannerMaxWidth={bannerMaxWidth} bannerHeight={bannerHeight}>
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
        renderLeftNav={(
          onClick: () => void,
          disabled: boolean
          // _originalProps
        ) => (
          <button
            type="button"
            className="image-gallery-icon image-gallery-left-nav modified2"
            disabled={disabled}
            onClick={onClick}
            aria-label="Prev Slide"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            {/* <i className="sp-ico sp-ico_for_rev slick-arrow"></i> */}
            <SVG
              icon="leftSmartPrice"
              viewBox="-7 -5 24 24"
              // strokeWidth={1}
              color={invertColor(color2)}
            />
          </button>
        )}
        renderRightNav={(
          onClick: () => void,
          disabled: boolean
          // _originalProps
        ) => (
          <button
            type="button"
            className="image-gallery-icon image-gallery-right-nav modified2"
            disabled={disabled}
            onClick={onClick}
            aria-label="Next Slide"
            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
          >
            <SVG
              icon="rightSmartPrice"
              // viewBox="0 0 5 8"
              viewBox="-7 -5 24 24"
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
