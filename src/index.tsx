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

import intl from 'react-intl-universal'
import Cookie from 'js-cookie'
import enUS from '@assets/locales/en-US.json'
import ruRU from '@assets/locales/ru-RU.json'
// Others...

const langCookieExpiresDays = !!process.env.REACT_APP_LANG_COOKIE_EXPIRES_DAYS
  ? Number(process.env.REACT_APP_LANG_COOKIE_EXPIRES_DAYS)
  : 1
const SUPPOER_LOCALES = [
  {
    label: 'RU',
    name: 'Русский',
    value: 'ru-RU',
  },
  {
    label: 'EN',
    name: 'English',
    value: 'en-US',
  },
  // Others...
]

const translateFnInit = (lang?: string) => {
  intl
    .init({
      currentLocale: lang || 'ru-RU',
      locales: {
        'ru-RU': ruRU,
        'en-US': enUS,
        // Others...
      },
    })
    .then(() => {
      // Default example comment: After loading CLDR locale data, start to render
      // For example: initDone -> true
    })
    .catch((_err) => {
      // console.log(err)
    })
  return (str: string): string => intl.get(str)
}
const getDeafultLangFromCookie = () => {
  let langFromCookies: string

  if (typeof window) langFromCookies = Cookie.get('lang')

  return langFromCookies || 'ru-RU'
}
translateFnInit(getDeafultLangFromCookie())

const ReactApp = () => {
  const [currentLang, setCurrentLang] = useState(getDeafultLangFromCookie())
  const handleSetCurrentLang = useCallback((lang) => {
    setCurrentLang(lang)
    translateFnInit(lang)
    Cookie.set('lang', lang, { expires: langCookieExpiresDays })
  }, [])
  const t = useCallback((str: string, opts?: any) => intl.get(str, opts), [])
  const suppoerLocales = SUPPOER_LOCALES

  return (
    <ThemeProvider theme={theme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <BrowserRouter>
        <Provider store={store}>
          <MultilingualContext.Provider
            value={{ currentLang, setCurrentLang: handleSetCurrentLang, t, suppoerLocales }}
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
