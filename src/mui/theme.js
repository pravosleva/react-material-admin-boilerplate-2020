import red from '@material-ui/core/colors/red'
import { createMuiTheme } from '@material-ui/core/styles'

// Like this: https://github.com/mui-org/material-ui/blob/master/examples/create-react-app-with-typescript/src/theme.tsx
// See also: https://material-ui.com/ru/styles/basics/
export const defaultTheme = {
  breakpoints: {
    xs: 0,
    sm: 600,
    md: 960,
    lg: 1280,
    xl: 1920,
  },
  palette: {
    primary: {
      main: '#556cd6',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
}

export const theme = createMuiTheme(defaultTheme)
