import { TextInput, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { Colors } from '~config/colors'
import { HomeStackScreenProps } from '~types/navigation'
import CustomHeader from '~components/CustomHeader'
import {AntDesign} from '@expo/vector-icons'
import AppointmentList from '~components/appointment/AppointmentList'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status } from '~types/api'
import { getUpcomingAppointments } from '~api/appointment'
import { VerticalAppointmentListPlaceholder } from '~components/placeholders/appointments'
import styles from './styles'

export default function BookedAppointments({navigation}: HomeStackScreenProps<'BookedAppointments'>) {
  const {colors} = useTheme()
  const {t} = useTranslation('appointment')
  const {upcomingAppointmentStatus, upcomingAppointments: {currentPage, lastPage, data}} = useAppSelector((store) => store.appointment)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)

  const appointmentsLoading = upcomingAppointmentStatus !== Status.success
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (appointmentsLoading) {
      dispatch(getUpcomingAppointments({}))
    }
  }, [])

  useEffect(() => {
    if (searchValue) {
      setFirstLoaded(false)
      dispatch(getUpcomingAppointments({search: searchValue}))
    }
  }, [searchValue])

  function refreshAppointments() {
    setRefreshing(true)
    setFirstLoaded(false)
    dispatch(getUpcomingAppointments({}))
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
      dispatch(getUpcomingAppointments({page: currentPage + 1, search: searchValue}))
    }
  }
  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('upcoming_appointments')}
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
              <AppointmentList
                data={data}
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