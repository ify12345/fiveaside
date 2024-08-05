/* eslint-disable import/no-cycle */
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'
import tz from 'dayjs/plugin/timezone'
import store from '~redux/store'

const state = store.getState();

require('dayjs/locale/fr')
require('dayjs/locale/en')

dayjs.extend(customParseFormat)
dayjs.extend(isToday) // requires date in format 'yyyy-mm-dd'
dayjs.extend(tz)
dayjs.extend(duration)
dayjs.locale(state.language.languageCode)

export default dayjs