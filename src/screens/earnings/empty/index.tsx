/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, View } from 'react-native'
import React from 'react'
import EmptyEarningSvg from '~assets/svg/EmptyEarningSvg'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Colors } from '~config/colors'

export default function Empty() {
  const {colors} = useTheme()
  const {t} = useTranslation('earning')

  return (
    <View style={styles.content}>
      <EmptyEarningSvg />
      <Text variant='bodyLarge' style={[styles.title, {color: Colors.charcoal}]}>
        {t('no_earning_title')}
      </Text>
      <Text variant='displaySmall' style={{color: colors.onSurface}}>
        {t('no_earning_desc')}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1
  },
  title: {
    marginTop: 40
  }
})