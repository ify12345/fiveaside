/* eslint-disable @typescript-eslint/no-use-before-define */
import { NativeSyntheticEvent, Pressable, StyleProp, StyleSheet, TextInput, TextInputFocusEventData, TextInputProps, TouchableOpacity, View, ViewStyle } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import React, { ReactNode, useState } from 'react'
import {Ionicons, Entypo} from '@expo/vector-icons'
import { Colors } from '~config/colors';

interface Props extends TextInputProps {
  label: string;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  error?: string | boolean;
  errorMessage?: string;
  inputComponentStyle?: StyleProp<ViewStyle>;
  required?: boolean;
  password?: boolean;
  isPhoneInput?: boolean;
  countryCodeValue?: string;
  openCountryModal?: () => void;
  selectPicker?: boolean;
  rightIcon?: ReactNode;
  pickerPressed?: () => void;
}

export default function InputField({
  label,
  onBlur,
  error,
  errorMessage,
  style,
  placeholder,
  onChangeText,
  value,
  keyboardType,
  autoCapitalize,
  autoComplete,
  autoCorrect,
  autoFocus,
  inputComponentStyle,
  multiline,
  placeholderTextColor,
  editable = true,
  maxLength,
  required,
  password = false,
  isPhoneInput = false,
  countryCodeValue,
  openCountryModal,
  selectPicker = false,
  rightIcon,
  pickerPressed
}: Props) {
  const { colors } = useTheme()
  const [borderColor, setBorderColor] = useState(colors.surface)
  const [hidePassword, setHidePassword] = useState(true);

  const handleOnBlur = () => {
    setBorderColor(colors.surface)
  }

  const handlePasswordVisibility = () => {
    setHidePassword(prevState => !prevState);
  };

  return (
    <View style={[styles.inputSection, style]}>
      <View>
        <Text
          variant="bodyMedium"
          style={[styles.label, { color: errorMessage ? colors.error : colors.onSurface}]}
        >
          {label}{required && '*'}
        </Text>
      </View>
      {
        !password && !isPhoneInput && !selectPicker && (
          <View style={[styles.inputContainer, {borderColor: errorMessage ? colors.error : borderColor, backgroundColor: colors.surface }, inputComponentStyle]}>
            <TextInput
              onFocus={() => setBorderColor(colors.primary)}
              accessibilityLabel={label}
              onBlur={error ? onBlur : handleOnBlur}
              style={[styles.input, styles.inputText, {width: '100%'}]}
              cursorColor={colors.primary}
              autoCapitalize={autoCapitalize}
              onChangeText={onChangeText}
              value={value}
              autoComplete={autoComplete}
              autoCorrect={autoCorrect}
              autoFocus={autoFocus}
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor || colors.onSurface}
              multiline={multiline}
              editable={editable}
              maxLength={maxLength}
            />
          </View>
        )
      }
      {
        password && (
          <View style={[styles.inputContainer, inputComponentStyle, {borderColor: errorMessage ? colors.error : borderColor, backgroundColor: colors.surface }]}>
            <TextInput
              onFocus={() => setBorderColor(colors.primary)}
              accessibilityLabel={label}
              onBlur={error ? onBlur : handleOnBlur}
              style={[styles.input, styles.inputText]}
              cursorColor={colors.primary}
              autoCapitalize="none"
              onChangeText={onChangeText}
              value={value}
              secureTextEntry={hidePassword}
              autoFocus={autoFocus}
              keyboardType={keyboardType}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor || colors.onSurface}
              multiline={multiline}
              editable={editable}
              maxLength={maxLength}
            />
            <Pressable hitSlop={20} onPress={handlePasswordVisibility}>
              <Ionicons name={!hidePassword ? 'eye' : 'eye-off'} size={16} color={colors.onSurface}/>
            </Pressable>
          </View>
        )
      }
      {
        isPhoneInput && openCountryModal && (
          <View style={[styles.inputContainer, inputComponentStyle, {borderColor: errorMessage ? colors.error : borderColor, backgroundColor: colors.surface }]}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => openCountryModal()}
                style={{marginRight: 8, flexDirection: 'row', alignItems: 'center'}}
              >
                <Text>
                  {countryCodeValue}
                </Text>
                <Entypo name='chevron-down' size={20} color={Colors.grey6} />
              </TouchableOpacity>
              <TextInput
                onFocus={() => setBorderColor(colors.primary)}
                accessibilityLabel={label}
                onBlur={error ? onBlur : handleOnBlur}
                style={[styles.input, styles.inputText, {width: '100%'}]}
                cursorColor={colors.primary}
                autoCapitalize={autoCapitalize}
                onChangeText={onChangeText}
                value={value}
                autoComplete={autoComplete}
                autoCorrect={autoCorrect}
                autoFocus={autoFocus}
                keyboardType={keyboardType}
                placeholder={placeholder}
                placeholderTextColor={placeholderTextColor || colors.onSurface}
                multiline={multiline}
                editable={editable}
                maxLength={maxLength}
              />
            </View>
          </View>
        )
      }
      {
        selectPicker && (
          <TouchableOpacity
            onPress={pickerPressed}
            style={[styles.inputContainer, inputComponentStyle, {borderColor: errorMessage ? colors.error : borderColor, backgroundColor: colors.surface, justifyContent: 'space-between' }]}
          >
            <Text
              variant='bodySmall'
              accessibilityLabel={label}
              style={[styles.inputText]}
            >
              {value || placeholder}
            </Text>
            {rightIcon}
          </TouchableOpacity>
        )
      }
      
      {
        errorMessage && (
          <View style={styles.errorView}>
            <Text style={{color: colors.error}}>{errorMessage}</Text>
          </View>
        )
      }
    </View>
  )

}

const styles = StyleSheet.create({
  inputSection: {
    marginBottom: 24
  },
  label: {
    fontSize: 16,
    marginBottom: 2
  },
  inputContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 4,
    height: 52,
    paddingHorizontal: 8
  },
  input: {
    width: '95%',
    height: '100%',
    paddingVertical: 11
  },
  inputText: {
    fontFamily: 'Avenir-Regular',
    fontSize: 14,
    fontWeight: '400',
    color: Colors.charcoal
  },
  errorView: {
    marginTop: 5
  },
})