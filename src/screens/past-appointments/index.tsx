import { TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Colors } from '~config/colors'
import { HomeStackScreenProps } from '~types/navigation'
import CustomHeader from '~components/CustomHeader'
import {AntDesign} from '@expo/vector-icons'
import { Appointment } from '~types'
import SectionedAppointmentList from '~components/appointment/SectionedAppointmentList'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status } from '~types/api'
import { getPastAppointments } from '~api/appointment'
import { VerticalAppointmentListPlaceholder } from '~components/placeholders/appointments'
import dayjs from '~config/dayjs'
import styles from '../booked-appointments/styles'

export default function PastAppointments({navigation}: HomeStackScreenProps<'PastAppointments'>) {
  const {colors} = useTheme()
  const {t} = useTranslation('appointment')
  const {pastAppointmentStatus, pastAppointments: {currentPage, lastPage, data}} = useAppSelector((store) => store.appointment)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const appointmentsLoading = pastAppointmentStatus !== Status.success
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (appointmentsLoading) {
      dispatch(getPastAppointments({}))
    }
  }, [])

  useEffect(() => {
    if (searchValue) {
      setFirstLoaded(false)
      dispatch(getPastAppointments({search: searchValue}))
    }
  }, [searchValue])

  function refreshAppointments() {
    setRefreshing(true)
    setFirstLoaded(false)
    dispatch(getPastAppointments({}))
    .unwrap()
    .then(() => {
      setRefreshing(false)
    })
    .catch(() => {
      setRefreshing(false)
    })
  }

  function loadMore() {
    setFirstLoaded(true)
    if(currentPage < lastPage) {
      dispatch(getPastAppointments({page: currentPage + 1, search: searchValue}))
    }
  }
  
  const sectionedData : {title: string; data: Appointment[]}[] = []

  data?.forEach(appointment => {
    const {startTime} = appointment
    const formattedDate = dayjs(startTime, 'MM/DD/YYYY hh:mm A', 'en').format('YYYY-MM-DD')
    const existingTitle = sectionedData.find(a => a.title === formattedDate);
    if (existingTitle) {
      const index = sectionedData.indexOf(existingTitle)
      sectionedData[index].data?.push(appointment)
    } else {
      const newData = {title: formattedDate, data: [appointment]}
      sectionedData.push(newData)
    }
  })

  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('past_appointments')}
          onLeftIconPressed={() => navigation.goBack()}
        />
        {
          data.length !== 0 || searchValue !== undefined && (
            <View style={[styles.searchBar, {backgroundColor: colors.background, borderColor: Colors.platinum}]}>
              <AntDesign name='search1' size={16} color={colors.onSurface} />
              <TextInput
                placeholder={t('search_client')}
                value={searchValue}
                onChangeText={val => setSearchValue(val)}
                style={[styles.searchInput, {color: colors.primary}]}
                placeholderTextColor={colors.onSurface}
                autoCapitalize='none'
                autoCorrect={false}
                autoComplete='off'
              />
            </View>
          )
        }
        <View style={styles.listView}>
          {
            appointmentsLoading && !firstLoaded ? <VerticalAppointmentListPlaceholder /> : (
              <SectionedAppointmentList
                data={sectionedData}
                refreshing={refreshing}
                onRefreshControl={() => refreshAppointments()}
                handleLoadMore={() => loadMore()}
                setFirstLoaded={setFirstLoaded}
              />
            )
          }
        </View>
      </View>
    </SafeAreaScreen>
  )
}