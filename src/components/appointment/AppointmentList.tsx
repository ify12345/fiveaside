/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, FlatList, RefreshControl, View } from 'react-native'
import React, { SetStateAction } from 'react'
import { Appointment } from '~types'
import { Status } from '~types/api';
import { ActivityIndicator } from 'react-native-paper';
import AppointmentCard from './AppointmentCard';
import EmptyAppointments from './EmptyAppointment';

interface Props {
  data: Appointment[];
  horizontal?: boolean
  refreshing?: boolean
  onRefreshControl?: () => void;
  dataStatus?: Status
  handleLoadMore?: () => void
  setFirstLoaded: (boolean: SetStateAction<boolean>) => void
}

export default function AppointmentList({
  data,
  horizontal = false,
  refreshing = false,
  onRefreshControl = () => {},
  dataStatus,
  handleLoadMore = () => {},
  setFirstLoaded
}: Props) {

  function ListFooterComponent() {
    return (
      <View>
        {dataStatus === Status.pending && <ActivityIndicator />}
      </View>
    )
  }

  return (
    <FlatList
      horizontal={horizontal}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      bounces={!horizontal}
      contentContainerStyle={styles.listContentContainer}
      data={data}
      keyExtractor={item => item.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      renderItem={({item}) => <AppointmentCard appointment={item} horizontal={horizontal} setFirstLoaded={setFirstLoaded} type='booked'  />}
      ListEmptyComponent={<EmptyAppointments />}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshControl} />}
      ListFooterComponent={<ListFooterComponent />}
    />  
  )
}

const styles = StyleSheet.create({
  listContentContainer: {
    paddingBottom: 10,
    flexGrow: 1
  },
})