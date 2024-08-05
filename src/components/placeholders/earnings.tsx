/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { Colors } from "~config/colors"

export default function EarningsListPlaceholder() {
  const {colors} = useTheme()
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{flexGrow: 1}}
    >
      <View style={styles.listHeaderView}>
        <SkeletonPlaceholder>
          <View style={[styles.otherDetails]}>
            <View style={styles.addressText} />   
            <View style={styles.selector} />
          </View>
        </SkeletonPlaceholder>
      </View>
      {[...new Array(8)].map((_, index) => (
        <View key={index.toString()} style={styles.placeholderContainer}>
          <View style={[styles.placeholderCardVertical, {backgroundColor: colors.background, borderColor: Colors.platinum}]}>
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                <View style={styles.details}>
                  <View style={styles.nameText} />
                  <View style={styles.addressText} />
                </View>
                <View style={styles.nameText} />
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
  placeholderCardVertical: {
    borderWidth: .5,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16
  },
  details: {
    // flexDirection: 'row'
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
    width: '100%',
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
  },
  selector: {
    width: 78,
    height: 18,
    borderRadius: 4
  }
})