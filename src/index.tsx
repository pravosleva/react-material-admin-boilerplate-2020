import React, { useState, useCallback } from 'react' // { useState, useEffect, useMemo, useCallback }
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Toaster } from '@/mui/custom-components/Toaster'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { store } from '@/store'
import CssBaseline from '@material-ui/core/CssBaseline'
import { GlobalCss } from '@/mui/theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '@/mui/theme'
import { MultilingualContextProvider } from '@/common/context/mutilingual'

import './prismjs.scss'

const ReactApp = () => (
  <ThemeProvider theme={theme}>
    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
    <CssBaseline />
    <GlobalCss />
    <BrowserRouter>
      <Provider store={store}>
        <MultilingualContextProvider>
          <Toaster />
          <App />
        </MultilingualContextProvider>
      </Provider>
    </BrowserRouter>
  </ThemeProvider>
)

ReactDOM.render(<ReactApp />, document.querySelector('#root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
