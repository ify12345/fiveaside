import { ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import CustomHeader from '~components/CustomHeader'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { ScheduleStackScreenProps } from '~types/navigation'
import ScrollTimePicker from '~components/scrollTimePicker'
import { Colors } from '~config/colors'
import CustomButton from '~components/CustomButton'
import dayjs from '~config/dayjs'
import { useAppDispatch, useAppSelector } from '~redux/store'
import Loader from '~components/loader'
import { CreateBreakPayload } from '~types/api'
import { createBreak, getHomeServiceSchedules, getWalkInSchedules } from '~api/schedule'
import Toast from 'react-native-toast-message'
import { cleanHomeServiceSchedules, cleanWalkInSchedules } from '~redux/reducers/schedule'
import styles from './styles'

export default function ScheduleBreak({
  navigation,
  route: {
    params: {
      date, isHomeService
    }
  }
} : ScheduleStackScreenProps<'ScheduleBreak'>) {
  const {colors} = useTheme();
  const {t} = useTranslation('schedule')
  const {createBreak: {startTime, endTime}} = useAppSelector((store) => store.schedule)
  const [loading, setLoading] = useState(false)

  const dispatch = useAppDispatch()
  function handleSave() : void {
    const payload: CreateBreakPayload = {
      schedule_date: dayjs(date, 'ddd, DD MMM YYYY').format('YYYY-MM-DD'),
      start_time: startTime,
      end_time: endTime,
      repeat_schedule: 1,
      for_home_service: isHomeService
    }
    setLoading(true)
    dispatch(createBreak(payload))
    .unwrap()
    .then(() => {
      if (isHomeService) {
        dispatch(cleanHomeServiceSchedules())
        dispatch(getHomeServiceSchedules({}))
      } else {
        dispatch(cleanWalkInSchedules())
        dispatch(getWalkInSchedules({}))
      }
      setLoading(false)
      navigation.goBack()
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        props: {message: err?.msg}
      })
    })
  }
  
  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={`${t('break')} • ${date}`}
          onLeftIconPressed={() => navigation.goBack()}
        />
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
          <View style={[styles.content, {backgroundColor: colors.background, paddingTop: 10, paddingHorizontal: 24}]}>
            <Text variant='bodyMedium' style={[styles.updateTitle, {color: Colors.charcoal}]}>
              {t('set_unavailability_hours')}
            </Text>
            <ScrollTimePicker
              startTime={startTime}
              endTime={endTime}
            />
          </View>
          <View style={[styles.footer, {backgroundColor: colors.background}]}>
             <CustomButton
              primary
              title={t('done')}
              onPress={() => handleSave()}
            />
          </View>
        </ScrollView>
      </View>
      <Loader visible={loading} />
    </SafeAreaScreen>
  )
}