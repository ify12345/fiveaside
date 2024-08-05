import { KeyboardAvoidingView, ScrollView, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Formik } from 'formik'
import InputField from '~components/InputField'
import CustomButton from '~components/CustomButton'
import { RootStackScreenProps } from '~types/navigation'
import * as yup from 'yup'
import CountryCodeModal from '~components/modals/CountryCodeModal'
import CountryCodeData from '~mocks/country-codes'
import { AccountType, Country } from '~types'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useAppDispatch } from '~redux/store'
import { getUserDetails } from '~redux/reducers/auth'
import { RegisterPayload } from '~types/api'
import { SignupOneInput } from '~types/forms'
import {AntDesign} from "@expo/vector-icons"
import BusinessModal from '~components/modals/BusinessModal'
import styles from '../styles'

export default function SignupOne({
  navigation,
  route: {
    params: {account_type}
  }
}: RootStackScreenProps<'SignupOne'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'login', 'onboard'])
  const [countryModalVisible, setCountryModalVisible] = useState(false)
  const [country, setCountry] = useState<Country>(CountryCodeData[0])
  const [outletId, setOutletId] = useState<number | undefined>(undefined)
  const [businessModalVisible, setBusinessModalVisible] = useState(false)

  const signupOneValidationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/(\w.+\s).+/, t('required_two_name'))
      .required(t('required_name')),
    business_name: yup
      .string()
      .required(t('required_business_name')),
    email: yup
      .string()
      .email(t('valid_email', {ns: 'login'}))
      .trim()
      .required(t('required_email', {ns: 'login'})),
    phone: yup
      .string()
      .required(t('required_phone')),
    password: yup
      .string()
      .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])(?!.*\s).{8,}$/, t('valid_password'))
      .required(t('required_password', {ns: 'login'}))
  })

  function toggleCountryModal() {
    setCountryModalVisible(!countryModalVisible)
  }

  function toggleBusinessModal() {
    setBusinessModalVisible(!businessModalVisible)
  }

  const dispatch = useAppDispatch()
  function submit({
    name,
    business_name,
    email,
    password,
    phone
  }: SignupOneInput) {
    const splittedNames = name.split(' ')
    const payload: RegisterPayload = {
      firstName: splittedNames[0],
      lastName: splittedNames[1],
      businessName: business_name,
      email,
      password,
      phone,
      countryId: country.countryId,
      outletId
    }
    dispatch(getUserDetails(payload))
    navigation.navigate('SignupTwo', {account_type})
  }

  useEffect(() => {
    GoogleSignin.configure({
      scopes: [
        "https://www.googleapis.com/auth/userinfo.profile",
      ],
      // webClientId: , provide to get id token
      offlineAccess: false,
    });
  }, [])

  return (
    <SafeAreaScreen>
      <View style={styles.content}>
        <Text style={{color: colors.onBackground}} variant='headlineLarge'>
          {t('create_account')}
        </Text>
        <Text variant='bodyMedium' style={[styles.headerDesc, {color: colors.onSurface}]}>
          {t('screen_one_desc')}
        </Text>
        <View style={[styles.stepView, {backgroundColor: colors.tertiary}]}>
          <Text variant='displaySmall' style={{color: colors.primary}}>{t('step')}</Text>
          <Text variant='displaySmall'>&nbsp;</Text>
          <Text variant='displaySmall' style={{color: colors.primary}}>{t('one')}</Text>
          <Text variant='displaySmall'>&nbsp;</Text>
          <Text variant='displaySmall' style={{color: colors.primary}}>{t('of')}</Text>
          <Text variant='displaySmall'>&nbsp;</Text>
          <Text variant='displaySmall' style={{color: colors.primary}}>{t('two')}</Text>
        </View>
        <KeyboardAvoidingView behavior="height" style={styles.fullView}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.fullView}>
              <Formik
                validationSchema={signupOneValidationSchema}
                initialValues={{
                  name: '',
                  business_name: '',
                  email: '',
                  phone: '',
                  password: ''
                }}
                onSubmit={values => submit(values)}
              >
                 {({touched, handleChange, handleSubmit, errors, isValid, values, setValues}) => (
                  <>
                    <InputField
                      required
                      label={t('your_name')}
                      error={touched.name && errors.name}
                      errorMessage={errors.name}
                      onChangeText={handleChange('name')}
                      autoCapitalize='words'
                      autoComplete='name'
                      autoCorrect={false}
                      placeholder={`${t('e.g')} ${t('placeholder_name')}`}
                    />
                    {
                      account_type === AccountType.new ? (
                        <InputField
                          required
                          label={t('business_name')}
                          error={touched.business_name && errors.business_name}
                          errorMessage={errors.business_name}
                          onChangeText={handleChange('business_name')}
                          autoCapitalize='none'
                          autoCorrect={false}
                          placeholder={`${t('e.g')} ${t('placeholder_business_name')}`}
                        />
                      ) : (
                        <InputField
                          required
                          selectPicker
                          label={t('business_name')}
                          error={touched.business_name && errors.business_name}
                          errorMessage={errors.business_name}
                          value={values.business_name}
                          rightIcon={<AntDesign name='caretdown' color={colors.onSurface} />}
                          pickerPressed={() => toggleBusinessModal()}
                          placeholder={t('select')}
                        />
                      )
                    }
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
                    <InputField
                      isPhoneInput
                      required
                      label={t('phone_number')}
                      keyboardType='phone-pad'
                      error={touched.phone && errors.phone}
                      errorMessage={errors.phone}
                      onChangeText={handleChange('phone')}
                      autoComplete='tel'
                      placeholder={t('placeholder_phone')}
                      countryCodeValue={country.countryDialCode}
                      openCountryModal={() => toggleCountryModal()}
                    />
                    <InputField
                      password
                      required
                      label={t('password', {ns: 'login'})}
                      error={touched.password && errors.password}
                      errorMessage={errors.password}
                      onChangeText={handleChange('password')}
                      autoCapitalize='none'
                      placeholder={t('placeholder_password', {ns: 'login'})}
                    />
                    <CustomButton
                      primary
                      title={t('continue')}
                      onPress={() => handleSubmit()}
                      disabled={!isValid}
                    />
                    <View>
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
                    </View>
                    <BusinessModal
                      visible={businessModalVisible}
                      close={() => toggleBusinessModal()}
                      setValue={value => {
                        setValues({
                          ...values,
                          business_name: value
                        })
                      }}
                      setOutletId={setOutletId}
                    />
                  </>
                 )}
              </Formik>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <CountryCodeModal
          visible={countryModalVisible}
          close={() => toggleCountryModal()}
          setSelected={setCountry}
        />
      </View>
    </SafeAreaScreen>
  )
}