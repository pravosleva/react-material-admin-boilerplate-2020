import { useState } from 'react'
import { InputBaseComponentProps } from '@material-ui/core/InputBase'

export const useInput = (initialValue: string) => {
  const [value, setValue] = useState<string>(initialValue)
  const bind: InputBaseComponentProps = {
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement>): void => {
      setValue(e.target.value)
    },
  }
  const reset = (): void => {
    setValue(initialValue)
  }

  return [value, bind, reset]
}
