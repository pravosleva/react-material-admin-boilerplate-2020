## Sample 1

```js
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
  const [count, dispatch] = useReducer(reducer, initialState)
  const handleInc = useCallback(() => {
    dispatch({ type: 'INC' })
  }, [dispatch])

  // ...
}
```

_etc..._
