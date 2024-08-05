/* eslint-disable @typescript-eslint/no-use-before-define */
import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors } from '~config/colors';
import CloseSvg from '~assets/svg/CloseSvg';
import InputField from '~components/InputField';
import CustomButton from '~components/CustomButton';
import { useAppDispatch } from '~redux/store';
import { UpdateProfilePayload } from '~types/api';
import { updateProfile } from '~api/profile';
import Toast from 'react-native-toast-message'
import Loader from '~components/loader';

interface Props {
  visible: boolean;
  close: () => void;
  jobTitle?: string;
}

export default function EditJobTitleModal({
  visible,
  close,
  jobTitle
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'profile'])
  const [currentTitle, setCurrentTitle] = useState(jobTitle)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function handleClose() {
    setCurrentTitle(currentTitle)
    setError('')
    close()
  }

  const dispatch = useAppDispatch()
  function submit() {
    const payload: UpdateProfilePayload = {
      jobTitle: currentTitle
    }
    setLoading(true)
    dispatch(updateProfile(payload))
    .unwrap()
    .then(() => {
      setLoading(false)
      close()
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

  return (
    <Modal transparent visible={visible} animationType="slide">
      <KeyboardAvoidingView behavior='height' style={styles.fullView}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
              <TouchableOpacity
                onPress={() => handleClose()}
                hitSlop={20}
                style={styles.closeBtn}
              >
                <CloseSvg  />
              </TouchableOpacity>
              <Text variant='labelLarge' style={[styles.title, {color: Colors.charcoal}]}>
                {t('edit_job_title', {ns: 'profile'})}
              </Text>
              <InputField
                label={t('job_title', {ns: 'profile'})}
                value={currentTitle}
                onChangeText={val => {
                  setCurrentTitle(val)
                  setError('')
                }}
                autoCapitalize='none'
                autoCorrect={false}
                errorMessage={error}
              />
              <CustomButton
                primary
                title={t('update', {ns: 'profile'})}
                onPress={() => submit()}
                disabled={!currentTitle}
                style={styles.btn}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
      <Loader visible={loading} />
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.backDrop,
    flex: 1,
    flexDirection: 'column-reverse',
  },
  fullView: {
    flex: 1
  },
  modalContent: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
    width: '100%'
  },
  closeBtn: {
    alignSelf: 'flex-end'
  },
  title: {
    marginTop: 16,
    marginBottom: 40
  },
  btn: {
    marginVertical: 40
  }
})