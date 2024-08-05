/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export default function NotificationListPlaceholder() {
  const {colors} = useTheme()
  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.scrollView}
    >
      <SkeletonPlaceholder>
        <View style={styles.date} />
      </SkeletonPlaceholder>
      {[...new Array(6)].map((_, index) => (
        <View key={index.toString()} style={styles.placeholderContainer}>
          <View style={[styles.placeholderCard, {backgroundColor: colors.background}]}>
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={styles.statusIcon} />
                <View>
                  <View style={styles.subject} />
                  <View style={styles.body} />
                </View>
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  date: {
    width: 55,
    height: 10,
    borderRadius: 10,
    marginBottom: 12
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 24
  },
  placeholderContainer: {},
  placeholderCard: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 8,
    marginBottom: 10
  },
  statusIcon: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8
  },
  subject: {
    width: 116,
    height: 10,
    borderRadius: 10,
    marginBottom: 8
  },
  body: {
    width: 246,
    height: 10,
    borderRadius: 10,
  }
})