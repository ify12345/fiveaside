import { KeyboardAvoidingView, ScrollView, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import InputField from '~components/InputField'
import CustomButton from '~components/CustomButton'
import { RootStackScreenProps } from '~types/navigation'
import * as yup from 'yup'
import { SignupTwoInput } from '~types/forms'
import { RegisterPayload } from '~types/api'
import { useAppDispatch, useAppSelector } from '~redux/store'
import BackIconSvg from '~assets/svg/BackIconSvg'
import { register } from '~api/auth'
import Loader from '~components/loader'
import Toast from 'react-native-toast-message'
import { AccountType } from '~types'
import dayjs from '~config/dayjs'
import styles from '../styles'

export default function SignupTwo({
  navigation,
  route: {
    params: {account_type}
  }
}: RootStackScreenProps<'SignupTwo'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'login', 'onboard'])
  const {user} = useAppSelector((store) => store.auth)
  const [loading, setLoading] = useState(false)

  const signupTwoValidationSchema = yup.object().shape({
    about: yup
      .string(),
    website: yup
      .string(),
    address_one: yup
      .string()
      .required(t('required_address')),
    address_two: yup
      .string(),
    city: yup
      .string()
      .required(t('required_city')),
    post_code: yup
      .string()
      .required(t('required_post_code')),
  })

  const dispatch = useAppDispatch()
  function submit({
    address_one,
    address_two,
    city,
    post_code,
    about,
    website
  }: SignupTwoInput) {
    const payload: RegisterPayload = {
      ...user,
      about,
      website,
      streetAddress1: address_one,
      streetAddress2: address_two,
      city,
      zipCode: post_code,
      timezone: dayjs.tz.guess()
    }
    setLoading(true)
    dispatch(register(payload))
    .unwrap()
    .then(() => {
      setLoading(false)
      navigation.navigate('AccountVerification')
    })
    .catch((err) => {
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
        <View style={styles.header}>
          <TouchableOpacity hitSlop={10} onPress={() => navigation.goBack()}>
            <BackIconSvg />
          </TouchableOpacity>
          <Text style={{color: colors.onBackground}} variant='headlineLarge'>
            {t('create_account')}
          </Text>
          <View />
        </View>
        <Text variant='bodyMedium' style={[styles.headerDesc, {color: colors.onSurface}]}>
          {t('screen_two_desc')}
        </Text>
        <View style={[styles.stepView, {backgroundColor: colors.tertiary}]}>
          <Text variant='displaySmall' style={{color: colors.primary}}>{t('step')}</Text>
          <Text variant='displaySmall'>&nbsp;</Text>
          <Text variant='displaySmall' style={{color: colors.primary}}>{t('two')}</Text>
          <Text variant='displaySmall'>&nbsp;</Text>
          <Text variant='displaySmall' style={{color: colors.primary}}>{t('of')}</Text>
          <Text variant='displaySmall'>&nbsp;</Text>
          <Text variant='displaySmall' style={{color: colors.primary}}>{t('two')}</Text>
        </View>
        <KeyboardAvoidingView behavior="height" style={styles.fullView}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.fullView}>
              <Formik
                validationSchema={signupTwoValidationSchema}
                initialValues={{
                  about: '',
                  website: '',
                  address_one: '',
                  address_two: '',
                  city: '',
                  post_code: '',
                }}
                onSubmit={values => submit(values)}
              >
                 {({touched, handleChange, handleSubmit, errors, isValid}) => (
                  <>
                    {
                      account_type === AccountType.new && (
                        <>
                          <InputField
                            label={t('about')}
                            error={touched.about && errors.about}
                            errorMessage={errors.about}
                            onChangeText={handleChange('about')}
                            autoCapitalize='none'
                            autoCorrect
                            placeholder={t('placeholder_about')}
                            multiline
                          />
                          <InputField
                            label={t('website')}
                            keyboardType='url'
                            error={touched.website && errors.website}
                            errorMessage={errors.website}
                            onChangeText={handleChange('website')}
                            autoCapitalize='none'
                            autoCorrect={false}
                            placeholder={t('placeholder_website')}
                          />
                        </> 
                      )
                    }
                    <InputField
                      required
                      label={t('street_address_one')}
                      keyboardType='name-phone-pad'
                      error={touched.address_one && errors.address_one}
                      errorMessage={errors.address_one}
                      onChangeText={handleChange('address_one')}
                      autoCapitalize='none'
                      autoComplete='address-line1'
                      autoCorrect={false}
                      placeholder={t('placeholder_street_address')}
                    />
                    <InputField
                      label={`${t('street_address_two')} (${t('optional')})`}
                      error={touched.address_two && errors.address_two}
                      errorMessage={errors.address_two}
                      onChangeText={handleChange('address_two')}
                      autoCapitalize='none'
                      autoComplete='address-line2'
                      autoCorrect={false}
                      placeholder={t('placeholder_street_address')}
                    />
                    <InputField
                      required
                      label={t('city')}
                      error={touched.city && errors.city}
                      errorMessage={errors.city}
                      onChangeText={handleChange('city')}
                      autoCapitalize='none'
                      autoComplete='postal-address-locality'
                      autoCorrect={false}
                      placeholder={t('placeholder_city')}
                    />
                    <InputField
                      required
                      label={t('post_code')}
                      keyboardType='number-pad'
                      error={touched.post_code && errors.post_code}
                      errorMessage={errors.post_code}
                      onChangeText={handleChange('post_code')}
                      autoComplete='tel'
                      placeholder={t('placeholder_post_code')}
                    />
                    <CustomButton
                      primary
                      title={t('create_account', {ns: 'onboard'})}
                      onPress={() => handleSubmit()}
                      disabled={!isValid}
                      style={styles.createBtn}
                    />
                    <TouchableWithoutFeedback
                      onPress={() => navigation.navigate('Login')}
                    >
                      <Text variant='bodySmall' style={[styles.loginText, {color: colors.onSurface}]}>
                        {t('account_exist')}
                        <Text variant='bodyMedium' style={{color: colors.primary}}>
                          &nbsp;{t('login', {ns: 'onboard'})}
                        </Text>
                      </Text>
                    </TouchableWithoutFeedback>  
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