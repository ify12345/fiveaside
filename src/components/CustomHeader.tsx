/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { ReactNode } from 'react'
import { useTheme , Text} from 'react-native-paper'
import BackIconSvg from '~assets/svg/BackIconSvg'
import { Colors } from '~config/colors';

interface Props {
  title: string;
  leftIcon?: ReactNode;
  onLeftIconPressed: () => void;
  rightIcon?: ReactNode;
  onRightIconPressed?: () => void;
}

export default function CustomHeader({
  title,
  leftIcon,
  onLeftIconPressed,
  rightIcon,
  onRightIconPressed
}: Props) {
  const {colors} = useTheme()

  return (
    <View style={[styles.header, {backgroundColor: colors.background}]}>
      <TouchableOpacity hitSlop={20} onPress={onLeftIconPressed}>
        {leftIcon || <BackIconSvg />}
      </TouchableOpacity>
      <Text variant='bodyLarge' style={{color: Colors.charcoal}}>
        {title}
      </Text>
      <TouchableOpacity hitSlop={20} onPress={onRightIconPressed}>
        {!rightIcon ? <View /> : rightIcon}
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingBottom: 10,
    paddingTop: 38,
    marginBottom: 24
  }
})