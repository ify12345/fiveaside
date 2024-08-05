import { KeyboardAvoidingView, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { ProfileStackScreenProps } from '~types/navigation'
import CustomHeader from '~components/CustomHeader'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import {Feather} from '@expo/vector-icons'
import InputField from '~components/InputField'
import CustomButton from '~components/CustomButton'
import { Formik } from 'formik'
import * as yup from 'yup'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { UpdateAddressInput } from '~types/forms'
import { UpdateProfilePayload } from '~types/api'
import { updateProfile } from '~api/profile'
import Toast from 'react-native-toast-message'
import Loader from '~components/loader'
import styles from './styles'

export default function Address({navigation}: ProfileStackScreenProps<'Address'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'login', 'drawer', 'profile'])
  const {user: {streetAddress1, streetAddress2, city: userCity, zipCode}} = useAppSelector((store) => store.auth)
  const [loading, setLoading] = useState(false)

  const initialValues = {
    address_one: streetAddress1,
    address_two: streetAddress2 || '',
    city: userCity,
    post_code: zipCode,
  }

  const signupTwoValidationSchema = yup.object().shape({
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
  function submit({address_one, address_two, city, post_code}: UpdateAddressInput) {
    const payload: UpdateProfilePayload = {
      streetAddress1: address_one,
      streetAddress2: address_two,
      city,
      zipCode: post_code
    }
    setLoading(true)
    dispatch(updateProfile(payload))
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
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('address', {ns: 'drawer'})}
          leftIcon={<Feather name='menu' size={24} color={colors.onSurface} />}
          onLeftIconPressed={() => navigation.openDrawer()}
        />
        <KeyboardAvoidingView behavior='height' style={styles.content}>
          <ScrollView contentContainerStyle={[styles.scrollContent, {backgroundColor: colors.background}]} showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.content}>
              <Formik
                validationSchema={signupTwoValidationSchema}
                enableReinitialize
                initialValues={initialValues}
                onSubmit={values => submit(values)}
              >
                 {({touched, handleChange, handleSubmit, errors, isValid, values}) => (
                  <>
                    <InputField
                      label={t('street_address_one')}
                      keyboardType='name-phone-pad'
                      error={touched.address_one && errors.address_one}
                      errorMessage={errors.address_one}
                      onChangeText={handleChange('address_one')}
                      autoCapitalize='none'
                      autoComplete='address-line1'
                      autoCorrect={false}
                      placeholder={t('placeholder_street_address')}
                      value={values.address_one}
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
                      value={values.address_two}
                    />
                    <InputField
                      label={t('city')}
                      error={touched.city && errors.city}
                      errorMessage={errors.city}
                      onChangeText={handleChange('city')}
                      autoCapitalize='none'
                      autoComplete='postal-address-locality'
                      autoCorrect={false}
                      placeholder={t('placeholder_city')}
                      value={values.city}
                    />
                    <InputField
                      label={t('post_code')}
                      keyboardType='number-pad'
                      error={touched.post_code && errors.post_code}
                      errorMessage={errors.post_code}
                      onChangeText={handleChange('post_code')}
                      autoComplete='tel'
                      placeholder={t('placeholder_post_code')}
                      value={values.post_code}
                    />
                    <View style={styles.footer}>
                      <CustomButton
                        primary
                        title={t('update', {ns: 'profile'})}
                        onPress={() => handleSubmit()}
                        disabled={!isValid}
                        style={styles.btn}
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