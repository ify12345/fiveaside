import { Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import InputField from '~components/InputField'
import { Formik } from 'formik'
import CustomButton from '~components/CustomButton'
import { RootStackScreenProps } from '~types/navigation'
import * as yup from 'yup'
import { useAppDispatch } from '~redux/store'
import { forgotPassword } from '~api/auth'
import Toast from 'react-native-toast-message'
import Loader from '~components/loader'
import styles from './styles'

export default function ForgotPassword({navigation}: RootStackScreenProps<'ForgotPassword'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['forgot_password', 'login', 'onboard'])
  const [loading, setLoading] = useState(false)

  const emailValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('valid_email', {ns: 'login'}))
      .trim()
      .required(t('required_email', {ns: 'login'})),
  })

  const dispatch = useAppDispatch()
  function submit({email}: {email: string}) {
    setLoading(true)
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
      navigation.navigate('ResetPassword', {email})
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
          {t('forgot_password')}
        </Text>
        <Text variant='bodySmall' style={[styles.headerDesc, {color: colors.onSurface}]}>
          {t('screen_desc')}
        </Text>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.fullView}>
            <Formik
              validationSchema={emailValidationSchema}
              initialValues={{
                email: ''
              }}
              onSubmit={value => submit(value)}
            >
              {({touched, handleChange, handleSubmit, errors, isValid}) => (
                <>
                  <InputField
                    required
                    label={t('email_address', {ns: 'login'})}
                    keyboardType='email-address'
                    error={touched.email && errors.email}
                    errorMessage={errors.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize='none'
                    autoComplete='email'
                    autoCorrect={false}
                    placeholder={t('placeholder_email', {ns: 'login'})}
                  />
                  <CustomButton
                    primary
                    title={t('send_code')}
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                    style={styles.btn}
                  />
                  <TouchableOpacity
                    hitSlop={10}
                    onPress={() => navigation.navigate('Login')}
                  >
                    <Text variant='bodySmall' style={[styles.rememberText, {color: colors.onSurface}]}>
                      {t('remember_password')}
                      <Text variant='bodyMedium' style={{color: colors.primary}}>
                        &nbsp;{t('login', {ns: 'onboard'})}
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Loader visible={loading} />
    </SafeAreaScreen>
  )
}