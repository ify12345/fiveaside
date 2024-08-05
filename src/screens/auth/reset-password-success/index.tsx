import { BackHandler, View} from 'react-native'
import React, { useCallback } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import SuccessSvg from '~assets/svg/SuccessSvg'
import { RootStackScreenProps } from '~types/navigation'
import CustomButton from '~components/CustomButton'
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles'

export default function ResetPasswordSuccess({
  navigation
}: RootStackScreenProps<'ResetPasswordSuccess'>) {
  const {colors} = useTheme()
  const {t} = useTranslation('success')

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

  return (
    <SafeAreaScreen style={{backgroundColor: colors.primary}}>
      <View style={styles.content}>
        <SuccessSvg />
        <Text variant='headlineLarge' style={[styles.desc, {color: colors.onPrimaryContainer}]}>
          {t('password_reset_desc')}
        </Text>
        <View style={styles.btnWrapper}>
          <CustomButton
            title={t('proceed_login')}
            style={styles.btn}
            onPress={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </SafeAreaScreen>
  )
}