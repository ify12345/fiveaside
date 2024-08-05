/* eslint-disable @typescript-eslint/no-use-before-define */
import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Text } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors } from '~config/colors';
import CloseSvg from '~assets/svg/CloseSvg';
import InputField from '~components/InputField';
import CustomButton from '~components/CustomButton';
import { Formik } from 'formik';
import * as yup from 'yup'
import { Country } from '~types';
import CountryCodeData from '~mocks/country-codes'
import CountryCodeModal from './CountryCodeModal';

interface Props {
  visible: boolean;
  close: () => void;
}

export default function EditPhoneNumberModal({
  visible,
  close
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'profile', 'login', 'reset_password'])

  const validationSchema = yup.object().shape({
    phone: yup
    .string()
    .required(t('required_phone')),
    reset_code: yup
      .string()
      // eslint-disable-next-line consistent-return
      .test('len', t('length_reset_code', {ns: 'reset_password'}), val => { if (val) return val.length === 4 })
      .required(t('required_reset_code', {ns: 'reset_password'})),
   
  })

  const [countryModalVisible, setCountryModalVisible] = useState(false)
  const [country, setCountry] = useState<Country>(CountryCodeData[0])

  function toggleCountryModal() {
    setCountryModalVisible(!countryModalVisible)
  }

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
                {t('edit_phone_number', {ns: 'profile'})}
              </Text>
              <Formik
                validationSchema={validationSchema}
                initialValues={{
                  phone: '',
                  reset_code: ''
                }}
                onSubmit={() => {}}
              >
                {({handleChange, handleSubmit, isValid, errors, touched}) => (
                  <>
                    <InputField
                      isPhoneInput
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
                      label={t('reset_code', {ns: 'reset_password'})}
                      keyboardType='number-pad'
                      onChangeText={handleChange('reset_code')}
                      error={touched.reset_code && errors.reset_code}
                      errorMessage={errors.reset_code}
                      autoCapitalize='none'
                      autoCorrect={false}
                      placeholder={t('placeholder_reset_code', {ns: 'reset_password'})}
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
      <CountryCodeModal
        visible={countryModalVisible}
        close={() => toggleCountryModal()}
        setSelected={setCountry}
      />
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