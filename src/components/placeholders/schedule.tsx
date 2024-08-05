/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/no-array-index-key */
import React from "react"
import { ScrollView, StyleSheet, View } from "react-native"
import { useTheme } from "react-native-paper"
import SkeletonPlaceholder from "react-native-skeleton-placeholder"
import { Colors } from "~config/colors"

export default function ScheduleListPlaceholder() {
  const {colors} = useTheme()
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={{marginTop: 16}}
      contentContainerStyle={[styles.scrollView, {backgroundColor: colors.background}]}
    >
      {[...new Array(8)].map((_, index) => (
        <View key={index.toString()} style={styles.placeholderContainer}>
          <View style={[styles.placeholderCard, {borderBottomColor: Colors.platinum}]}>
            <SkeletonPlaceholder>
              <View style={{flexDirection: 'row', justifyContent: 'space-between', alignContent: 'center', alignItems: 'center', width: '100%'}}>
                <View>
                  <View style={styles.dateText} />
                  <View style={styles.dateText} />
                </View>
                <View style={styles.timeText} />
                <View style={styles.icon} />
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
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexGrow: 1
  },
  placeholderContainer: {},
  placeholderCard: {
    width: '100%',
    
    // flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: .4,
    padding: 4,
  },
  dateText: {
    width: 120,
    height: 10,
    borderRadius: 10,
    marginBottom: 10
  },
  timeText: {
    width: 60,
    height: 10,
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 10,
    borderRadius: 10
  }
})