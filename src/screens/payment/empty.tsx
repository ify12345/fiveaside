/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, View } from 'react-native'
import React from 'react'
import EmptyAccountSvg from '~assets/svg/EmptyAccountSvg'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Colors } from '~config/colors'
import CustomButton from '~components/CustomButton'

type Props = {
  openAddModal: () => void
}

export default function Empty({
  openAddModal
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('payment')

  return (
    <View style={styles.content}>
      <View style={styles.svgWrapper}>
        <EmptyAccountSvg />
      </View>
      <Text variant='bodyLarge' style={styles.title}>
        {t('no_account')}
      </Text>
      <Text variant='displaySmall' style={[styles.desc, {color: colors.onSurface}]}>
        {t('no_account_desc')}
      </Text>
      <CustomButton
        primary
        title={t('add_payment_account')}
        style={styles.btn}
        onPress={openAddModal}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    paddingHorizontal: 24
  },
  svgWrapper: {
    alignSelf: 'center',
    marginTop: 90,
    marginBottom: 32
  },
  title: {
    textAlign: 'center',
    color: Colors.charcoal
  },
  desc: {
    textAlign: 'center'
  },
  btn: {
    marginTop: 120,
    marginBottom: 50
  }
})