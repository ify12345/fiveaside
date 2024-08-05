import { View } from 'react-native'
import React from 'react'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import BrandingImageSvg from '~assets/svg/BrandingImageSvg'
import { Colors } from '~config/colors'
import CustomButton from '~components/CustomButton'
import styles from './styles'

type Props = {
  onBtnPress: () => void;
}

export default function Empty({
  onBtnPress
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('branding')
  
  return (
    <View style={styles.content}>
      <BrandingImageSvg />
      <Text variant='bodyLarge' style={[styles.title, {color: Colors.charcoal}]}>
        {t('no_image')}
      </Text>
      <Text variant='displaySmall' style={{color: colors.onSurface}}>
        {t('no_image_desc')}
      </Text>
      <CustomButton
        primary
        title={t('upload_images')}
        style={styles.btn}
        onPress={onBtnPress}
      />
    </View>
  )
}