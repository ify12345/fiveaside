import { Keyboard, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme, Text} from 'react-native-paper'
import InputField from '~components/InputField'
import { Formik } from 'formik'
import { useTranslation } from 'react-i18next'
import CustomButton from '~components/CustomButton'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { RootStackScreenProps } from '~types/navigation'
import * as yup from 'yup'
import GoogleAuth from '~utils/google'
import TinyToast from '~components/Toast'
import Toast from 'react-native-toast-message'
import { GoogleAuthPayload, LoginPayload } from '~types/api'
import { useAppDispatch } from '~redux/store'
import { continueWithGoogle, login } from '~api/auth'
import Loader from '~components/loader'
import styles from './styles'

export default function Login({navigation}: RootStackScreenProps<'Login'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['login', 'onboard'])
  const [loading, setLoading] = useState(false)

  const loginValidationSchema = yup.object().shape({
    email: yup
      .string()
      .email(t('valid_email'))
      .trim()
      .required(t('required_email')),
    password: yup
      .string()
      .required(t('required_password'))
  })

  // const [rememberChecked, setRememberChecked] = useState(false);

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
      // webClientId: , provide to get id token
      offlineAccess: false,

    });
  }, [])

  const dispatch = useAppDispatch()
  async function LoginWithGoogle() {
    try {
      const googleUser = await GoogleAuth()
      if (googleUser && googleUser.user) {
        const payload: GoogleAuthPayload = {
          googleToken: googleUser.user.id,
          email: googleUser.user.email,
        }
        setLoading(true)
        dispatch(continueWithGoogle(payload))
        .unwrap()
        .then(() => {
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          Toast.show({
            type: 'error',
            props: {message: err?.msg}
          })
        })
      }
    } catch (err: any) {
      TinyToast(t(err?.message))
    }
  }

  function submit(values: LoginPayload) {
    setLoading(true)
    dispatch(login(values))
    .unwrap()
    .then(() => {
      setLoading(false)
    })
    .catch(err => {
      setLoading(false)
      Toast.show({
        type: 'error',
        props: {message: err?.msg}
      })
    })
  }

  return (
    <SafeAreaScreen>
      <View style={styles.content}>
        <Text style={{color: colors.onBackground}} variant='headlineLarge'>
          {t('welcome_back')}
        </Text>
        <Text variant='bodyMedium' style={[styles.headerDesc, {color: colors.onSurface}]}>
          {t('screen_desc')}
        </Text>

        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <View style={styles.fullView}>
            <Formik
              validationSchema={loginValidationSchema}
              initialValues={{
                email: '',
                password: ''
              }}
              onSubmit={values => submit(values)}
            >
              {({touched, handleChange, handleSubmit, errors, isValid}) => (
                <>
                  <InputField
                    required
                    label={t('email_address')}
                    keyboardType='email-address'
                    error={touched.email && errors.email}
                    errorMessage={errors.email}
                    onChangeText={handleChange('email')}
                    autoCapitalize='none'
                    autoComplete='email'
                    autoCorrect={false}
                    placeholder={t('placeholder_email')}
                  />
                  <InputField
                    password
                    required
                    label={t('password')}
                    error={touched.password && errors.password}
                    errorMessage={errors.password}
                    onChangeText={handleChange('password')}
                    autoCapitalize='none'
                    placeholder={t('placeholder_password')}
                  />
                  <View style={styles.questions}>
                    {/* <View style={styles.rowAligned}>
                      <Checkbox.Item
                        mode='android'
                        label={t('remember_me')}
                        accessibilityLabel={t('remember_me')}
                        labelVariant='bodyMedium'
                        position='leading'
                        uncheckedColor={colors.onSurface}
                        color={colors.primary}
                        status={rememberChecked ? 'checked' : 'unchecked'}
                        onPress={() => setRememberChecked(!rememberChecked)}
                        style={styles.chechbox}
                      />
                    </View> */}
                    <View />
                    <TouchableOpacity
                      hitSlop={20}
                      onPress={() => navigation.navigate('ForgotPassword')}
                    >
                      <Text variant='bodyMedium' style={{color: colors.primary}}>
                        {t('forgot_password')}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <CustomButton
                    primary
                    title={t('login', {ns: 'onboard'})}
                    onPress={() => handleSubmit()}
                    disabled={!isValid}
                  />
                  <View style={styles.btnSeparator}>
                    <View style={[styles.line, {borderColor: colors.primary}]} />
                    <Text variant='displaySmall' style={{color: colors.primary}}>
                      {t('or')}
                    </Text>
                    <View style={[styles.line, {borderColor: colors.primary}]} />
                  </View>
                  <CustomButton
                    isGoogleBtn
                    title={t('continue_google', {ns: 'login'})}
                    onPress={() => LoginWithGoogle()}
                  />
                  <TouchableWithoutFeedback
                    hitSlop={20}
                    onPress={() => navigation.navigate('Onboard')}
                  >
                    <Text variant='bodySmall' style={[styles.noAccountText, {color: colors.onSurface}]}>
                      {t('no_account')}
                      <Text variant='bodyMedium' style={{color: colors.primary}}>
                        &nbsp;{t('signup')}
                      </Text>
                    </Text>
                  </TouchableWithoutFeedback>
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