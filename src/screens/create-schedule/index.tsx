import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import CustomHeader from '~components/CustomHeader'
import {MaterialCommunityIcons} from "@expo/vector-icons"
import { useTranslation } from 'react-i18next'
import { Text, useTheme } from 'react-native-paper'
import { ScheduleStackScreenProps } from '~types/navigation'
import { Colors } from '~config/colors'
import InputField from '~components/InputField'
import CustomButton from '~components/CustomButton'
import SelectDateModal from '~components/modals/SelectDateModal'
import dayjs from '~config/dayjs'
import SelectTimeModal from '~components/modals/SelectTimeModal'
import TinyToast from '~components/Toast'
import { CreateSchedulePayload } from '~types/api'
import { useAppDispatch } from '~redux/store'
import Loader from '~components/loader'
import { createSchedule, getHomeServiceSchedules, getWalkInSchedules } from '~api/schedule'
import Toast from 'react-native-toast-message'
import { cleanHomeServiceSchedules, cleanWalkInSchedules } from '~redux/reducers/schedule'
import styles from './styles'

export default function CreateSchedule({
  navigation,
  route: {
    params: {service, date: paramDate}
  }
  }: ScheduleStackScreenProps<'CreateSchedule'>) {
  const {colors} = useTheme()
  const {t} = useTranslation('schedule')
  const [loading, setLoading] = useState(false)
  const [date, setDate] = useState<Date | undefined>(paramDate ? dayjs(paramDate).toDate() : undefined)
  const [startTime, setStartTime] = useState<Date | undefined>(undefined)
  const [endTime, setEndTime] = useState<Date | undefined>(undefined)
  const [dateModalVisible, setDateModalVisible] = useState(false)
  const [startTimeModalVisible, setStartTimeModalVisible] = useState(false)
  const [endTimeModalVisible, setEndTimeModalVisible] = useState(false)
  const [interval, setInterval] = useState<string | undefined>()

  function clearInput() {
    setDate(undefined)
    setStartTime(undefined)
    setEndTime(undefined)
    setInterval(undefined)
  }

  function toggleDateModal() {
    setDateModalVisible(!dateModalVisible)
  }

  function toggleStartTimeModal() {
    setStartTimeModalVisible(!startTimeModalVisible)
  }

  function toggleEndTimeModal() {
    setEndTimeModalVisible(!endTimeModalVisible)
  }

  function validateInput() {
    if (!date) {
      TinyToast(t('select_date'))
      return false
    }
    if (!startTime) {
      TinyToast(t('select_start_time'))
      return false
    }
    if (!endTime) {
      TinyToast(t('select_end_time'))
      return false
    }
    if(dayjs(endTime).isBefore(startTime)) {
      TinyToast(t('invalid_timing'))
      return false
    }
    if(interval && parseInt(interval, 10) === 0) {
      TinyToast(t('non_zero'))
      return false
    }
    return true
  }

  const dispatch = useAppDispatch()
  function submit() {
    if (validateInput()) {
      const payload: CreateSchedulePayload = {
        schedule_date : dayjs(date).format('YYYY-MM-DD')!,
        start_time : dayjs(startTime).format('HH:mm'),
        end_time : dayjs(endTime).format('HH:mm'),
        repeat_schedule : interval ? parseInt(interval!, 10) : 1,
        for_home_service : service === 'home_service'
      }
      setLoading(true)
      dispatch(createSchedule(payload))
      .unwrap()
      .then(({message}) => {
        if (service === 'walk_in') {
          dispatch(cleanWalkInSchedules())
          dispatch(getWalkInSchedules({}))
        }
        if (service === 'home_service') {
          dispatch(cleanHomeServiceSchedules())
          dispatch(getHomeServiceSchedules({}))
        }
        clearInput()
        setLoading(false)
        Toast.show({
          type: 'success',
          props: {
            message
          }
        })
      })
      .catch(err => {
        setLoading(false)
        Toast.show({
          type: 'error',
          props: {
            message: err?.msg
          }
        })
      })
    }
  }

  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('schedule', {ns: 'drawer'})}
          onLeftIconPressed={() => navigation.goBack()}
        />
        <KeyboardAvoidingView behavior='height' style={styles.content}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
          <View style={[styles.form, {backgroundColor: colors.background}]}>
            <Text variant='bodyMedium' style={[styles.title, {color: Colors.charcoal}]}>
              {t('setup_schedule')}
            </Text>
            <InputField
              selectPicker
              value={date ? dayjs(date).format('YYYY-MM-DD') : ''}
              label={t('start_date')}
              placeholder={t('select_date')}
              rightIcon={<MaterialCommunityIcons name='calendar' size={16} color={colors.onSurface} />}
              pickerPressed={() => toggleDateModal()}
            />
            <InputField
              selectPicker
              value={startTime ? dayjs(startTime).format('HH:mm A') : ''}
              label={t('start_time')}
              placeholder={t('select_time')}
              rightIcon={<MaterialCommunityIcons name='clock-time-four-outline' size={16} color={colors.onSurface} />}
              pickerPressed={() => toggleStartTimeModal()}
            />
            <InputField
              selectPicker
               value={endTime ? dayjs(endTime).format('HH:mm A') : ''}
              label={t('end_time')}
              placeholder={t('select_time')}
              rightIcon={<MaterialCommunityIcons name='clock-time-four-outline' size={16} color={colors.onSurface} />}
              pickerPressed={() => toggleEndTimeModal()}
            />
          </View>
          <View style={[styles.occurenceView, {backgroundColor: colors.surface}]}>
              <Text variant='bodyMedium' style={[styles.occurenceTitle, {color: Colors.charcoal}]}>
                {t('set_occurence')}
              </Text>
              <View style={styles.intervalView}>
                <View style={styles.inputWrapper}>
                  <InputField
                    label={t('interval')}
                    style={styles.input}
                    inputComponentStyle={{backgroundColor: colors.background}}
                    keyboardType='number-pad'
                    value={interval}
                    onChangeText={val => setInterval(val)}
                  />
                </View>
                <View style={styles.durationPickerWrapper}>
                  <Text variant='bodySmall' style={{color: colors.onSurface}}>
                    {t('weeks')}
                  </Text>
                  {/* <DurationPicker
                    selected={duration}
                    setSelected={setDuration}
                    interval
                  /> */}
                </View>
              </View>
            </View>
          <View style={[styles.footer, {backgroundColor: colors.background}]}>
            <CustomButton
              primary
              title={t('save')}
              onPress={() => submit()}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      </View>
      <SelectDateModal
        visible={dateModalVisible}
        close={() => toggleDateModal()}
        selected={date}
        setSelected={setDate}
        minDate={new Date()}
      />
      <SelectTimeModal
        visible={startTimeModalVisible}
        close={() => toggleStartTimeModal()}
        selected={startTime}
        setSelected={setStartTime}
      />
      <SelectTimeModal
        visible={endTimeModalVisible}
        close={() => toggleEndTimeModal()}
        selected={endTime}
        setSelected={setEndTime}
      />
      <Loader visible={loading} />
    </SafeAreaScreen>
  )
}