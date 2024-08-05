/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { useTheme } from 'react-native-paper'
import SkeletonPlaceholder from 'react-native-skeleton-placeholder'

export function ListHeaderPlaceholder() {
  return (
    <View style={styles.listHeaderView}>
      <SkeletonPlaceholder>
        <View style={[styles.otherDetails]}>
          <View style={styles.addressText} />
          <View style={styles.addressText} />
        </View>
      </SkeletonPlaceholder>
    </View>
  )
}

export default function HorizontalAppointmentListPlaceholder() {
  const {colors} = useTheme()
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={styles.scrollView}
    >
      {[...new Array(6)].map((_, index) => (
        <View key={index.toString()} style={styles.placeholderContainer}>
          <View style={[styles.placeholderCard, {backgroundColor: colors.background}]}>
            <SkeletonPlaceholder>
              <View>
                <View style={styles.clientDetail}>
                  <View style={styles.imageWrapper} />
                    <View style={styles.textDetail}>
                      <View style={styles.nameText} />
                      <View style={styles.addressText} />
                    <View />
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.otherDetails}>
                  <View style={styles.detailText} />
                  <View style={styles.detailText} />
                  <View style={styles.detailText} />
                </View>
              </View>
            </SkeletonPlaceholder>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

export function VerticalAppointmentListPlaceholder() {
  const {colors} = useTheme()
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{flexGrow: 1}}
    >
      {[...new Array(8)].map((_, index) => (
        <View key={index.toString()} style={styles.placeholderContainer}>
          <View style={[styles.placeholderCardVertical, {backgroundColor: colors.background}]}>
            <SkeletonPlaceholder>
              <View>
                <View style={styles.clientDetail}>
                  <View style={styles.imageWrapper} />
                    <View style={styles.textDetail}>
                      <View style={styles.nameText} />
                      <View style={styles.addressText} />
                    <View />
                  </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.otherDetails}>
                  <View style={styles.detailText} />
                  <View style={styles.detailText} />
                  <View style={styles.detailText} />
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
  scrollView: {
    paddingBottom: 32,
    flexGrow: 1,
    paddingLeft: 24
  },
  placeholderContainer: {},
  placeholderCard: {
    width: 303,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 10
  },
  placeholderCardVertical: {
    width: '100%',
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 16
  },
  clientDetail: {
    flexDirection: 'row'
  },
  imageWrapper: {
    borderRadius: 8,
    width: 47,
    height: 47,
    marginRight: 15
  },
  textDetail: {
    justifyContent: 'space-between'
  },
  nameText: {
    width: 68,
    height: 10,
    borderRadius: 10,
    marginBottom: 20
  },
  addressText: {
    width: 120,
    height: 10,
    borderRadius: 10,
  },
  divider: {
    width: '100%',
    marginTop: 20,
    marginBottom: 15,
    height: 1
  },
  otherDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  detailText: {
    width: 68,
    height: 10,
    borderRadius: 10,
  },
  listHeaderView: {
    width: '100%',
    marginBottom: 15,
    // marginHorizontal: 24
  }
})