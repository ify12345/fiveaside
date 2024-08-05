/* eslint-disable @typescript-eslint/no-use-before-define */
import { Keyboard, KeyboardAvoidingView, Modal, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CloseSvg from '~assets/svg/CloseSvg'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Colors } from '~config/colors'
import InputField from '~components/InputField'
import {AntDesign} from '@expo/vector-icons'
import CustomButton from '~components/CustomButton'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { updateBank } from '~api/payment'
import { UpdateBankPayload } from '~types/api'
import Toast from 'react-native-toast-message'
import Loader from '~components/loader'
import { getUser } from '~api/auth'
import BanksModal from './BanksModal'

interface Props {
  visible: boolean;
  close: () => void;
  type: 'add' | 'edit'
}

export default function AddPaymentAccountModal({
  visible,
  close,
  type
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('payment')
  const {user: {outlet}} = useAppSelector((store) => store.auth)
  const {data: banks} = useAppSelector((store) => store.bank)
  const [loading, setLoading] = useState(false)

  const [bankModalVisible, setBankModalVisible] = useState(false)

  const [bank, setBank] = useState<number | undefined>()
  const [routingNumber, setRoutingNumber] = useState<string | undefined>('')
  const [accountNumber, setAccountNumber] = useState<string | undefined>('')
  const [accountName, setAccountName] = useState<string | undefined>('')

  const bankName = banks.find(b => b.id === bank)?.name

  useEffect(() => {
    setBank(outlet?.bankId || undefined)
    setRoutingNumber(outlet?.bankRoutingNumber || '')
    setAccountName(outlet?.bankAccountName || '')
    setAccountNumber(outlet?.bankAccountNumber || '')
  }, [visible])

  const [error, setError] = useState({
    bank: '',
    routingNumber: '',
    accountNumber: '',
    accountName: ''
  })

  function validateInput() {
    if (!bank) {
      setError(prev => ({
        ...prev,
        bank: t('bank_name_required')
      }))
      return false
    }
    if (!routingNumber) {
      setError(prev => ({
        ...prev,
        routingNumber: t('routing_number_required')
      }))
      return false
    }
    if (!accountNumber) {
      setError(prev => ({
        ...prev,
        accountNumber: t('account_number_required')
      }))
      return false
    }
    if (!accountName) {
      setError(prev => ({
        ...prev,
        accountName: t('account_name_required')
      }))
      return false
    }
    return true
  }

  function resetForm() {
    setBank(undefined)
    setRoutingNumber('')
    setAccountName('')
    setAccountNumber('')
  }

  function handleClose() {
    resetForm()
    setError(() => ({
      bank: '',
      accountName: '',
      accountNumber: '',
      routingNumber: ''
    }))
    close()
  }

  const dispatch = useAppDispatch()
  function submit() {
    if (validateInput()) {
      const payload: UpdateBankPayload = {
        bankId: bank!,
        bankRoutingNumber: routingNumber!,
        bankAccountName: accountName!,
        bankAccountNumber: accountNumber!
      }
      setLoading(true)
      dispatch(updateBank(payload))
      .unwrap()
      .then(() => {
        dispatch(getUser())
        setLoading(false)
        handleClose()
      })
      .catch(err => {
        setLoading(false)
        Toast.show({
          type: 'error',
          props: {message: err?.msg}
        })
      })
    }
  }

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
                {type === 'add' ? t('add_payment_account') : t('edit_payment_account')}
              </Text>
              <InputField
                selectPicker
                label={t('bank_name')}
                placeholder={t('select_bank')}
                rightIcon={<AntDesign name='caretdown' size={12} color={colors.onSurface} />}
                value={bankName}
                error={error.bank}
                errorMessage={error.bank || ''}
                pickerPressed={() => setBankModalVisible(true)}
              />
              <InputField
                label={t('routing_number')}
                placeholder={t('routing_number_placeholder')}
                keyboardType='number-pad'
                value={routingNumber}
                error={error.routingNumber}
                errorMessage={error.routingNumber || ''}
                onChangeText={(val: string) => {
                  setRoutingNumber(val)
                  setError(prev => ({
                    ...prev,
                    routingNumber: ''
                  }))
                }}
              />
              <InputField
                label={t('account_number')}
                placeholder={t('account_number_placeholder')}
                keyboardType='number-pad'
                value={accountNumber}
                error={error.accountNumber}
                errorMessage={error.accountNumber || ''}
                onChangeText={(val: string) => {
                  setAccountNumber(val)
                  setError(prev => ({
                    ...prev,
                    accountNumber: ''
                  }))
                }}
              />
              <InputField
                label={t('account_name')}
                placeholder={t('account_name_placeholder')}
                autoCapitalize='none'
                value={accountName}
                error={error.accountName}
                errorMessage={error.accountName || ''}
                onChangeText={(val: string) => {
                  setAccountName(val)
                  setError(prev => ({
                    ...prev,
                    accountName: ''
                  }))
                }}
              />
              <CustomButton
                primary
                title={type === 'add' ? t('add_account') : t('update')}
                style={styles.btn}
                onPress={() => submit()}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </KeyboardAvoidingView>
      <BanksModal
        visible={bankModalVisible}
        close={() => setBankModalVisible(false)}
        selected={outlet?.bankId}
        setSelected={setBank}
      />
      <Loader visible={loading} />
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
    marginTop: 26,
    marginBottom: 40
  }
})