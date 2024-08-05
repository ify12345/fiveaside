/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { ReactNode } from 'react'
import { View, StyleSheet } from 'react-native'
import { Text } from 'react-native-paper'
import { Colors } from '~config/colors'
import Feather from '@expo/vector-icons/Feather'
import AntDesign from '@expo/vector-icons/AntDesign'

type ToastProps = {
  title?: string
  message: string;
  icon?: ReactNode;
}

const toastConfig = {
  error: ({props}: {props: ToastProps}) => (
    <View style={[styles.toast, {backgroundColor: Colors.errorTint, borderColor: Colors.jasper}]}>
      {props.icon || <View style={[styles.iconWrapper, {backgroundColor: Colors.jasper}]}>
          <AntDesign name='exclamation' size={24} color={Colors.white} />
        </View>}
      <View style={styles.details}>
        {
          props.title && (
            <Text variant="bodyLarge" style={[{color: Colors.black}]}>
              {props.title}
            </Text>
          )
        }
        <Text variant="titleLarge" style={[{color: Colors.romanSilver}]}>
          {props.message}
        </Text>
      </View>
    </View>
  ),
  success: ({props}: {props: ToastProps}) => (
   <View style={[styles.toast, {backgroundColor: '#ECF2F1', borderColor: Colors.keppel}]}>
      {props.icon || <View style={[styles.iconWrapper, {backgroundColor: Colors.keppel}]}>
          <Feather name='check' size={24} color={Colors.white} />
        </View>}
      <View style={styles.details}>
        {
          props.title && (
            <Text variant="bodyLarge" style={[{color: Colors.black}]}>
              {props.title}
            </Text>
          )
        }
        <Text variant="titleLarge" style={[{color: Colors.romanSilver}]}>
          {props.message}
        </Text>
      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    width: '89%',
    borderRadius: 8,
    borderWidth: .83,
    marginTop: 10
  },
  iconWrapper: {
    width: 24,
    height: 24,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  details: {
    marginLeft: 8
  }
})

export default toastConfig