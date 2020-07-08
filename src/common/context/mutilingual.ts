import { createContext } from 'react'

export const MultilingualContext = createContext({
  currentLang: 'ru-RU',
  setCurrentLang: (lang: string) => {},
  t: (text: string) => text,
  suppoerLocales: [],
})
