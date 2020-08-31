import React, { useContext } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
// import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import { MultilingualContext } from '@/common/context/mutilingual'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'

export const Depth3 = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        |{' '}
        <Link className={classes.noTextDecoration} to="/training/nested-menu">
          {t('NESTED_MENU')}
        </Link>{' '}
        | Depth 3
      </h1>
      Nested route sample
      <ProTip />
    </Container>
  )
}
