/* eslint-disable @typescript-eslint/no-use-before-define */
import { Modal, StyleSheet, View } from 'react-native'
import React, { SetStateAction } from 'react'
import { Colors } from '~config/colors'
import { useTheme, Text, ProgressBar } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { UpdateState } from '~types'
import * as Updates from 'expo-updates'
import Toast from 'react-native-toast-message'
import SearchSvg from '~assets/svg/SearchSvg'
import RocketSvg from '~assets/svg/RocketSvg'
import HourGlassSvg from '~assets/svg/HourGlassSvg'
import CheckSvg from '~assets/svg/CheckSvg'
import CustomButton from '~components/CustomButton'
import LottieView from 'lottie-react-native'

type Props = {
  visible: boolean
  updateState: UpdateState | undefined,
  setUpdateState: (UpdateState: SetStateAction<UpdateState | undefined>) => void
}

export default function EasUpdateModal({
  visible,
  updateState,
  setUpdateState
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('update')

  function RenderIcon () {
    if (updateState === 'checking') {
      return <SearchSvg />
    }
    if (updateState === 'available') {
      return <RocketSvg />
    }
    if (updateState === 'downloading') {
      return <HourGlassSvg />
    }
    if (updateState === 'reload') {
      return <CheckSvg />
    }
  }

  function RenderTitle() {
    if (updateState === 'checking') {
      return t('checking_update')
    }
    if (updateState === 'available') {
      return t('update_available')
    }
    if (updateState === 'downloading') {
      return t('downloading_update')
    }
    if (updateState === 'reload') {
      return t('update_complete')
    }
  }

  function RenderDesc() {
    if (updateState === 'checking') {
      return t('check_desc')
    }
    if (updateState === 'available') {
      return t('available_desc')
    }
    if (updateState === 'downloading') {
      return t('downloading_desc')
    }
    if (updateState === 'reload') {
      return t('reload_desc')
    }
  }

  async function downloadUpdate() {
    try {
      setUpdateState('downloading')
      await Updates.fetchUpdateAsync()
      setUpdateState('reload')
    } catch (err) {
      Toast.show({
        type: 'error',
        props: {message: t('download_update_failed', {ns: 'update'})}
      })
    }
  }

  async function reloadApp() {
    await Updates.reloadAsync()
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
          <View style={[styles.iconWrapper, {backgroundColor: colors.tertiary}]}>
            {RenderIcon()}
          </View>
          <Text variant='bodyLarge' style={[styles.title, {color: Colors.charcoal}]}>
            {RenderTitle()}
          </Text>
          <Text variant='displayMedium' style={[styles.desc, {color: colors.onSurface}]}>
            {RenderDesc()}
          </Text>
          {
            updateState === 'checking' && (
              <LottieView source={require('~assets/lottie/loader.json')} autoPlay loop style={styles.loader} />
            )
          }
          {
            updateState === 'available' && (
              <CustomButton
                primary
                title={t('update_app')}
                onPress={() => downloadUpdate()}
              />
            )
          }
          {
            updateState === 'downloading' && (
              <ProgressBar indeterminate color={colors.primary} style={styles.progress} />
            )
          }
          {
            updateState === 'reload' && (
              <CustomButton
                primary
                title={t('reload')}
                onPress={() => reloadApp()}
              />
            )
          }
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.backDrop,
    flex: 1,
    flexDirection: 'column-reverse',
  },
  modalContent: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
    width: '100%'
  },
  iconWrapper: {
    width: 64,
    height: 64,
    borderRadius: 32,
    padding: 16,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  title: {
    textAlign: 'center'
  },
  desc: {
    marginBottom: 40,
    textAlign: 'center'
  },
  loader: {
    width: 153,
    height: 153,
    alignSelf: 'center'
  },
  progress: {
    marginBottom: 40
  }
})