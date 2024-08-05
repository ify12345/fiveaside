import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native'
import React, { ReactNode } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from 'react-native-paper';

interface Props {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
})

export default function SafeAreaScreen({children, style}: Props) {
  const { top, bottom } = useSafeAreaInsets();
  const {colors} = useTheme()
  return (
    <View
      style={[styles.screen, { paddingTop: top, paddingBottom: bottom, backgroundColor: colors.background }, style]}>
      {children}
    </View>
  )
}