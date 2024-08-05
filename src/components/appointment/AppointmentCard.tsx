/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, View, Image, TouchableOpacity } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { Appointment, AppointmentStatus } from '~types'
import { useTheme, Text, Divider } from 'react-native-paper'
import CalendarSmallSvg from '~assets/svg/CalendarSmallSvg'
import ClockSvg from '~assets/svg/ClockSvg'
import { Colors } from '~config/colors'
import { useTranslation } from 'react-i18next'
import dayjs from '~config/dayjs'
import { useAppDispatch } from '~redux/store'
import { completeAppointment, getPastAppointments, getUpcomingAppointments } from '~api/appointment'
import Toast from 'react-native-toast-message'
import Loader from '~components/loader'
import { cleanPastAppointments, cleanUpcomingAppointments } from '~redux/reducers/appointment'
import CancelAppointmentModal from './CancelAppointmentModal'

interface Props {
  appointment: Appointment;
  horizontal: boolean;
  setFirstLoaded: (boolean: SetStateAction<boolean>) => void;
  type: 'booked' | 'past'
}

export default function AppointmentCard({
  appointment,
  horizontal,
  setFirstLoaded,
  type
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['status', 'appointment'])
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const {startTime, status, clientImage, clientName, address} = appointment;
  const date = dayjs(startTime, 'MM/DD/YYYY hh:mm A').format('YYYY-MM-DD')
  const dayDate = dayjs(date).format('DD-MM-YYYY')
  const dateTime = dayjs(startTime, 'MM/DD/YYYY hh:mm A').format('hh:mm A')
  let statusColor;

  if (status === AppointmentStatus.confirmed) {
    statusColor = colors.primary
  } else if (status === AppointmentStatus.canceled) {
    statusColor = colors.error
  } else if (status === AppointmentStatus.completed) {
    statusColor = Colors.keppel
  }

  function toggleCancelModal() {
    setModalVisible(!modalVisible)
  }

  const dispatch = useAppDispatch()
  function handleComplete() {
    setLoading(true)
    dispatch(completeAppointment({appointment_id: appointment.id}))
    .unwrap()
    .then(() => {
      setLoading(false)
      setFirstLoaded(false)
      if (type === 'booked') {
          dispatch(cleanUpcomingAppointments())
          dispatch(getUpcomingAppointments({}))
        }
        if (type === 'past') {
          dispatch(cleanPastAppointments())
          dispatch(getPastAppointments({}))
        }
    })
    .catch(err => {
      setLoading(false)
      Toast.show({
        type: 'error',
        props: {message: err?.msg}
      })
    })
  }
  
  return (
    <>
      <View style={[styles.card, {backgroundColor: colors.background, marginRight: horizontal ? 10 : 0, marginBottom: horizontal ? 0 : 16, width: horizontal ? 303: '100%'}]}>
        <View style={styles.clientDetail}>
          <View style={[styles.imageWrapper, {backgroundColor: colors.secondary}]}>
            <Image resizeMode='cover' source={{uri: clientImage}} style={styles.image} />
          </View>
          <View style={styles.textDetail}>
            <Text variant='bodyLarge' style={{color: Colors.charcoal}}>
              {clientName}
            </Text>
            <Text variant='displaySmall' style={[styles.address, {color: colors.onSurface}]}>
              {address}
            </Text>
          </View>
        </View>
        <Divider style={styles.divider} />
        <View style={styles.otherDetails}>
          <View style={styles.rowAligned}>
            <CalendarSmallSvg />
            <Text variant='displayLarge' style={styles.info}>
              {dayjs(date).isToday() ? t('today', {ns: 'appointment'}) : dayDate}
            </Text>
          </View>
          <View style={styles.rowAligned}>
            <ClockSvg />
            <Text variant='displayLarge' style={styles.info}>
              {dateTime}
            </Text>
          </View>
          <View style={styles.rowAligned}>
            <View style={[styles.statusIcon, {backgroundColor: statusColor}]} />
            <Text variant='displayLarge' style={styles.info}>
              {t(`${status}`)}
            </Text>
          </View>
        </View>
        {
          !horizontal && !(appointment.status === AppointmentStatus.completed || appointment.status === AppointmentStatus.canceled) && (
            <View style={styles.actionBtnWrapper}>
              <TouchableOpacity
                onPress={() => toggleCancelModal()}
              >
                <Text variant='titleSmall' style={{color: colors.error}}>
                  {t('cancel_booking', {ns: 'appointment'})}
                </Text>
              </TouchableOpacity>
              {
                appointment.status === AppointmentStatus.confirmed && (
                  <TouchableOpacity
                    onPress={() => handleComplete()}
                    style={[styles.completeBtn, {backgroundColor: colors.primary}]}
                  >
                    <Text variant='titleSmall' style={[{color: colors.onPrimaryContainer}]}>
                      {t('mark_complete', {ns: 'appointment'})}
                    </Text>
                  </TouchableOpacity>
                )
              }
            </View>
          )
        }
      </View>
      <CancelAppointmentModal
        visible={modalVisible}
        close={() => toggleCancelModal()}
        appointment_id={appointment.id}
        setFirstLoaded={setFirstLoaded}
        type={type}
      />
      <Loader visible={loading} />
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    paddingTop: 15,
    paddingBottom: 8,
    paddingHorizontal: 20
  },
  clientDetail: {
    flexDirection: 'row'
  },
  imageWrapper: {
    borderRadius: 8,
    width: 47,
    height: 47,
    marginRight: 15,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  textDetail: {
    justifyContent: 'space-between',
     width: '90%'
  },
  address: {
    width: '90%'
  },
  divider: {
    marginTop: 15,
    marginBottom: 11,
    height: 1,
    backgroundColor: Colors.errorTint
  },
  otherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  rowAligned: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    marginLeft: 6
  },
  statusIcon: {
    width: 6,
    height: 6,
    borderRadius: 3
  },
  actionBtnWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 24
  },
  completeBtn: {
    borderRadius: 4,
    padding: 8,
    paddingHorizontal: 20.5
  },
})