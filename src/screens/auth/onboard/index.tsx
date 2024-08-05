import { ImageBackground, View } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '~components/CustomButton'
import { RootStackScreenProps } from '~types/navigation'
import {useTranslation} from 'react-i18next';
import LogoSvg from '~assets/svg/LogoSvg';
import AccountTypeModal from '~components/modals/AccountTypeModal';
import SafeAreaScreen from '~components/SafeAreaScreen';
import styles from './styles'

export default function OnboardScreen({navigation}: RootStackScreenProps<'Onboard'>) {
  const {t} = useTranslation('onboard')

  const [visible, setVisible] = useState(false)

  function toggleModal() {
    setVisible(!visible)
  }

  return (
    <View style={styles.screen}>
      <ImageBackground
        resizeMode='cover'
        style={styles.backgroundImg}
        source={require('~assets/images/welcome_bg.png')}
      >
        <SafeAreaScreen style={styles.background}>
          <LogoSvg />
          <View style={styles.btnWrapper}>
            <CustomButton
              onPress={() => navigation.navigate('Login')}
              primary
              title={t('login')}
              style={styles.loginBtn}
            />
            <CustomButton
              onPress={() => toggleModal()}
              title={t('create_account')}
              style={styles.signupBtn}
            />
          </View>
        </SafeAreaScreen>
      </ImageBackground>
      <AccountTypeModal
        visible={visible}
        close={() => toggleModal()}
      />
    </View>
  )
}

