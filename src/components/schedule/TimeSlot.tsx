/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
// import { Break } from '~types'
import { Text, Switch } from 'react-native-paper'
import { Colors } from '~config/colors'
import { useAppDispatch } from '~redux/store'
import { getHomeServiceSchedules, getWalkInSchedules, toggleSchedule } from '~api/schedule'
import { cleanHomeServiceSchedules, cleanWalkInSchedules } from '~redux/reducers/schedule'
import { TimeSlotType } from '~types/apiResponse'

interface Prop {
  time_slot: TimeSlotType
}

export default function TimeSlot({time_slot}: Prop) {
  const { id,
  isAvailable,
  start_time: startTime,
  closing_time: closingTime,
  forHomeService
} = time_slot

  const [isSwitchOn, setIsSwitchOn] = useState(isAvailable);

  const dispatch = useAppDispatch()
  function toggleAvailability() {
    dispatch(toggleSchedule({
      schedule_id: id,
      is_available: !isSwitchOn
    }))
    .unwrap()
    .then(() => {
      if (forHomeService) {
        dispatch(cleanHomeServiceSchedules())
        dispatch(getHomeServiceSchedules({}))
      } else {
        dispatch(cleanWalkInSchedules())
        dispatch(getWalkInSchedules({}))
      }
    })
    setIsSwitchOn(!isSwitchOn)
  }
  
  return (
    <View style={[styles.breakView, {borderColor: Colors.platinum}]}>
      <Text variant='bodySmall' style={{color: Colors.charcoal}}>
        {startTime} - {closingTime}
      </Text>
      <Switch
        value={isSwitchOn}
        onValueChange={() => toggleAvailability()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
   breakView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: .4,
    paddingBottom: 5,
    marginBottom: 17
  }
})