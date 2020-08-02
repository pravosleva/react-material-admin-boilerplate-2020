import React, { useContext, useReducer, useMemo, useCallback } from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
import { MultilingualContext } from '@/common/context/mutilingual'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ReactJson from 'react-json-view'
import Grid from '@material-ui/core/Grid'
// import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1'
import TextField from '@material-ui/core/TextField'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  buttonBox: {
    marginTop: theme.spacing(1),
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridColumnGap: theme.spacing(1),
    gridRowGap: theme.spacing(1),
  },
  input: {
    // margin: theme.spacing(1),
    width: '100%',
  },
  noTextDecoration: {
    textDecoration: 'none',
    color: theme.palette.primary.main,
  },
}))

interface IState {
  value: number
  name: string
}
interface IAction {
  type: 'INC' | 'DEC' | 'CHANGE_NAME' | 'RESET'
  name?: string
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
      return { ...state, name: action.name }
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
  const handleChangeName = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch({ type: 'CHANGE_NAME', name: e.target.value })
  }

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
                // type="submit"
                // fullWidth
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
                // type="submit"
                // fullWidth
                variant="contained"
                fullWidth
                color="primary"
                disabled={count.value <= -5}
                onClick={handleDec}
                title="DEC"
              >
                <ExposureNeg1Icon />
              </Button>
              <Button
                // type="submit"
                // fullWidth
                variant="contained"
                fullWidth
                color="primary"
                // disabled={isDisabled}
                onClick={handleReset}
                title="RESET"
              >
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
      </Grid>
      <ProTip />
    </Container>
  )
}
