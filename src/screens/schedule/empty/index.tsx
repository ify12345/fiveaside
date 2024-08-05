/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, View } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'
import EmptyScheduleSvg from '~assets/svg/EmptyScheduleSvg'
import { Colors } from '~config/colors'
import { useTranslation } from 'react-i18next'

export default function EmptySchedule() {
  const {colors} = useTheme()
  const {t} = useTranslation('schedule')

  return (
    <View style={[styles.content]}>
      <EmptyScheduleSvg />
      <Text variant='bodyLarge' style={[styles.title, {color: Colors.charcoal}]}>
        {t('no_schedule')}
      </Text>
      <Text variant='displaySmall' style={{color: colors.onSurface}}>
        {t('no_schedule_desc')}
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
  title: {
    marginTop: 35.62
  }
})