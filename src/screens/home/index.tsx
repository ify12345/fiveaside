import { ImageBackground, TouchableOpacity, View, ScrollView, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme, Text } from 'react-native-paper'
import BellSvg from '~assets/svg/BellSvg'
import { HomeStackScreenProps } from '~types/navigation'
import { useTranslation } from 'react-i18next'
import { Colors } from '~config/colors'
import {Entypo, Octicons} from '@expo/vector-icons'
import CalendarSvg from '~assets/svg/CalendarSvg'
import WalletSvg from '~assets/svg/WalletSvg'
import AppointmentList from '~components/appointment/AppointmentList'
import EmptyBookingSvg from '~assets/svg/EmptyBookingSvg'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status } from '~types/api'
import { getOverview } from '~api/overview'
import dayjs from '~config/dayjs'
import TextPlaceHolder from '~components/placeholders/overview'
import { getPastAppointments, getUpcomingAppointments } from '~api/appointment'
import HorizontalAppointmentListPlaceholder, { ListHeaderPlaceholder } from '~components/placeholders/appointments'
import FilterDatePicker from '~components/FilterDatePicker'
import SelectDateModal from '~components/modals/SelectDateModal'
import * as Updates from 'expo-updates'
import EasUpdateModal from '~components/modals/EasUpdateModal'
import Toast from 'react-native-toast-message'
import { UpdateState } from '~types'
import HamburgerSvg from '~assets/svg/HamburgerSvg'
import {CopilotProvider, CopilotStep, useCopilot, walkthroughable} from 'react-native-copilot'
import { completeHomeCopilot } from '~redux/reducers/copilot'
import CustomToolTip from '~components/CustomToolTip'
import styles from './styles'

const WalkthroughableView = walkthroughable(View)

function Home({navigation}: HomeStackScreenProps<'Home'>) {
  const {colors} = useTheme()
  const {start: startCopilot, copilotEvents} = useCopilot()
  const {t} = useTranslation(['home', 'status', 'appointment', 'update'])
  const {user: {firstName}} = useAppSelector((store) => store.auth)
  const {overview, loading} = useAppSelector((store) => store.overview)
  const [refreshing] = useState(false)
  const {upcomingAppointmentStatus, upcomingAppointments, pastAppointmentStatus, pastAppointments} = useAppSelector((store) => store.appointment)
  const {homeCompleted} = useAppSelector((store) => store.copilot)

  const [start, setStart] = useState<Date | undefined>(undefined)
  const [end, setEnd] = useState<Date | undefined>(undefined)
  const [startDateModalVisible, setStartDateModalVisible] = useState(false)
  const [endDateModalVisible, setEndDateModalVisible] = useState(false)
  const [filterVisible, setFilterVisible] = useState(false)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [updateState, setUpdateState] = useState<UpdateState>()

  const overviewLoading = loading !== Status.success
  const upcomingAppointmentsLoading = upcomingAppointmentStatus !== Status.success
  const pastAppointmentsLoading = pastAppointmentStatus !== Status.success

  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync()
      if (update.isAvailable) {
        setUpdateModalVisible(true)
        setUpdateState('checking')
        const checkUpdate = await Updates.checkForUpdateAsync()
        if (checkUpdate.isAvailable) {
          setUpdateState('available')
        }
      }
    } catch (err) {
      Toast.show({
        type: 'error',
        props: {message: t('check_update_failed', {ns: 'update'})}
      })
    }
  }

  useEffect(() => {
    onFetchUpdateAsync()
  }, [])

  const dispatch = useAppDispatch()
  useEffect(() => {
    const listener = () => {
      // Copilot tutorial finished!
      dispatch(completeHomeCopilot())
    };

    copilotEvents.on("stop", listener);

    return () => {
      copilotEvents.off("stop", listener)
    };
  }, [])

  function getDates() {
    let startDate = '';
    let endDate = '';
    if (!start) {
      startDate = dayjs().subtract(30, 'days').format('YYYY-MM-DD')
    } else {
      startDate = dayjs(start).format('YYYY-MM-DD')
    }
    if (!endDate ) {
      endDate = dayjs().format('YYYY-MM-DD')
    } else {
      endDate = dayjs(end).format('YYYY-MM-DD')
    }
    return {startDate, endDate}
  }

  useEffect(() => {
    if (overviewLoading) {
      const {startDate, endDate} = getDates()
      dispatch(getOverview({
        startDate,
        endDate,
      }))
    }
    if (upcomingAppointmentsLoading) {
      dispatch(getUpcomingAppointments({}))
    }
    if (pastAppointmentsLoading) {
      dispatch(getPastAppointments({}))
    }
  }, [])

  function toggleFilter() {
    setFilterVisible(!filterVisible)
  }

  useEffect(() => {
    if (!start || !end) {
      return
    }
    const {startDate, endDate} = getDates()
    dispatch(getOverview({
      startDate,
      endDate,
    }))
    if (end) {
      toggleFilter()
    }
  }, [start, end])

  function toggleStartDateModal() {
    setStartDateModalVisible(!startDateModalVisible)
  }

  function toggleEndDateModal() {
    setEndDateModalVisible(!endDateModalVisible)
  }

  const onRefreshControl = () => {
    const {startDate, endDate} = getDates()
    dispatch(getOverview({
      startDate,
      endDate,
    }))
    dispatch(getUpcomingAppointments({}))
    dispatch(getPastAppointments({}))
  }

  const handleOpenMenu = () => {
    navigation.openDrawer()
    // if (homeCompleted) {
    //   navigation.openDrawer()
    // } else {
    //   startCopilot()
    // }
  }

  return (
    <View style={styles.screen}>
      <ImageBackground
        source={require('~assets/images/home_header_bg.png')}
        style={styles.header}
      >
          <View style={styles.headerComponent}>
            <View style={styles.rowAligned}>
              <CopilotStep
                text='Tap here to access key features of the app.'
                order={1}
                name='open menu'
              >
                <WalkthroughableView>
                  <TouchableOpacity
                    style={[styles.menu]}
                    onPress={handleOpenMenu}
                  >
                    <HamburgerSvg />
                  </TouchableOpacity>
                </WalkthroughableView>
              </CopilotStep>
              <Text variant='bodyLarge' style={{color: colors.onPrimaryContainer}}>
                {t('hi')}, {firstName}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}
              hitSlop={20}
              style={[styles.iconWrapper, {backgroundColor: colors.background}]}
            >
              <BellSvg />
            </TouchableOpacity>
          </View>
      </ImageBackground>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefreshControl} />}
        contentContainerStyle={[styles.scrollContent, {backgroundColor: colors.surface}]}
      >
        <View style={[styles.dashboard, {backgroundColor: colors.background}]}>
          <View style={styles.dashboardHeader}>
            <Text variant='bodyLarge' style={{color: Colors.charcoal}}>
              {t('overview')}
            </Text>
            <TouchableOpacity
              style={styles.filterWrapper}
              onPress={() => toggleFilter()}
            >
              <Octicons name='filter' size={16} color={colors.primary} style={styles.filterIcon} />
              <Text variant='titleSmall' style={{color: colors.primary}}>
                {t('filter')}
              </Text>
            </TouchableOpacity>
          </View>
          {
            filterVisible && (
              <View style={[styles.filterView, {backgroundColor: colors.background}]}>
                <Text variant='bodySmall' style={[styles.filterTitle, {color: Colors.black}]}>
                  {t('select_date_range')}
                </Text>
                <FilterDatePicker
                  title={t('date_from')}
                  value={start ? dayjs(start).format('YYYY-MM-DD') : start}
                  onPress={() => toggleStartDateModal()}
                  style={styles.filterPicker}
                />
                <FilterDatePicker
                  title={t('date_to')}
                  value={end ? dayjs(end).format('YYYY-MM-DD') : end}
                  onPress={() => toggleEndDateModal()}
                  style={styles.filterPicker}
                />
              </View>
            )
          }
          <View style={styles.rowAlignedSpaced}>
            <View style={[styles.card, {backgroundColor: colors.surface}]}>
              <CalendarSvg />
              {
                overviewLoading ? <TextPlaceHolder /> : (
                  <Text variant='bodyLarge' style={[styles.count, {color: Colors.charcoal}]}>
                    {overview?.totalBooked}
                  </Text>
                )
              }
              <Text style={styles.cardTitle} variant='titleSmall'>
                {t('total_booked_appointments')}
              </Text>
            </View>
            <View style={[styles.card, {backgroundColor: colors.surface}]}>
              <WalletSvg />
              {
                overviewLoading ? <TextPlaceHolder /> : (
                  <Text variant='bodyLarge' style={[styles.count, {color: Colors.charcoal}]}>
                    $ {overview?.totalEarning}
                  </Text>
                )
              }
              <TouchableOpacity
                hitSlop={20}
                onPress={() => navigation.navigate('Earnings')}
                style={styles.rowAligned}
              >
                <Text variant='titleSmall'>
                  {t('total_earnings')}
                </Text>
                <CopilotStep
                  text='Tap here to see the breakdown of your earnings.'
                  order={2}
                  name='earnings'
                >
                  <WalkthroughableView style={[styles.btnWrapper, {backgroundColor: colors.background}]}>
                    <Entypo name='chevron-small-right' color={colors.primary} size={14} />
                  </WalkthroughableView>
                </CopilotStep>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        {
          upcomingAppointmentStatus !== Status.success && (
            <>
              <View style={{marginHorizontal: 24}}>
                <ListHeaderPlaceholder />
              </View>
              <HorizontalAppointmentListPlaceholder />
            </>
          )
        }
        {
          pastAppointmentStatus !== Status.success && (
            <>
              <View style={{marginHorizontal: 24}}>
                <ListHeaderPlaceholder />
              </View>
              <HorizontalAppointmentListPlaceholder />
            </>
          )
        }
        {
          upcomingAppointments.data.length !== 0 && upcomingAppointmentStatus === Status.success && (
            <View style={styles.upcomingList}>
                <View style={styles.listHeader}>
                  <Text variant='bodyLarge' style={{color: Colors.charcoal}}>
                    {t('upcoming_appointments', {ns: 'appointment'})}
                  </Text>
                  <TouchableOpacity hitSlop={10} onPress={() => navigation.navigate('BookedAppointments')}>
                    <Text variant='titleSmall' style={{color: colors.primary}}>
                      {t('see_all')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <AppointmentList
                  horizontal
                  data={upcomingAppointments.data}
                  setFirstLoaded={() => {}}
                />
            </View>
          )
        }
        {
          pastAppointments.data.length !== 0 && pastAppointmentStatus === Status.success && (
            <View style={styles.pastList}>
                <View style={styles.listHeader}>
                  <Text variant='bodyLarge' style={{color: Colors.charcoal}}>
                    {t('past_appointments', {ns: 'appointment'})}
                  </Text>
                  <TouchableOpacity hitSlop={10} onPress={() => navigation.navigate('PastAppointments')}>
                    <Text variant='titleSmall' style={{color: colors.primary}}>
                      {t('see_all')}
                    </Text>
                  </TouchableOpacity>
                </View>
                <AppointmentList
                  horizontal
                  data={pastAppointments.data}
                  setFirstLoaded={() => {}}
                />
            </View>
          )
        }
        {
          upcomingAppointmentStatus === Status.success && pastAppointmentStatus === Status.success && upcomingAppointments.data.length === 0 && pastAppointments.data.length === 0 && (
            <View style={styles.emptySection}>
              <View style={[styles.listHeader, {paddingRight: 0}]}>
                <Text variant='bodyLarge' style={{color: Colors.charcoal}}>
                  {t('upcoming_appointments', {ns: 'appointment'})}
                </Text>
                <TouchableOpacity hitSlop={10} onPress={() => navigation.navigate('BookedAppointments')}>
                  <Text variant='titleSmall' style={{color: colors.primary}}>
                    {t('see_all')}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.emptyView}>
                <EmptyBookingSvg />
                <Text variant='bodyLarge' style={[styles.emptyTitle, {color: Colors.charcoal}]}>
                  {t('no_appointment')}
                </Text>
                <Text variant='bodySmall' style={[styles.centerText, {color: colors.onSurface}]}>
                  {t('no_appointment_desc')}
                </Text>
              </View>
            </View>
          )
        }
      </ScrollView>
      <SelectDateModal
        visible={startDateModalVisible}
        close={() => toggleStartDateModal()}
        selected={start}
        setSelected={setStart}
        maxDate={end || new Date()}
      />
      <SelectDateModal
        visible={endDateModalVisible}
        close={() => toggleEndDateModal()}
        selected={end}
        setSelected={setEnd}
        minDate={start}
        maxDate={new Date()}
      />
      <EasUpdateModal
        visible={updateModalVisible}
        updateState={updateState}
        setUpdateState={setUpdateState}
      />
    </View>
  )
}

function HomeWithCopilot({navigation, route}: HomeStackScreenProps<'Home'>) {
  return (
    <CopilotProvider labels={{next: 'NEXT', finish: 'FINISH', skip: 'SKIP', previous: 'PREVIOUS'}} stepNumberComponent={() => (<View />)} tooltipComponent={CustomToolTip}>
      <Home navigation={navigation} route={route} />
    </CopilotProvider>
  );
}

export default HomeWithCopilot