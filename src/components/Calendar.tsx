import React from 'react'
import {Calendar, LocaleConfig} from 'react-native-calendars'
import { useTheme } from 'react-native-paper'
import { Colors } from '~config/colors'
import dayjs from '~config/dayjs'
import {AntDesign} from '@expo/vector-icons'
import calendar_en from '~locales/calendar/en'
import calendar_fr from '~locales/calendar/fr'
import store from '~redux/store'

// const state = store.getState();

LocaleConfig.locales.en = calendar_en
LocaleConfig.locales.fr = calendar_fr
LocaleConfig.defaultLocale = store.getState().language.languageCode

interface Props {
  value: Date | undefined;
  setValue: (val: Date | undefined) => void;
  minDate?: Date;
  maxDate?: Date
}

export default function CalendarComponent({
  value,
  setValue,
  minDate,
  maxDate
}: Props) {
  const {colors} = useTheme()

  return (
    <Calendar
      onDayPress={({dateString}) => {
        setValue(new Date(dateString))
      }}
      markedDates={value &&{
        [dayjs(value).format('YYYY-MM-DD')]: {selected: true}
      }}
      minDate={minDate ? dayjs(minDate).format('YYYY-MM-DD') : undefined}
      maxDate={maxDate ? dayjs(maxDate).format('YYYY-MM-DD') : undefined}
      theme={{
        monthTextColor: Colors.charcoal,
        textMonthFontFamily: 'Avenir-Bold',
        textMonthFontSize: 14,
        textMonthFontWeight: '600',
        dayTextColor: Colors.charcoal,
        textDayFontFamily: 'Avenir-Regular',
        textDayFontSize: 12,
        textDayFontWeight: '400',
        selectedDayTextColor: colors.onPrimaryContainer,
        selectedDayBackgroundColor: colors.primary,
        textDisabledColor: colors.onSurface,
        textInactiveColor: colors.onSurface,
        todayTextColor: colors.primary
      }}
      hideExtraDays
      disableAllTouchEventsForDisabledDays
      renderArrow={(direction) => <AntDesign name={direction === 'left' ? 'caretleft' : 'caretright'} size={12} color={colors.primary} />}
    />
  )
}