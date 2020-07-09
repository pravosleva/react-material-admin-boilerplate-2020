import intl from 'react-intl-universal'
import Cookie from 'js-cookie'
import enUS from '@assets/locales/en-US.json'
import ruRU from '@assets/locales/ru-RU.json'
// Others...

export const SUPPOER_LOCALES = [
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

export const translateFnInit = (lang?: string) => {
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
export const getDeafultLangFromCookie = () => {
  let langFromCookies: string

  if (typeof window) langFromCookies = Cookie.get('lang')

  return langFromCookies || 'ru-RU'
}

const langCookieExpiresInDays = !!process.env.REACT_APP_LANG_COOKIE_EXPIRES_IN_DAYS
  ? Number(process.env.REACT_APP_LANG_COOKIE_EXPIRES_IN_DAYS)
  : 1

export const setLangToCookie = (lang: string) => {
  Cookie.set('lang', lang, { expires: langCookieExpiresInDays })
}
translateFnInit(getDeafultLangFromCookie())
