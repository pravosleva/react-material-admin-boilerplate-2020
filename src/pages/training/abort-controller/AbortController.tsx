import React, { useContext, useCallback, useState } from 'react'
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
import FormGroup from '@material-ui/core/FormGroup'
import FormLabel from '@material-ui/core/FormLabel'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import Switch from '@material-ui/core/Switch'
import intl from 'react-intl-universal'
import Badge from '@material-ui/core/Badge'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline'
import PanToolIcon from '@material-ui/icons/PanTool'

const toolbarMenuItem: IToolbarMenuItem = toolbarMenu.find(({ path }) => path === '/training')
const { sublist } = toolbarMenuItem
const {
  options: { description },
} = sublist.find(({ path }) => path === '/training/abort-controller')
const successBadgeProps = {
  color: 'secondary' as 'secondary',
  children: <CheckCircleOutlineIcon fontSize="large" color="secondary" />,
}
const failedBadgeProps = {
  color: 'error' as 'error',
  children: <ErrorOutlineIcon fontSize="large" color="error" />,
}
const abortedBadgeProps = {
  color: 'default' as 'default',
  children: <PanToolIcon fontSize="large" color="inherit" />,
}

export const AbortController = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const dispatch = useDispatch()
  const [debounce, setDebounce] = useState<number>(1000)
  const [successResponseCounter, setSuccessResponseCounter] = useState(0)
  const [failedResponseCounter, setFailedResponseCounter] = useState(0)
  const [abortedResponseCounter, setAbortedResponseCounter] = useState(0)
  const onSuccess = useCallback((length: number) => {
    setSuccessResponseCounter((c) => c + 1)
    dispatch(
      showAsyncToast({
        text: `RESULT: ${length} items received`,
        type: 'success',
        delay: 5000,
      })
    )
  }, [])
  const onFail = useCallback((error: any) => {
    setFailedResponseCounter((c) => c + 1)
    dispatch(
      showAsyncToast({
        text: error.message
          ? `RESULT: ${getReadableCamelCase(error.name)}: ${error.message}`
          : 'Error could not be handled',
        type: 'error',
        delay: 5000,
      })
    )
  }, [])
  const onCall = useCallback(() => {
    dispatch(
      showAsyncToast({
        text: 'Called...',
        type: 'info',
        delay: 5000,
      })
    )
  }, [])
  const onAbortIfRequestStarted = useCallback((_startedReqWasAborted: boolean) => {
    setAbortedResponseCounter((c) => c + 1)
    dispatch(
      showAsyncToast({
        text: 'Started request aborted...',
        type: 'warning',
        delay: 5000,
      })
    )
  }, [])
  const [url, setUrl] = useState<string>('https://jsonplaceholder.typicode.com/users')
  const [isActiveDelay, setIsActiveDelay] = useState<boolean>(true)
  const [isActiveOnCallMsg, setIsActiveOnCallMsg] = useState<boolean>(true)
  const [isActiveOnAbortIfRequestStarted, setIsActiveOnAbortIfRequestStarted] = useState<boolean>(true)
  const [testData, isLoaded, isLoading]: [IDataItem[], boolean, boolean] = useRemoteTestData({
    url,
    accessToken: '123',
    onSuccess,
    onFail,
    onCall: isActiveOnCallMsg && onCall,
    onAbortIfRequestStarted: isActiveOnAbortIfRequestStarted && onAbortIfRequestStarted,
    debounce,
    isActiveDelay,
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
            <div className={classes.gridBox}>
              <TextField
                // fullWidth
                variant="outlined"
                label="URL"
                placeholder="URL"
                // TODO: Check by isValidURL
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
                label={t('DEBOUNCE')}
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
              <FormControl component="fieldset">
                <FormLabel component="legend">{t('SETTINGS')}</FormLabel>
                <FormGroup
                // row
                // className={classes.switchersBox}
                >
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActiveDelay}
                        onChange={() => setIsActiveDelay((d) => !d)}
                        name="checkedA"
                        color="primary"
                      />
                    }
                    label={intl.get('ADDITIONAL_DELAY_SEC_FOR_DEMONSTRATE', { seconds: 5 })}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActiveOnCallMsg}
                        onChange={() => setIsActiveOnCallMsg((val) => !val)}
                        name="checkedB"
                        color="primary"
                      />
                    }
                    label={t('SERVICE_MSG_ON_CALL')}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={isActiveOnAbortIfRequestStarted}
                        onChange={() => setIsActiveOnAbortIfRequestStarted((val) => !val)}
                        name="checkedC"
                        color="primary"
                      />
                    }
                    label={t('SERVICE_MSG_ON_ABORT_IF_REQUEST_STARTED')}
                  />
                </FormGroup>
                <FormHelperText>
                  {intl.get('SUCCESS_RESPONSES', { counter: successResponseCounter })}{' '}
                  {intl.get('FAILED_RESPONSES', { counter: failedResponseCounter })}{' '}
                  {intl.get('MANUALLY_ABORTED_REQS', { counter: abortedResponseCounter })}
                </FormHelperText>
              </FormControl>
              <div className={classes.badgeBox}>
                <Badge badgeContent={successResponseCounter} {...successBadgeProps} />
                <Badge badgeContent={failedResponseCounter} {...failedBadgeProps} />
                <Badge badgeContent={abortedResponseCounter} {...abortedBadgeProps} />
              </div>
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