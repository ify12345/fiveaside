/* eslint-disable @typescript-eslint/no-use-before-define */
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors } from '~config/colors';
import CloseSvg from '~assets/svg/CloseSvg';
import CustomButton from '~components/CustomButton';

interface Props {
  visible: boolean;
  close: () => void;
  confirm: () => void;
}

export default function DeleteScheduleModal({
  visible,
  close,
  confirm
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('schedule')

  function handleClose() {
    close()
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
          <TouchableOpacity
            onPress={() => handleClose()}
            hitSlop={20}
            style={styles.closeBtn}
          >
            <CloseSvg  />
          </TouchableOpacity>
          <Text variant='labelLarge' style={[styles.title, {color: Colors.charcoal}]}>
            {t('confirm_delete')}
          </Text>
          <View style={styles.btnWrapper}>
            <CustomButton
              onPress={() => handleClose()}
              title={t('cancel')}
              style={styles.btn}
              titleStyle={[styles.cancelBtn, {color: colors.onSurface}]}
            />
            <CustomButton
              onPress={() => confirm()}
              title={t('delete')}
              style={[styles.btn, {backgroundColor: colors.error}]}
              titleStyle={{color: colors.onError}}
            />
          </View>
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
    paddingBottom: 90,
    paddingHorizontal: 24,
    width: '100%'
  },
  closeBtn: {
    alignSelf: 'flex-end'
  },
  title: {
    marginTop: 24,
    marginBottom: 40
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btn: {
    width: '40%'
  },
  cancelBtn: {
    textDecorationLine: 'underline'
  }
})