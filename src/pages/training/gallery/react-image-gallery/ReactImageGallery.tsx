import React, { useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import { MultilingualContext } from '@/common/context/mutilingual'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'
import { BannerAsGallery } from '@/mui/custom-components/BannerAsGallery'
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
          <BannerAsGallery
            bannerHeight={400} // Optional
            items={[
              {
                original: 'http://80.87.194.181/api/uploads/849cf23ce1e74127a36c2b84788588ab.png',
                color1: '#fff',
                color2: '#01AEEF',
                url: 'http://pravosleva.ru',
              },
              {
                original: 'http://80.87.194.181/api/uploads/8129c3be2f9c42318f56c1904bc3c9b6.png',
                color1: '#fff',
                color2: '#01AEEF',
                url: 'http://uremont.com',
              },
              {
                original: 'https://sps26.ooo/uploads/posts/2019-03/1553167658_7ed518f17bcc5fcf99c37f5c59217cd7.png',
                color1: '#fff',
                color2: '#E51D2B',
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
