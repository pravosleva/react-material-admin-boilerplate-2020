import React, { createContext, useContext, useCallback, useState } from 'react'
import {
  translateFnInit,
  getDeafultLangFromCookieOrNavigator,
  SUPPOER_LOCALES as suppoerLocales,
  setLangToCookie,
  // ILang,
} from '@/utils/multilingual'
import intl from 'react-intl-universal'

export type TLang = 'ru-RU' | 'en-US'
type TMultilingualContextProps = {
  currentLang: string
  setCurrentLang: (lang: string) => void
  t: (text: string) => string
  suppoerLocales: any[]
}

export const MultilingualContext = createContext<TMultilingualContextProps>({
  currentLang: 'ru-RU',
  setCurrentLang: () => {
    throw new Error('setCurrentLang method should be implemented')
  },
  t: () => {
    throw new Error('t method should be implemented')
  },
  suppoerLocales: [],
})

export const GlobalAppContextProvider = ({ children }) => {
  const [lang, setLang] = useState(getDeafultLangFromCookieOrNavigator())
  const handleSetLang = useCallback((lang) => {
    setLang(lang)
    translateFnInit(lang)
    setLangToCookie(lang)
  }, [])
  const t = useCallback((str: string, opts?: any) => intl.get(str, opts), [])

  return (
    <MultilingualContext.Provider
      value={{
        currentLang: lang,
        setCurrentLang: handleSetLang,
        t,
        suppoerLocales,
      }}
    >
      {children}
    </MultilingualContext.Provider>
  )
}

export const useGlobalAppContext = () => {
  const globalAppContext = useContext(MultilingualContext)

  return globalAppContext
}
