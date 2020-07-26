import { createContext } from 'react'

export const MultilingualContext = createContext({
  currentLang: 'ru-RU',
  setCurrentLang: (_lang: string) => {},
  t: (text: string) => text,
  suppoerLocales: [],
})
