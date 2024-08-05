/* eslint-disable @typescript-eslint/no-use-before-define */
import { Modal, Platform, StyleSheet, View } from 'react-native'
import React, { SetStateAction, useEffect, useMemo, useState } from 'react'
import { Colors } from '~config/colors'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import CustomButton from '~components/CustomButton'
import DateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status } from '~types/api'
import { getScheduleInterval } from '~api/schedule'

interface Props {
  visible: boolean;
  close: () => void;
  selected: Date | undefined;
  setSelected: (value: SetStateAction<Date | undefined>) => void;
}

export default function SelectTimeModal({
  visible,
  close,
  selected,
  setSelected
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('schedule')
  const {interval, intervalStatus} = useAppSelector((store) => store.schedule)
  const [currentTime, setCurrentTime] = useState<Date | undefined>(selected)
  const display = 'spinner'
  const positiveButton={label: t('save')}
  const negativeButton={label: t('cancel')}

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (intervalStatus !== Status.success) {
      dispatch(getScheduleInterval())
    }
  }, [])

  function save() {
    setSelected(currentTime)
    close()
  }

  function cancel() {
    setCurrentTime(selected);
    close()
  }

  const handleChange = (event: DateTimePickerEvent, time?: Date | undefined) => {
    if (Platform.OS === 'android') {
      const {type} = event
      if (type === 'set') {
        setSelected(time)
      }
    } else {
      setCurrentTime(time)
    }
  }

  function RenderTime() {
    if (Platform.OS === 'android') {
      return useMemo(() => 
        visible && DateTimePickerAndroid.open({
          value: currentTime || new Date(),
          onChange(event, date) {
            handleChange(event, date)
          },
          mode: 'time',
          is24Hour: true,
          display,
          positiveButton,
          negativeButton,
          minuteInterval: interval
        })
      , [visible])
    }
    return (
      <Modal transparent visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
            <DateTimePicker
              testID="dateTimePicker"
              value={currentTime || new Date()}
              mode='time'
              is24Hour
              onChange={handleChange}
              display='spinner'
              textColor={colors.primary}
              minuteInterval={interval}
            />
            <View style={styles.btnWrapper}>
              <CustomButton
                onPress={() => cancel()}
                title={t('cancel')}
                style={[styles.btn, {borderColor: Colors.darkLiver, borderWidth: 1}]}
                titleStyle={{color: colors.onSurface}}
              />
              <CustomButton
                onPress={() => save()}
                primary
                title={t('save')}
                disabled={!currentTime}
                style={styles.btn}
              />
            </View>
          </View>
        </View>
      </Modal>
    ) 
  }

  return (
   <>
    {RenderTime()}
   </>
  )
}

const styles = StyleSheet.create({
   modalContainer: {
    backgroundColor: Colors.backDrop,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    paddingBottom: 16,
    width: '100%',
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24
  },
  btn: {
    width: '45%'
  }
})