import { KeyboardAvoidingView, ScrollView, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import InputField from '~components/InputField'
import CustomButton from '~components/CustomButton'
import { RootStackScreenProps } from '~types/navigation'
import * as yup from 'yup'
import { ResetPasswordInput } from '~types/forms'
import { ResetPasswordPayload } from '~types/api'
import { useAppDispatch } from '~redux/store'
import { forgotPassword, resetPassword } from '~api/auth'
import Toast from 'react-native-toast-message'
import Loader from '~components/loader'
import styles from './styles'

export default function ResetPassword({
  navigation,
  route: {
    params: {email}
  }
}: RootStackScreenProps<'ResetPassword'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['reset_password', 'account_verification', 'signup'])
  const [loading, setLoading] = useState(false)

  const resetPasswordValidationSchema = yup.object().shape({
    reset_code: yup
      .string()
      // eslint-disable-next-line consistent-return
      .test('len', t('length_reset_code'), val => { if (val) return val.length === 4 })
      .required(t('required_reset_code', {ns: 'reset_password'})),
    new_password: yup
      .string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])(?!.*\s).{8,}$/, t('valid_password', {ns: 'signup'}))
      .required(t('required_new_password')),
    confirm_password: yup
      .string()
      .required(t('required_new_password_again'))
      .oneOf([yup.ref('new_password')], t('new_password_match'))
  })

  const dispatch = useAppDispatch()
  function submit({
    reset_code, confirm_password, new_password
  }: ResetPasswordInput) {
    const payload: ResetPasswordPayload = {
      resetToken: reset_code,
      newPassword: new_password,
      confirmPassword: confirm_password
    }
    setLoading(true)
    dispatch(resetPassword(payload))
    .unwrap()
    .then(() => {
      setLoading(false)
      navigation.navigate('ResetPasswordSuccess')
    })
    .catch(err => {
      setLoading(false)
      Toast.show({
        type: 'error',
        props: {message: err?.msg}
      })
    })
  }

  function handleResendCode() {
    setLoading(true)
    // dispatch(resendOtp())
    dispatch(forgotPassword({email}))
    .unwrap()
    .then(({message}) => {
      setLoading(false)
      Toast.show({
        type: 'success',
        props: {
          message
        }
      })
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
    <SafeAreaScreen>
      <View style={styles.content}>
        <Text style={{color: colors.onBackground}} variant='headlineLarge'>
          {t('reset_password')}
        </Text>
        <Text variant='bodySmall' style={[styles.headerDesc, {color: colors.onSurface}]}>
          {t('screen_desc')}
          <Text variant='bodyMedium' style={styles.email}>
            {email}
          </Text>
        </Text>
        <KeyboardAvoidingView behavior="height" style={styles.fullView}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.fullView}>
              <Formik
                validationSchema={resetPasswordValidationSchema}
                initialValues={{
                  reset_code: '',
                  new_password: '',
                  confirm_password: '',
                }}
                onSubmit={values => submit(values)}
              >
                 {({touched, handleChange, handleSubmit, errors, isValid}) => (
                  <>
                    <InputField
                      required
                      label={t('reset_code')}
                      keyboardType='number-pad'
                      error={touched.reset_code && errors.reset_code}
                      errorMessage={errors.reset_code}
                      onChangeText={handleChange('reset_code')}
                      autoCapitalize='words'
                      autoComplete='name'
                      autoCorrect={false}
                      placeholder={t('placeholder_reset_code')}
                    />
                    <InputField
                      password
                      required
                      label={t('new_password')}
                      error={touched.new_password && errors.new_password}
                      errorMessage={errors.new_password}
                      onChangeText={handleChange('new_password')}
                      autoCapitalize='none'
                      placeholder={t('placeholder_password', {ns: 'login'})}
                    />
                    <InputField
                      password
                      required
                      label={t('confirm_password')}
                      error={touched.confirm_password && errors.confirm_password}
                      errorMessage={errors.confirm_password}
                      onChangeText={handleChange('confirm_password')}
                      autoCapitalize='none'
                      placeholder={t('placeholder_password', {ns: 'login'})}
                    />
                    <CustomButton
                      primary
                      title={t('update_password')}
                      onPress={() => handleSubmit()}
                      disabled={!isValid}
                    />
                    <TouchableOpacity
                      style={styles.link}
                      onPress={() => handleResendCode()}
                    >
                      <Text variant='bodySmall' style={[styles.resendText, {color: colors.onSurface}]}>
                        {t('resend_otp', {ns: 'account_verification'})}
                        <Text variant='bodyMedium' style={{color: colors.primary}}>
                          &nbsp;{t('resend', {ns: 'account_verification'})}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </>
                 )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
      <Loader visible={loading} />
    </SafeAreaScreen>
  )
}