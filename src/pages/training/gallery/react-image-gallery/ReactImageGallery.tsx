/* eslint-disable max-len */
import React, { useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import { MultilingualContext } from '@/common/context/mutilingual'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'
import { BannerAsGallery as BannerAsGallery1 } from '@/mui/custom-components/BannerAsGallery'
import { BannerAsGallery as BannerAsGallery2 } from '@/mui/custom-components/BannerAsGallery2'
import 'react-image-gallery/styles/css/image-gallery.css'

export const ReactImageGallery = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        |{' '}
        <Link className={classes.noTextDecoration} to="/training/gallery">
          {t('GALLERY')}
        </Link>{' '}
        | <code>react-image-gallery</code>
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2>v2</h2>
          <BannerAsGallery2
            bannerHeight={400} // Optional
            bannerMaxWidth={1000}
            items={[
              {
                original: 'https://smartprice.ru/static/img/smartprice/rdbanners/index/desktop/1745251.jpg',
                color1: '#F2F2F2',
                color2: '#F2F2F2',
                url: 'https://smartprice.ru',
              },
              {
                original: 'https://smartprice.ru/static/img/smartprice/rdbanners/index/desktop/1551246.jpg',
                color1: '#3482C4',
                color2: '#3482C4',
                url: 'https://smartprice.ru',
              },
              {
                original: 'https://smartprice.ru/static/img/smartprice/rdbanners/index/desktop/1461867.jpg',
                color1: '#3482C4',
                color2: '#3482C4',
                url: 'https://smartprice.ru',
              },
              {
                original: 'http://80.87.194.181/api/uploads/fd083df137d445d69deb253fd8201ef6.jpg',
                color1: '#fff',
                // color2: '#01AEEF',
                color2: '#172233',
                url: 'http://uremont.com',
              },
              {
                original: 'https://i.pinimg.com/originals/59/01/ae/5901ae2060def93a2ad332385e03dab8.png',
                color1: '#fff',
                color2: '#000',
                url: 'http://uremont.com',
              },
              {
                original: 'https://img1.goodfon.com/wallpaper/nbig/c/1b/programmirovanie-funkciya.jpg',
                color1: '#fff',
                color2: '#24251F',
                url: 'http://uremont.com',
              },
              {
                original: '/5a3a250e0952d4.09849609151376001403825607.png',
                color1: '#fff',
                color2: '#E61D2B',
                url: 'http://uremont.com',
              },
              {
                original:
                  'https://i0.wp.com/worldscholarshipforum.com/wp-content/uploads/2018/11/pepsi-scholarship.png?fit=733%2C508&ssl=1',
                color1: '#0F3792',
                color2: '#0F5CA2',
                url: 'http://uremont.com',
              },
              {
                original:
                  'https://cdn.scores24.ru/static/ru/repost-previews/scores24/match/csgo/10-03-2020-teamone-infinity.jpg',
                color1: '#F1F1F3',
                color2: '#C8C8CA',
                url: 'http://uremont.com',
              },
            ]}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <h2>v1</h2>
          <BannerAsGallery1
            bannerHeight={400} // Optional
            items={[
              {
                original: 'http://80.87.194.181/api/uploads/fd083df137d445d69deb253fd8201ef6.jpg',
                color1: '#fff',
                // color2: '#01AEEF',
                color2: '#172233',
                url: 'http://pravosleva.ru',
              },
              {
                original: 'https://i.pinimg.com/originals/59/01/ae/5901ae2060def93a2ad332385e03dab8.png',
                color1: '#fff',
                color2: '#000',
                url: 'http://uremont.com',
              },
              {
                original: 'https://img1.goodfon.com/wallpaper/nbig/c/1b/programmirovanie-funkciya.jpg',
                color1: '#fff',
                color2: '#24251F',
                url: 'http://uremont.com',
              },
              {
                original: '/5a3a250e0952d4.09849609151376001403825607.png',
                color1: '#fff',
                color2: '#E61D2B',
                url: 'http://uremont.com',
              },
              {
                original:
                  'https://i0.wp.com/worldscholarshipforum.com/wp-content/uploads/2018/11/pepsi-scholarship.png?fit=733%2C508&ssl=1',
                color1: '#0F3792',
                color2: '#0F5CA2',
                url: 'http://uremont.com',
              },
            ]}
          />
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
