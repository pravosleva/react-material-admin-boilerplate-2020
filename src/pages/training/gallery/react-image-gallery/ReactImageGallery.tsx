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
import ColorPicker from 'material-ui-color-picker'
import { useImmerReducer } from 'use-immer'

function v2Reducer(draft, action) {
  switch (action.type) {
    case 'SET_COLOR2': {
      draft[action.index].color2 = action.value
      return
    }
    case 'SET_COLOR1': {
      draft[action.index].color1 = action.value
      return
    }
    default:
      return
  }
}
const initialV2State = [
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
    original: 'https://smartprice.ru/static/img/smartprice/rdbanners/index/desktop/1745251.jpg',
    color1: '#F2F2F2',
    color2: '#F2F2F2',
    url: 'https://smartprice.ru',
  },
  {
    original: '/10-03-2020-teamone-infinity.920x360.jpg',
    color1: '#EFEFF1',
    color2: '#DBDBDD',
    url: 'http://uremont.com',
  },
]

export const ReactImageGallery = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const [v2State, dispatchV2] = useImmerReducer(v2Reducer, initialV2State)
  const handleV2Color2Change = (index: number) => (value: string) => {
    if (!!value) {
      dispatchV2({ type: 'SET_COLOR2', index, value })
    }
  }
  const handleV2Color1Change = (index: number) => (value: string) => {
    if (!!value) {
      dispatchV2({ type: 'SET_COLOR1', index, value })
    }
  }

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
        <Grid item xs={12} sm={12} md={4} lg={4} xl={4}>
          <h2>v2: 920x360</h2>
          <p>First slide</p>
          <ColorPicker
            name="color1"
            defaultValue={v2State[0].color1}
            value={v2State[0].color1}
            onChange={handleV2Color1Change(0)}
            fullWidth
            variant="filled"
            label="color1"
            size="small"
            style={{ marginBottom: '10px' }}
          />
          <ColorPicker
            name="color2"
            defaultValue={v2State[0].color2}
            value={v2State[0].color2}
            onChange={handleV2Color2Change(0)}
            fullWidth
            variant="filled"
            label="color2"
            size="small"
          />
        </Grid>
        <Grid item xs={12} sm={12} md={1} lg={1} xl={1}></Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <BannerAsGallery2
            bannerHeight={400} // Optional
            bannerMaxWidth={1000}
            items={v2State}
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
                original: '/code-0.920x360.png',
                color1: '#FCC060',
                color2: '#000',
                url: 'https://google.com',
              },
              {
                original: 'https://img1.goodfon.com/wallpaper/nbig/c/1b/programmirovanie-funkciya.jpg',
                color1: '#B7DD50',
                color2: '#262721',
                url: 'https://google.com',
              },
              {
                original: '/5a3a250e0952d4.09849609151376001403825607.png',
                color1: '#FEFEFE',
                color2: '#E61D2B',
                url: 'https://uremont.com',
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
