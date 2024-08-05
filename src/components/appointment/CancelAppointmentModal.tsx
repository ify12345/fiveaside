/* eslint-disable @typescript-eslint/no-use-before-define */
import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { Colors } from '~config/colors'
import { useTheme, Text } from 'react-native-paper'
import CloseSvg from '~assets/svg/CloseSvg';
import { useTranslation } from 'react-i18next';
import CustomButton from '~components/CustomButton';
import { Formik } from 'formik';
import InputField from '~components/InputField';
import * as yup from  'yup'
import { useAppDispatch } from '~redux/store';
import { CancelAppointmentPayload } from '~types/api';
import { cancelAppointment, getPastAppointments, getUpcomingAppointments } from '~api/appointment';
import Toast from 'react-native-toast-message';
import Loader from '~components/loader';
import { cleanPastAppointments, cleanUpcomingAppointments } from '~redux/reducers/appointment';

interface Props {
  appointment_id: number;
  visible: boolean;
  close: () => void;
  setFirstLoaded: (boolean: SetStateAction<boolean>) => void;
  type: 'booked' | 'past'
}

export default function CancelAppointmentModal({
  appointment_id,
  visible,
  close,
  setFirstLoaded,
  type
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['appointment'])
  const [loading, setLoading] = useState(false)

  const validationSchema = yup.object().shape({
    reason: yup
      .string()
      .required(t('required_cancel_reason'))
      .min(20, t('reason_length')),
  })

  const dispatch = useAppDispatch()
  function handleCancel({reason}: {reason: string}) {
    close()
    const payload: CancelAppointmentPayload = {
      appointment_id,
      reason
    }
    setTimeout(() => {
      setLoading(true)
      dispatch(cancelAppointment(payload))
      .unwrap()
      .then(() => {
        setLoading(false)
        setFirstLoaded(false)
        if (type === 'booked') {
          dispatch(cleanUpcomingAppointments())
          dispatch(getUpcomingAppointments({}))
        }
        if (type === 'past') {
          dispatch(cleanPastAppointments())
          dispatch(getPastAppointments({}))
        }
      })
      .catch(err => {
        setLoading(false)
        Toast.show({
          type: 'error',
          props: {message: err?.msg}
        })
      })
    }, 300)
  }

  return (
    <>
    <Modal transparent visible={visible} animationType="slide">
      <KeyboardAvoidingView behavior='height' style={styles.fullView}>
      <View style={styles.modalContainer}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
          <TouchableOpacity
            onPress={close}
            hitSlop={20}
            style={styles.closeBtn}
          >
            <CloseSvg  />
          </TouchableOpacity>
          <Text variant='labelLarge' style={{color: Colors.charcoal}}>
            {t('cancel_reason')}
          </Text>
          <Text style={[styles.label, {color: colors.onSurface}]}>
            {t('reason')}
          </Text>
           <Formik
                validationSchema={validationSchema}
                initialValues={{
                  reason: ''
                }}
                onSubmit={values => handleCancel(values)}
              >
                {({handleChange, handleSubmit, isValid, errors, touched}) => (
                  <>
                    <InputField
                      label=''
                      onChangeText={handleChange('reason')}
                      error={touched.reason && errors.reason}
                      errorMessage={errors.reason}
                      autoCapitalize='none'
                      autoCorrect={false}
                      placeholder={t('write_cancel_reason')}
                      style={styles.input}
                      multiline
                    />
                    <CustomButton
                      primary
                      title={t('submit')}
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
    <Loader visible={loading} />
    </>
  )
}

const styles = StyleSheet.create({
  fullView: {
    flex: 1
  },
   modalContainer: {
    backgroundColor: Colors.backDrop,
    flex: 1,
    flexDirection: 'column-reverse',
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
    alignSelf: 'flex-end',
    marginBottom: 16
  },
  label: {
    marginTop: 24
  },
  input: {
    color: Colors.charcoal,
    borderRadius: 8,
  },
  btn: {
    marginVertical: 40
  }
})