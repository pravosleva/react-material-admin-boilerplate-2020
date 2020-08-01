import React, {
  // useContext,
  useReducer,
} from 'react'
import { ProTip } from '@/mui/custom-components/ProTip'
import { Container } from '@material-ui/core'
// import { MultilingualContext } from '@/common/context/mutilingual'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
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
      <h1>
        <code>useReducer</code>
      </h1>
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
        INC
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
        DEC
      </Button>
      <p>{count.value}</p>
      <ProTip />
    </Container>
  )
}
