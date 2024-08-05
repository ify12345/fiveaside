/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { getCreateBreakDetails } from '~redux/reducers/schedule'
import Picker from './picker'

interface Props {
  startTime: string
  endTime: string
}

export default function ScrollTimePicker({startTime, endTime}: Props) {
  const [startSelected, setStartSelected] = useState(0)
  const [endSelected, setEndSelected] = useState(0)
  const {timeOptions} = useAppSelector((store) => store.schedule)

  useEffect(() => {
    const startTimeIndex = timeOptions.findIndex(time => time === startTime)
    setStartSelected(startTimeIndex)
  }, [startTime])

  useEffect(() => {
    const endTimeIndex = timeOptions.findIndex(time => time === endTime)
    setEndSelected(endTimeIndex)
  }, [endTime])

  const dispatch = useAppDispatch()
    const updateStartTime = (time: string) => {
      dispatch(getCreateBreakDetails({startTime: time}))
    }

    const updateEndTime = (time: string) => {
      dispatch(getCreateBreakDetails({endTime: time}))
    }
  
  return (
    <View style={styles.pickerView}>
      <Picker selected={startSelected} updateTime={updateStartTime}  />
      <Picker selected={endSelected} updateTime={updateEndTime} />
    </View>
  )
}

const styles = StyleSheet.create({
  pickerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 35
  }
})