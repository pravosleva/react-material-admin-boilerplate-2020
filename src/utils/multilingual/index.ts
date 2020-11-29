import React from 'react'
import intl from 'react-intl-universal'
import Cookie from 'js-cookie'
import enUS from '@assets/locales/en-US.json'
import ruRU from '@assets/locales/ru-RU.json'
import { TLang } from '@/common/context/mutilingual'

export interface ILang {
  label: string
  name: string
  value: TLang
}

export const SUPPOER_LOCALES: ILang[] = [
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
const defaultLang = 'ru-RU'

export const translateFnInit = (lang?: string) => {
  intl
    .init({
      currentLocale: lang || defaultLang,
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
export const getDeafultLangFromCookieOrNavigator = () => {
  let detectedLang: string | undefined
  const hasInSuppoerLocales = (value: string): boolean => SUPPOER_LOCALES.some((l) => l.value === value)

  if (!!window) {
    detectedLang = Cookie.get('lang')
    if (!hasInSuppoerLocales(detectedLang)) detectedLang = undefined
    if (!detectedLang && !!navigator) {
      const fromNavigator = navigator.language // || navigator.userLanguage?

      if (hasInSuppoerLocales(fromNavigator)) detectedLang = fromNavigator
    }
  }

  return detectedLang || defaultLang
}

const langCookieExpiresInDays = !!process.env.REACT_APP_LANG_COOKIE_EXPIRES_IN_DAYS
  ? Number(process.env.REACT_APP_LANG_COOKIE_EXPIRES_IN_DAYS)
  : 1

export const setLangToCookie = (lang: string) => {
  Cookie.set('lang', lang, { expires: langCookieExpiresInDays })
}
translateFnInit(getDeafultLangFromCookieOrNavigator())
