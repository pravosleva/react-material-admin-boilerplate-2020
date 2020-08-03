import React, { useContext, useState, useCallback, useMemo } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import Button from '@material-ui/core/Button'
import { useStyles } from './styles'
import ReactJson from 'react-json-view'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { showAsyncToast } from '@/actions'
import { useInput } from './hooks/useInput'

export const CustomHook = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const [firstName, bindFirstName, resetFirstName] = useInput('')
  const [lastName, bindLastName, resetLastName] = useInput('')
  const resetAll = () => {
    // @ts-ignore This expression is not callable.
    resetFirstName()
    // @ts-ignore This expression is not callable.
    resetLastName()
  }
  const couldBeSent = () => !!firstName && !!lastName
  const isSubmitDisabled = useMemo(() => !couldBeSent(), [firstName, lastName])
  const isResetDisabled = useMemo(() => !firstName && !lastName, [firstName, lastName])
  const dispatch = useDispatch()
  const submitHandler = () => {
    dispatch(
      showAsyncToast({
        text: `First name: ${firstName}, Last name: ${lastName}`,
        type: 'info',
        delay: 5000,
      })
    )
  }

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        | Custom hook
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
          <Paper className={clsx(classes.paper, classes.inputGrid)}>
            <TextField
              className={classes.input}
              variant="outlined"
              label="First name"
              placeholder="First name"
              autoFocus={true}
              inputProps={{
                // @ts-ignore Property 'onChange' does not exist on type 'string'.
                onChange: bindFirstName.onChange,
                // @ts-ignore Property 'value' does not exist on type 'string'.
                value: bindFirstName.value,
              }}
            />
            <TextField
              className={classes.input}
              variant="outlined"
              label="Last name"
              placeholder="Last name"
              // @ts-ignore Type 'string' is not assignable to type 'InputBaseComponentProps'.
              inputProps={bindLastName}
            />
            <Button
              variant="contained"
              fullWidth
              color="primary"
              disabled={isSubmitDisabled}
              onClick={submitHandler}
              title={t('SUBMIT')}
            >
              {t('SUBMIT')}
            </Button>
            <Button
              variant="contained"
              fullWidth
              color="secondary"
              disabled={isResetDisabled}
              onClick={resetAll}
              title={t('RESET')}
            >
              {t('RESET')}
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={8} xl={10}>
          <Paper className={classes.paper}>
            <ReactJson src={{ firstName, lastName }} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Paper className={clsx(classes.paper, classes.reactYoutubeContainer)}>
            <YouTube videoId="6am-yn3ZLEw" className={classes.reactYoutube} />
          </Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
