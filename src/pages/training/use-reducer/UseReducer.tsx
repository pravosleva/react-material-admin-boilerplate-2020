import React, {
  // useContext,
  useReducer,
} from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
// import { MultilingualContext } from '@/common/context/mutilingual'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import ReactJson from 'react-json-view'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import PlusOneIcon from '@material-ui/icons/PlusOne'
import ExposureNeg1Icon from '@material-ui/icons/ExposureNeg1'

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(1),
  },
}))

interface IState {
  value: number
}
interface IAction {
  type: 'INC' | 'DEC'
}

function reducer(state: IState, action: IAction): IState {
  switch (action.type) {
    case 'INC':
      return { ...state, value: state.value + 1 }
    case 'DEC':
      return { ...state, value: state.value - 1 }
    default:
      return state
  }
}

export const Links = () => {
  // const { t } = useContext(MultilingualContext)
  const [count, dispatch] = useReducer(reducer, { value: 0 })
  const handleInc = () => {
    dispatch({ type: 'INC' })
  }
  const handleDec = () => {
    dispatch({ type: 'DEC' })
  }
  const classes = useStyles()

  return (
    <Container>
      <Typography component="h1" variant="h5" className={classes.title}>
        useReducer
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={3} lg={2} xl={2}>
          <Button
            // type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            // disabled={isDisabled}
            onClick={handleInc}
            title="INC"
          >
            <PlusOneIcon />
          </Button>
          <Button
            // type="submit"
            // fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            // disabled={isDisabled}
            onClick={handleDec}
            title="DEC"
          >
            <ExposureNeg1Icon />
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={9} lg={10} xl={10}>
          <Paper className={classes.paper}>
            <ReactJson src={count} />
          </Paper>
        </Grid>
      </Grid>
      <ProTip />
    </Container>
  )
}
