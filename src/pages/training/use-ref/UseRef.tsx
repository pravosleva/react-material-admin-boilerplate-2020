import React, { useContext, useState, useCallback, useRef, useEffect } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { useStyles } from './styles'
import { Link } from 'react-router-dom'
import TextField from '@material-ui/core/TextField'
import YouTube from 'react-youtube'
import clsx from 'clsx'

export const UseRef = () => {
  const { t } = useContext(MultilingualContext)
  const classes = useStyles()
  const [state, setState] = useState('')
  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setState(e.target.value)
    },
    [setState]
  )
  const renderCount = useRef(0)
  useEffect(() => {
    renderCount.current = renderCount.current + 1
  })

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        | <code>useRef</code>
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
          <Paper className={classes.paper}>
            <TextField
              className={classes.input}
              variant="outlined"
              label="Name"
              placeholder="Name"
              autoFocus={true}
              inputProps={{
                onChange: handleChangeName,
                value: state,
              }}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={8} xl={10}>
          <Paper className={classes.paper}>
            <em>Render count: {renderCount.current}</em>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Paper className={clsx(classes.paper, classes.reactYoutubeContainer)}>
            <YouTube videoId="t2ypzz6gJm0" className={classes.reactYoutube} />
          </Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
