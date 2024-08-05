/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {TooltipProps, useCopilot} from 'react-native-copilot'
import { useTheme, Text } from 'react-native-paper'

interface Props extends TooltipProps {

}

export default function CustomToolTip({
  labels
}: Props) {
  const {colors} = useTheme()
  const {goToNext, goToPrev, stop, currentStep, isFirstStep, isLastStep} = useCopilot()

  const handleStop = () => {
    stop();
  };
  const handleNext = () => {
    goToNext();
  };

  const handlePrev = () => {
    goToPrev();
  };

  return (
    <View style={{}}>
      <View style={styles.tooltipContainer}>
        <Text variant='bodySmall' testID="stepDescription" style={[styles.tooltipText, {color: colors.onSurface}]}>
          {currentStep?.text}
        </Text>
      </View>
      <View style={[styles.bottomBar]}>
        {!isLastStep ? (
          <TouchableOpacity hitSlop={5} onPress={handleStop}>
            <Text variant='titleSmall' style={[{color: colors.primary}]}>
              {labels.skip}</Text>
          </TouchableOpacity>
        ) : null}
        {!isFirstStep ? (
          <TouchableOpacity hitSlop={5} onPress={handlePrev}>
            <Text variant='titleSmall' style={[{color: colors.primary}]}>
              {labels.previous}
            </Text>
          </TouchableOpacity>
        ) : null}
        {!isLastStep ? (
          <TouchableOpacity style={styles.finishBtn} hitSlop={5} onPress={handleNext}>
            <Text variant='titleSmall' style={[{color: colors.primary}]}>
              {labels.next}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.finishBtn} hitSlop={5} onPress={handleStop}>
            <Text variant='titleSmall' style={[{color: colors.primary}]}>
              {labels.finish}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  tooltipContainer: {
    flex: 1,
    // backgroundColor: 'red'
  },
  tooltipText: {},
  bottomBar: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 10
  },
  finishBtn: {
    marginLeft: 50
  }
})