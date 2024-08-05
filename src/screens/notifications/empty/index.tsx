/* eslint-disable @typescript-eslint/no-use-before-define */
import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Colors } from '~config/colors'
import EmptyNotificationSvg from '~assets/svg/EmptyNotificationSvg'

export default function EmptyNotifications() {
  const {colors} = useTheme()
  const {t} = useTranslation('notification')

  return (
    <View style={styles.content}>
      <EmptyNotificationSvg />
      <Text variant='bodyLarge' style={[styles.note, {color: Colors.charcoal}]}>
        {t('zero_notifications')}
      </Text>
      <Text variant='displaySmall' style={{color: colors.onSurface}}>
        {t('zero_notify_desc')}
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