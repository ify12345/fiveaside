/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet, SectionList, RefreshControl, View } from 'react-native'
import React, { SetStateAction } from 'react'
import { Appointment } from '~types'
import {ActivityIndicator, Text} from 'react-native-paper'
import dayjs from 'dayjs';
import { Colors } from '~config/colors';
import isToday from 'dayjs/plugin/isToday'
import { useTranslation } from 'react-i18next';
import { Status } from '~types/api';
import AppointmentCard from './AppointmentCard';
import EmptyAppointments from './EmptyAppointment';

dayjs.extend(isToday) 

interface Props {
  data: {
    title: string;
    data: Appointment[]
  }[];
  horizontal?: boolean
  refreshing?: boolean
  onRefreshControl?: () => void;
  dataStatus?: Status
  handleLoadMore?: () => void
  setFirstLoaded: (boolean: SetStateAction<boolean>) => void
}

export default function SectionedAppointmentList({
  data,
  horizontal = false,
  refreshing = false,
  onRefreshControl = () => {},
  dataStatus,
  handleLoadMore = () => {},
  setFirstLoaded
}: Props) {
  const {t} = useTranslation('appointment')

  function ListFooterComponent() {
    return (
      <View>
        {dataStatus === Status.pending && <ActivityIndicator />}
      </View>
    )
  }

  return (
    <SectionList
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContentContainer}
      sections={data}
      keyExtractor={item => item.id.toString()}
      onEndReachedThreshold={0.5}
      onEndReached={handleLoadMore}
      renderSectionHeader={(({section : {title}}) => (
        <Text variant='titleSmall' style={styles.sectionHeader}>
          {dayjs(title).isToday() ? t('today', {ns: 'appointment'}) : dayjs(title).format('DD MMM YYYY')}
        </Text>
      ))}
      renderItem={({item}) => <AppointmentCard appointment={item} horizontal={horizontal} type='past' setFirstLoaded={setFirstLoaded}  />}
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
  sectionHeader: {
    marginBottom: 8,
    color: Colors.black
  }
})