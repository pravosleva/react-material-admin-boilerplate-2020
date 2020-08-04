import React, { useContext, useEffect } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useStyles } from './styles'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import { useRemoteTestData, IDataItem } from './hooks/useRemoteTestData'
import ReactJson from 'react-json-view'
import { useDispatch } from 'react-redux'
import { showAsyncToast } from '@/actions'
import { toolbarMenu, IToolbarMenuItem } from '@/mui/layouts/dashboard/toolbar-menu'
import ReactMarkdown from 'react-markdown'
import { getReadableCamelCase } from '@/utils/getReadableCamelCase'

const toolbarMenuItem: IToolbarMenuItem = toolbarMenu.find(({ path }) => path === '/training')
const { sublist } = toolbarMenuItem
const {
  options: { description },
} = sublist.find(({ path }) => path === '/training/abort-controller')

export const AbortController = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const dispatch = useDispatch()
  const cbSuccess = (length: number) => {
    dispatch(
      showAsyncToast({
        text: `${length} items received`,
        type: 'info',
        delay: 5000,
      })
    )
  }
  const cbFail = (error: any) => {
    dispatch(
      showAsyncToast({
        text: error.message ? `${getReadableCamelCase(error.name)}: ${error.message}` : 'Error could not be handled',
        type: 'warning',
        delay: 5000,
      })
    )
  }
  const [testData, isLoaded]: [IDataItem[], boolean] = useRemoteTestData({
    accessToken: '123',
    cbSuccess,
    cbFail,
  })

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        | <code>AbortController</code> usage
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper className={clsx(classes.paper, classes.code)}>
            {!!description ? <ReactMarkdown source={t(description)} /> : <em>{t('DESCRIPTION_NOT_FOUND')}</em>}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <Paper className={clsx(classes.paper, classes.code)}>
            {isLoaded && !!testData ? <ReactJson src={testData} /> : <h1>Loading...</h1>}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Paper className={clsx(classes.paper)}>{t('IN_PROGRESS')}</Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
