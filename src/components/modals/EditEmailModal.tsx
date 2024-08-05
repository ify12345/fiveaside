/* eslint-disable @typescript-eslint/no-use-before-define */
import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors } from '~config/colors';
import CloseSvg from '~assets/svg/CloseSvg';
import InputField from '~components/InputField';
import CustomButton from '~components/CustomButton';
import { Formik } from 'formik';
import * as yup from 'yup'

interface Props {
  visible: boolean;
  close: () => void;
}

export default function EditEmailModal({
  visible,
  close,
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'profile', 'login'])

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('valid_email', {ns: 'login'}))
      .trim()
      .required(t('required_email', {ns: 'login'})),
    password: yup
      .string()
      .required(t('required_password', {ns: 'login'}))
  })

  function handleClose() {
    close()
  }

  // function submit(value) {
  //   /* */
  // }

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
                {t('edit_email_address', {ns: 'profile'})}
              </Text>
              <Formik
                validationSchema={loginValidationSchema}
                initialValues={{
                  email: '',
                  password: ''
                }}
                onSubmit={() => {}}
              >
                {({handleChange, handleSubmit, isValid, errors, touched}) => (
                  <>
                    <InputField
                      label={t('email_address', {ns: 'login'})}
                      onChangeText={handleChange('email')}
                      error={touched.email && errors.email}
                      errorMessage={errors.email}
                      autoCapitalize='none'
                      autoCorrect={false}
                      keyboardType='email-address'
                      placeholder={t('placeholder_email', {ns: 'login'})}
                    />
                    <InputField
                      password
                      label={t('current_password', {ns: 'profile'})}
                      onChangeText={handleChange('password')}
                      error={touched.password && errors.password}
                      errorMessage={errors.password}
                      autoCapitalize='none'
                      autoCorrect={false}
                      placeholder={t('placeholder_password', {ns: 'login'})}
                    />
                    <CustomButton
                      primary
                      title={t('update', {ns: 'profile'})}
                      onPress={() => handleSubmit()}
                      disabled={!isValid}
                      style={styles.btn}
                    />
                  </>
                )}
              </Formik>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
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