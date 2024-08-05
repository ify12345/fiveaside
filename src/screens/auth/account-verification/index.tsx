import { BackHandler, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useCallback, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { RootStackScreenProps } from '~types/navigation'
import {CodeField, Cursor, useBlurOnFulfill, useClearByFocusCell} from 'react-native-confirmation-code-field'
import { Colors } from '~config/colors'
import CustomButton from '~components/CustomButton'
import { useFocusEffect } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { accountVerification, resendOtp } from '~api/auth'
import Toast from 'react-native-toast-message'
import Loader from '~components/loader'
import styles from './styles'

type Medium = 'email' | 'phone'

const CELL_COUNT = 4;

export default function EmailVerification({
  navigation
}: RootStackScreenProps<'AccountVerification'>) {
  const {colors} = useTheme()
  const {t} = useTranslation('account_verification')
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT})
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue
  })
  const [currentMedium, setCurrentMedium] = useState<Medium>('email')
  const [loading, setLoading] = useState(false)

  const {user: {email, phone}} = useAppSelector((store) => store.auth)

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (navigation.isFocused()) {
          return true;
        } 
        return false
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  function switchMedium() {
    if (currentMedium === 'email') {
      setCurrentMedium('phone')
    }
    if (currentMedium === 'phone') {
      setCurrentMedium('email')
    }
  }

  const dispatch = useAppDispatch()
  function submit() {
    setLoading(true)
    dispatch(accountVerification({otp: value}))
    .unwrap()
    .then(() => {
      setLoading(false)
      navigation.navigate('AccountVerificationSuccess')
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

  function handleResendCode() {
    setLoading(true)
    dispatch(resendOtp())
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
          {t('account_verification')}
        </Text>
        <Text variant='bodySmall' style={[styles.headerDesc, {color: colors.onSurface}]}>
          {t('screen_desc')} {currentMedium}
          <Text variant='bodyMedium' style={styles.email}>
            :&nbsp;{currentMedium === 'email' ? email : phone}
          </Text>
        </Text>
        <TouchableWithoutFeedback>
          <View style={styles.fullView}>
            <CodeField
              ref={ref}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...props}
              value={value}
              onChangeText={setValue}
              cellCount={CELL_COUNT}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={({index, symbol, isFocused}) => (
                <TextInput
                  placeholder='-'
                  placeholderTextColor={Colors.charcoal}
                  autoComplete="sms-otp"
                  key={index}
                  style={[
                    styles.cell,
                    {
                      borderWidth: isFocused ? 1 : undefined,
                      borderColor: isFocused ? colors.primary : undefined,
                      color: Colors.charcoal,
                      backgroundColor: colors.secondary
                    },
                  ]}
                  onLayout={getCellOnLayoutHandler(index)}>
                  {symbol || (isFocused ? <Cursor /> : null)}
                </TextInput>
              )}
            />
            <CustomButton
              primary
              style={styles.btn}
              title={t('verify_email')}
              disabled={!value || value.length < CELL_COUNT}
              onPress={() => submit()}
            />
            <TouchableOpacity
              hitSlop={10}
              onPress={() => handleResendCode()}
            >
              <Text variant='bodySmall' style={[styles.resendText, {color: colors.onSurface}]}>
                {t('resend_otp')}
                <Text variant='bodyMedium' style={{color: colors.primary}}>
                  &nbsp;{t('resend')}
                </Text>
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => switchMedium()}
            >
              <Text variant='bodyMedium' style={[styles.resendText, styles.switchMediumText, {color: colors.primary}]}>
                {t(currentMedium === 'email' ? 'alt_phone' : 'alt_email')}
              </Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Loader visible={loading} />
    </SafeAreaScreen>
  )
}