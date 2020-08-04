import React, { useContext, useEffect, useState } from 'react'
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
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const toolbarMenuItem: IToolbarMenuItem = toolbarMenu.find(({ path }) => path === '/training')
const { sublist } = toolbarMenuItem
const {
  options: { description },
} = sublist.find(({ path }) => path === '/training/abort-controller')

export const AbortController = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [debounce, setDebounce] = useState<number>(1000)
  // const [shouldBeAborted, setShouldBeAborted] = useState(false)
  const onSuccess = (length: number) => {
    // Additional trigger for demo?
    // setShouldBeAborted(true)
    dispatch(
      showAsyncToast({
        text: `${length} items received`,
        type: 'success',
        delay: 5000,
      })
    )
  }
  const onFail = (error: any) => {
    dispatch(
      showAsyncToast({
        text: error.message ? `${getReadableCamelCase(error.name)}: ${error.message}` : 'Error could not be handled',
        type: 'error',
        delay: 5000,
      })
    )
  }
  const onCall = () => {
    dispatch(
      showAsyncToast({
        text: 'Called...',
        type: 'info',
        delay: 5000,
      })
    )
  }
  const onAbortIfRequestStarted = (startedValue: boolean) => {
    dispatch(
      showAsyncToast({
        text: `Started request aborted... ${String(startedValue)}`,
        type: 'warning',
        delay: 5000,
      })
    )
  }
  const [url, setUrl] = useState<string>('https://jsonplaceholder.typicode.com/users')
  const [testData, isLoaded, isLoading]: [IDataItem[], boolean, boolean] = useRemoteTestData({
    url,
    accessToken: '123',
    onSuccess,
    onFail,
    onCall,
    onAbortIfRequestStarted,
    debounce,
    // shouldBeAborted,
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
          <Paper className={classes.paper}>
            <div className={classes.buttonBox}>
              <TextField
                // className={classes.input}
                // fullWidth
                variant="outlined"
                label="URL"
                placeholder="URL"
                // error={isErrored}
                // helperText={isErrored && 'No more than 4 symbols'}
                autoFocus={true}
                inputProps={{
                  onChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => setUrl(e.target.value),
                  value: url,
                }}
              />
              <TextField
                id="outlined-number"
                // className={classes.input}
                label="Debounce"
                type="number"
                InputLabelProps={{
                  shrink: true,
                }}
                inputProps={{
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => setDebounce(Number(e.target.value)),
                  value: debounce,
                }}
                variant="outlined"
              />
              {/*
              <Button
                variant="contained"
                fullWidth
                color="primary"
                onClick={() => setShouldBeAborted(true)}
                title="Abort"
                disabled={!isLoading}
              >
                Abort
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                onClick={() => setShouldBeAborted(false)}
                title="Start"
                disabled={isLoading}
              >
                Start
              </Button>
              */}
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <Paper className={clsx(classes.paper, classes.code)}>
            {!!description ? <ReactMarkdown source={t(description)} /> : <em>{t('DESCRIPTION_NOT_FOUND')}</em>}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7} xl={7}>
          <Paper className={clsx(classes.paper, classes.code)}>
            {isLoaded && !!testData ? (
              <ReactJson src={testData} />
            ) : isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <h1>No correct data</h1>
            )}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={5} lg={5} xl={5}>
          <Paper className={clsx(classes.paper)}>
            <ReactJson src={{ isLoaded, isLoading }} />
          </Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
