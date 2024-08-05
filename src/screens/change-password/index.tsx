import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import SafeAreaScreen from '~components/SafeAreaScreen'
import CustomHeader from '~components/CustomHeader'
import { ProfileStackScreenProps } from '~types/navigation'
import InputField from '~components/InputField'
import CustomButton from '~components/CustomButton'
import { Formik } from 'formik'
import * as yup from 'yup'
import { ChangePasswordInput } from '~types/forms'
import { ChangePasswordPayload } from '~types/api'
import { useAppDispatch } from '~redux/store'
import { updatePassword } from '~api/profile'
import Toast from 'react-native-toast-message'
import Loader from '~components/loader'
import styles from './styles'

export default function ChangePassword({navigation}: ProfileStackScreenProps<'ChangePassword'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['change_password', 'login', 'profile', 'signup'])
  const [loading, setLoading] = useState(false)

  const changePasswordValidationSchema = yup.object().shape({
    old_password: yup
      .string()
      .required(t('required_old_password', {ns: 'reset_password'})),
    new_password: yup
      .string()
      .notOneOf([yup.ref('old_password')], t('old_password_match', {ns: 'reset_password'}))
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])(?!.*\s).{8,}$/, t('valid_password', {ns: 'signup'}))
      .required(t('required_new_password', {ns: 'reset_password'})),
    confirm_password: yup
      .string()
      .required(t('required_new_password_again', {ns: 'reset_password'}))
      .oneOf([yup.ref('new_password')], t('new_password_match', {ns: 'reset_password'}))
  })

  const dispatch = useAppDispatch()
  function submit({
    old_password, new_password, confirm_password
  }: ChangePasswordInput) {
    const payload: ChangePasswordPayload = {
      oldPassword: old_password,
      newPassword: new_password,
      confirmPassword: confirm_password
    }
    setLoading(true)
    dispatch(updatePassword(payload))
    .unwrap()
    .then(({message}) => {
      setLoading(false)
      Toast.show({
        type: 'success',
        props: {
          message
        }
      })
      navigation.goBack()
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
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('change_password')}
          onLeftIconPressed={() => navigation.goBack()}
        />
        <KeyboardAvoidingView behavior='height' style={styles.content}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
            <View style={[styles.form, {backgroundColor: colors.background}]}>
              <Formik
                validationSchema={changePasswordValidationSchema}
                initialValues={{
                  old_password: '',
                  new_password: '',
                  confirm_password: ''
                }}
                onSubmit={values => submit(values)}
              >
                {({touched, handleChange, handleSubmit, errors, isValid}) => (
                  <>
                    <InputField
                      password
                      required
                      label={t('old_password')}
                      placeholder={t('placeholder_password', {ns: 'login'})}
                      error={touched.old_password && errors.old_password}
                      errorMessage={errors.old_password}
                      onChangeText={handleChange('old_password')}
                      autoCapitalize='none'
                    />
                    <InputField
                      password
                      required
                      label={t('new_password')}
                      placeholder={t('placeholder_password', {ns: 'login'})}
                      error={touched.new_password && errors.new_password}
                      errorMessage={errors.new_password}
                      onChangeText={handleChange('new_password')}
                      autoCapitalize='none'
                    />
                    <InputField
                      password
                      required
                      label={t('re-enter_password')}
                      placeholder={t('placeholder_password', {ns: 'login'})}
                      error={touched.confirm_password && errors.confirm_password}
                      errorMessage={errors.confirm_password}
                      onChangeText={handleChange('confirm_password')}
                      autoCapitalize='none'
                    />
                    <View style={styles.footer}>
                      <CustomButton
                        primary
                        disabled={!isValid}
                        title={t('update', {ns: 'profile'})}
                        style={styles.btn}
                        onPress={() => handleSubmit()}
                      />
                    </View>
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