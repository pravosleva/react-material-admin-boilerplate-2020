import React, { useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import { MultilingualContext } from '@/common/context/mutilingual'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'
import { Banner } from '@/mui/custom-components/Banner'
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
        | <code>react-image-gallery</code>
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={5}>
          <Banner
            items={[
              {
                original: 'http://80.87.194.181/api/uploads/849cf23ce1e74127a36c2b84788588ab.png',
              },
              {
                original: 'http://80.87.194.181/api/uploads/8129c3be2f9c42318f56c1904bc3c9b6.png',
              },
            ]}
          />
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
