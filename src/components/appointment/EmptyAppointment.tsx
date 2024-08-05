/* eslint-disable @typescript-eslint/no-use-before-define */
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Colors } from '~config/colors'
import CalendarBigSvg from '~assets/svg/CalendarBigSvg'

export default function EmptyAppointments() {
  const {colors} = useTheme()
  const {t} = useTranslation('appointment')

  return (
    <View style={styles.content}>
      <CalendarBigSvg />
      <Text variant='bodyLarge' style={[styles.note, {color: Colors.charcoal}]}>
        {t('zero_appointments')}
      </Text>
      <Text variant='displaySmall' style={{color: colors.onSurface}}>
        {t('zero_appointments_desc')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  note: {
    marginTop: 47.5
  }
})