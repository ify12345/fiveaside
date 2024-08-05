import i18next from "i18next";
import {initReactI18next} from 'react-i18next';
import {getLocales} from 'expo-localization';
import resources from '~locales'
import store from "~redux/store";
import dayjs from '~config/dayjs'
import {LocaleConfig} from 'react-native-calendars'

const [locale] = getLocales();

export const init = () => {
  const lng = store.getState().language.languageCode ?
    store.getState().language.languageCode : locale.languageCode
  dayjs.locale(lng)
  LocaleConfig.defaultLocale = lng
  return (
    i18next
      .use(initReactI18next)
      .init({
        compatibilityJSON: 'v3',
        resources,
        lng,
        fallbackLng: 'en',
        interpolation: {
          escapeValue: false
        }
      })
  )
}

export default i18next

