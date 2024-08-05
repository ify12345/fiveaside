/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-use-before-define */
import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
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

export function ListPlaceholder() {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      contentContainerStyle={{flexGrow: 1}}
    >
      <View style={{flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap', paddingHorizontal: 24}}>
        {[...new Array(30)].map((_, index) => (
          <View key={index.toString()} style={{marginVertical: 16}}>
            <SkeletonPlaceholder>
              <View style={{width: 100, height: 100}} />
            </SkeletonPlaceholder>
          </View>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollView: {
    paddingBottom: 32,
    flexGrow: 1,
    paddingLeft: 24
  },
  placeholderContainer: {
    flexDirection: 'row'
  },
  placeholderCard: {
    width: 303,
    borderRadius: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginRight: 10
  },
  placeholderCardVertical: {
    width: '50%',
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