/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useEffect, useRef, useState } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { useTheme, Text } from "react-native-paper";
import ScrollPicker, { ScrollPickerHandle } from "react-native-wheel-scrollview-picker";
import {AntDesign} from '@expo/vector-icons'
import { useAppSelector } from "~redux/store";

type Props  = {
  selected: number;
  updateTime: (time: string) => void;
}

export default function Picker({selected, updateTime}: Props) {
   const {colors} = useTheme()
   const {timeOptions} = useAppSelector((store) => store.schedule)
    const ref = useRef<ScrollPickerHandle>(null);
    const [index, setIndex] = useState<number>();

    useEffect(() => {
     if (selected !== 0) {
      ref?.current?.scrollToTargetIndex(selected);
      setIndex(selected)
     }
      
    }, [selected])

    function makeUpdate(time: string) {
      updateTime(time)
    }

    function next(){
      if (index === timeOptions.length - 1){
        return;
      } 
      const getTimeWithIndex = timeOptions[index! + 1]
      makeUpdate(getTimeWithIndex)
    }

    function prev(){
      if (index === 0){
        return;
      } 
      const getTimeWithIndex = timeOptions[index! - 1]
      makeUpdate(getTimeWithIndex)
    }
    const disablePrev = index === 0
    const disableNext = index === timeOptions.length -1

    return (
      <View style={styles.pickerWrapper}>
        <TouchableOpacity
          hitSlop={40}
          onPress={() => prev()}
          disabled={disablePrev}
        >
          <AntDesign name='up' color={colors.onSurface} size={16} />
        </TouchableOpacity>
        <View style={styles.picker}>
          <ScrollPicker
            ref={ref}
            dataSource={timeOptions}
            selectedIndex={index}
            renderItem={(data) => (
              <Text variant='bodyMedium'>
                {data}
              </Text>
            )}
            onValueChange={(_, selectedIndex) => {
              const getTimeWithIndex = timeOptions[selectedIndex]
              makeUpdate(getTimeWithIndex)
            }}
            wrapperHeight={190}
            wrapperBackground="#FFFFFF"
            itemHeight={45}
            highlightColor={colors.primary}
            highlightBorderWidth={1}
          />
        </View>
        <TouchableOpacity
          hitSlop={40}
          onPress={() => next()}
          disabled={disableNext}
        >
          <AntDesign name='down' color={colors.onSurface} size={16} />
        </TouchableOpacity>
      </View>
    )
  }

const styles = StyleSheet.create({
  pickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35
  },
  picker: {
    width: '100%',
    paddingVertical: 30
  },
  pickerWrapper: {
    width: '30%',
    alignItems: 'center'
  }
})
