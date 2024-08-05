/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, TouchableOpacityProps, View, ViewStyle } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { useTheme, Text } from 'react-native-paper';
import Spinner from '~components/Spinner';
import { Colors } from '~config/colors';
import GoogleSvg from '~assets/svg/GoogleSvg';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  titleStyle?: StyleProp<TextStyle>;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  primary?: boolean;
  isGoogleBtn?: boolean;
}

type DisabledStyleProps = {
  opacity: number;
}

export default function CustomButton({
  onPress,
  disabled,
  loading,
  title,
  titleStyle,
  style,
  primary = false,
  isGoogleBtn = false
}: ButtonProps) {
  const {colors} = useTheme()

  const disabledStyle: DisabledStyleProps = {
    opacity: 0.7,
  }

  const buttonDisabled = !!(disabled || loading);
  const buttonDisabledStyle = disabled || loading ? disabledStyle : null;

  const renderSpinnerOrText = () => {
    if (loading) {
      return <Spinner color={primary || isGoogleBtn ? colors.onPrimaryContainer : colors.primary} size={18} animating={loading} />
    }
    let textColor = ''
    if (disabled) {
      textColor = colors.onSurfaceDisabled
    } else if (primary) {
      textColor = colors.onPrimaryContainer
    } else if (isGoogleBtn) {
      textColor = colors.onPrimaryContainer
    } else {
      textColor = colors.onSecondaryContainer
    }
    return (
      <Text
        variant='labelLarge'
        style={[styles.text, {color: textColor}, titleStyle]}
      >
        {title}
      </Text>
    )
  }

  function RenderButton() {
    if (primary) {
      return (
        <LinearGradient
            colors={['#856445', '#987952']}
            style={[styles.button, buttonDisabledStyle, style]}
        >
          <TouchableOpacity
            onPress={onPress}
            disabled={buttonDisabled}
          >
            <View style={styles.content}>
              {renderSpinnerOrText()}
            </View>
          </TouchableOpacity>
        </LinearGradient>
      )
    } 
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={buttonDisabled}
        style={[styles.button, {backgroundColor: isGoogleBtn ? Colors.black : colors.secondaryContainer}, buttonDisabledStyle, style]}
      >
        <View style={styles.content}>
          {isGoogleBtn && !loading && <GoogleSvg style={{marginRight: 8}} />}
          {renderSpinnerOrText()}
        </View>
      </TouchableOpacity>
    )
    
  }

   
    return (
      <>
        {RenderButton()}
      </>
    )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    borderRadius: 5
  },
  content: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 13,
  },
  text: {
    fontSize: 16
  }
})