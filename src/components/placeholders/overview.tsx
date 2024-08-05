/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { StyleSheet, View } from 'react-native'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export default function TextPlaceHolder() {
  return (
    <SkeletonPlaceholder>
      <View style={styles.text} />
    </SkeletonPlaceholder>
  )
}

const styles = StyleSheet.create({
  text: {
    width: 50,
    height: 10,
    borderRadius: 10,
    marginTop: 12,
    marginBottom: 4,
    alignSelf: 'center'
  }
})