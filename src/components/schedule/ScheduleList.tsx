/* eslint-disable @typescript-eslint/no-use-before-define */
import { FlatList, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Schedule, ScheduleStatus } from '~types'
import dayjs from '~config/dayjs'
import { useTheme, Text, ActivityIndicator } from 'react-native-paper'
import { Colors } from '~config/colors'
import EmptySchedule from '~screens/schedule/empty'
import {EvilIcons} from '@expo/vector-icons'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { ScheduleStackScreenProps } from '~types/navigation'
import { Status } from '~types/api'

interface Props {
  dataStatus: Status
  data: Schedule[]
  refreshing: boolean
  onRefreshControl: () => void;
  handleLoadMore: () => void
}

export default function ScheduleList({
  data,
  dataStatus,
  refreshing,
  onRefreshControl,
  handleLoadMore
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation()
  const navigation = useNavigation<ScheduleStackScreenProps<'Schedule'>['navigation']>()

  function RenderItem({item}: {item: Schedule}) {
    const {schedule_date: scheduleDate, start_time: startTime, closing_time: endTime, isAvailable} = item;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('ScheduleDetail', {schedule: item})}
        style={[styles.schedule, {borderBottomColor: Colors.platinum}]}
      >
        <View>
          <Text variant='bodySmall' style={[styles.day, {color: Colors.charcoal}]}>
            {dayjs(scheduleDate, 'MMM DD, YYYY').format('dddd')}
          </Text>
          <Text variant='displaySmall' style={{color: colors.onSurface}}>
            {dayjs(scheduleDate, 'MMM DD, YYYY').format('DD MMM YYYY')}
          </Text>
        </View>
        <Text variant='bodySmall' style={{color: Colors.charcoal}}>
          {isAvailable === false ? t(`${ScheduleStatus.closed}`) : `${startTime} - ${endTime}`}
        </Text>
        <EvilIcons name='chevron-right' size={28} color={colors.onSurface} />
      </TouchableOpacity>
    )
  }

  function ListFooterComponent() {
    return (
      <View>
         {dataStatus === Status.pending && <ActivityIndicator />}
      </View>
    )
  }

  return (
    <FlatList
      style={[styles.list, {backgroundColor: colors.background}]}
      contentContainerStyle={styles.listContent}
      data={data}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      renderItem={({item}) => <RenderItem item={item}  />}
       refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshControl} />}
      ListEmptyComponent={<EmptySchedule />}
      ListFooterComponent={<ListFooterComponent />}
    />
  )
}

const styles = StyleSheet.create({
  list: {
    marginTop: 16,
  },
  listContent: {
    paddingHorizontal: 24,
    paddingVertical: 8,
    flexGrow: 1
  },
  schedule: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: .4,
    padding: 4, 
  },
  day: {
    marginBottom: 4
  },
})