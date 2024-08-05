/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle} from 'react-native'
import React from 'react'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import { useTheme, Text } from 'react-native-paper';

type Props = {
  value?: string;
  onPress: () => void;
  title: string;
  style?: StyleProp<ViewStyle>
}

export default function FilterDatePicker({
  value,
  onPress,
  title,
  style
}: Props) {
  const {colors} = useTheme()
  return (
   <TouchableOpacity
    style={[styles.picker, {borderColor: colors.primary}, style]}
    onPress={onPress}
  >
    <Text variant='titleSmall' style={[{color: colors.onSurface}]}>
      {value || title}
    </Text>
    <MaterialCommunityIcons name='calendar-month' size={16} color={colors.primary} />
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 4,
    borderWidth: .4,
    padding: 4,
  }
})