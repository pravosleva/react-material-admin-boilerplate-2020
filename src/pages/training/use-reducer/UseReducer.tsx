import React, { useContext, useReducer, useMemo, useCallback } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import Button from '@material-ui/core/Button'
import { useStyles } from './useStyles'
import ReactJson from 'react-json-view'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'
import YouTube from 'react-youtube'
import clsx from 'clsx'

interface IState {
  value: number
  name: string
}
interface IAction {
  type: 'INC' | 'DEC' | 'CHANGE_NAME' | 'RESET'
  payload?: string
}

const initialState = { value: 0, name: '' }
function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'INC':
      return { ...state, value: state.value + 1 }
    case 'DEC':
      return { ...state, value: state.value - 1 }
    case 'RESET':
      return initialState
    case 'CHANGE_NAME':
      return { ...state, name: action.payload }
    default:
      return state
  }
}

export const UseReducer = () => {
  const { t } = useContext(MultilingualContext)
  const [count, dispatch] = useReducer(reducer, initialState)
  const handleInc = useCallback(() => {
    dispatch({ type: 'INC' })
  }, [dispatch])
  const handleDec = useCallback(() => {
    dispatch({ type: 'DEC' })
  }, [dispatch])
  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET' })
  }, [dispatch])
  const classes = useStyles()
  const isErrored = useMemo(() => count.name.length > 4, [count.name])
  const handleChangeName = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      dispatch({ type: 'CHANGE_NAME', payload: e.target.value })
    },
    [dispatch]
  )

  return (
    <Container>
      <h1>
        <Link className={classes.noTextDecoration} to="/training">
          {t('TRAINING')}
        </Link>{' '}
        | <code>useReducer</code>
      </h1>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
          <Paper className={classes.paper}>
            <TextField
              className={classes.input}
              // fullWidth
              variant="outlined"
              label="Name"
              placeholder="Name"
              error={isErrored}
              helperText={isErrored && 'No more than 4 symbols'}
              autoFocus={true}
              inputProps={{
                onChange: handleChangeName,
                value: count.name,
              }}
            />
            <div className={classes.buttonBox}>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                disabled={count.value >= 5}
                onClick={handleInc}
                title="INC"
              >
                <PlusOneIcon />
              </Button>
              <Button
                variant="contained"
                fullWidth
                color="primary"
                disabled={count.value <= -5}
                onClick={handleDec}
                title="DEC"
              >
                <ExposureNeg1Icon />
              </Button>
              <Button variant="contained" fullWidth color="primary" onClick={handleReset} title="RESET">
                RESET
              </Button>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={8} lg={8} xl={10}>
          <Paper className={classes.paper}>
            <ReactJson src={count} />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
          <Paper className={clsx(classes.paper, classes.reactYoutubeContainer)}>
            <YouTube videoId="wcRawY6aJaw" className={classes.reactYoutube} />
          </Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
