import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import CustomHeader from '~components/CustomHeader'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import {Feather} from '@expo/vector-icons'
import { ProfileStackScreenProps } from '~types/navigation'
import { Colors } from '~config/colors'
import LanguageModal from '~components/modals/LanguageModal'
import { useAppSelector } from '~redux/store'
import LanguageData from '~components/modals/LanguageModal/data'
import styles from './styles'
 
export default function Settings({navigation}: ProfileStackScreenProps<'Settings'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['login', 'drawer', 'language'])
  const {languageCode} = useAppSelector((state) => state.language)
  const currentLanguage = LanguageData.find(lang => lang.code === languageCode)
  // console.log(currentLanguage)

  const [langModalVisible, setLangModalVisible] = useState(false)

  function toggleLangModal() {
    setLangModalVisible(!langModalVisible)
  }

  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('settings', {ns: 'drawer'})}
          leftIcon={<Feather name='menu' size={24} color={colors.onSurface} />}
          onLeftIconPressed={() => navigation.openDrawer()}
        />
        <View style={[styles.links, {backgroundColor: colors.background}]}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ChangePassword')}
            style={[styles.link, {borderBottomColor: Colors.platinum}]}
          >
            <Text variant='bodySmall' style={{color: colors.onSurface}}>
              {t('password')}
            </Text>
            <Feather name='chevron-right' size={24} color={colors.onSurface} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => toggleLangModal()}
            style={[styles.link, {borderBottomColor: Colors.platinum}]}
          >
            <Text variant='bodySmall' style={{color: colors.onSurface}}>
              {t('language', {ns: 'language'})}
            </Text>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text variant='bodySmall' style={{color: colors.onBackground}}>
                { currentLanguage?.name ? t(currentLanguage.name, {ns: 'language'}) : 'English'}
              </Text>
              <Feather name='chevron-right' size={24} color={colors.onSurface} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <LanguageModal
        visible={langModalVisible}
        close={() => toggleLangModal()}
      />
    </SafeAreaScreen>
  )
}