import React from 'react'
import { ActivityIndicator, ActivityIndicatorProps, useTheme } from 'react-native-paper'

function Spinner ({
  size = 'small',
  animating = false,
  color,
  hidesWhenStopped,
  style
}: ActivityIndicatorProps) {
  const { colors } = useTheme()
  const spinnerColor = color || colors.onPrimaryContainer
  return (
    <ActivityIndicator
      size={size}
      animating={animating}
      color={spinnerColor}
      hidesWhenStopped={hidesWhenStopped}
      style={style}
    />
  )
}

export default Spinner;