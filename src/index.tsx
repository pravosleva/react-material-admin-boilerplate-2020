import React, { useState, useCallback } from 'react' // { useState, useEffect, useMemo, useCallback }
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import { Toaster } from '@/mui/custom-components/Toaster'
import * as serviceWorker from './serviceWorker'
import { Provider } from 'react-redux'
import { store } from '@/store'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'
import { theme } from '@/mui/theme'
import { MultilingualContext } from '@/common/context/mutilingual'
import { translateFnInit, getDeafultLangFromCookie, SUPPOER_LOCALES } from '@/utils/multilingual'
import intl from 'react-intl-universal'
import Cookie from 'js-cookie'

const langCookieExpiresInDays = !!process.env.REACT_APP_LANG_COOKIE_EXPIRES_IN_DAYS
  ? Number(process.env.REACT_APP_LANG_COOKIE_EXPIRES_IN_DAYS)
  : 1

const ReactApp = () => {
  const [lang, setLang] = useState(getDeafultLangFromCookie())
  const handleSetLang = useCallback((lang) => {
    setLang(lang)
    translateFnInit(lang)
    Cookie.set('lang', lang, { expires: langCookieExpiresInDays })
  }, [])
  const t = useCallback((str: string, opts?: any) => intl.get(str, opts), [])

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <MultilingualContext.Provider
            value={{ currentLang: lang, setCurrentLang: handleSetLang, t, suppoerLocales: SUPPOER_LOCALES }}
          >
            <Toaster />
            <App />
          </MultilingualContext.Provider>
        </Provider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

ReactDOM.render(<ReactApp />, document.querySelector('#root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
