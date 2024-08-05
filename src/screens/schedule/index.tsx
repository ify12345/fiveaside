import { TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import CustomHeader from '~components/CustomHeader'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { ScheduleStackScreenProps } from '~types/navigation'
import {Feather, Entypo} from '@expo/vector-icons'
import CalendarComponent from '~components/Calendar'
import dayjs from '~config/dayjs'
import { Service } from '~types'
import ScheduleList from '~components/schedule/ScheduleList'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status } from '~types/api'
import { getHomeServiceSchedules, getWalkInSchedules } from '~api/schedule'
import ScheduleListPlaceholder from '~components/placeholders/schedule'
import { cleanHomeServiceSchedules, cleanWalkInSchedules } from '~redux/reducers/schedule'
import { walkthroughable, useCopilot, CopilotStep, CopilotProvider } from 'react-native-copilot'
import CustomToolTip from '~components/CustomToolTip'
import { completeCreateScheduleCopilot } from '~redux/reducers/copilot'
import styles from './styles'

const WalkthroughableView = walkthroughable(View)

function Schedule({navigation}: ScheduleStackScreenProps<'Schedule'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['schedule', 'drawer'])
  const {start: startCopilot, copilotEvents} = useCopilot()
  const {createScheduleCompleted} = useAppSelector((store) => store.copilot)
  const {user: {doesHomeService}} = useAppSelector((store) => store.auth)
  const {
    walkInScheduleStatus, walkInSchedules: {data: walkInData, currentPage: walkInCurrentPage, lastPage: walkInLastPage},
    homeServiceScheduleStatus, homeServiceSchedules: {data: homeServiceData, currentPage: homeServiceCurrentPage, lastPage: homeServiceLastPage}
  } = useAppSelector((store) => store.schedule)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const [date, setDate] = useState<Date >()
  const [activeTab, setActiveTab] = useState<Service>('walk_in')

  const walkInSchedulesLoading = walkInScheduleStatus !== Status.success
  const homeServiceSchedulesLoading = homeServiceScheduleStatus !== Status.success

  useEffect(() => {
    setActiveTab('walk_in')
  }, [doesHomeService])
  
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (walkInSchedulesLoading) {
      dispatch(getWalkInSchedules({}))
    }
    if (doesHomeService && homeServiceSchedulesLoading) {
      dispatch(getHomeServiceSchedules({}))
    }
  }, [])

  useEffect(() => {
    const listener = () => {
      // Copilot tutorial finished!
      dispatch(completeCreateScheduleCopilot())
    };

    copilotEvents.on("stop", listener);

    return () => {
      copilotEvents.off("stop", listener)
    };
  }, [])

  const handleCreateSchedule = () => {
    navigation.navigate('CreateSchedule', {service: activeTab, date: date ? dayjs(date).format('YYYY-MM-DD') : undefined})
    // if (createScheduleCompleted) {
    //   navigation.navigate('CreateSchedule', {service: activeTab, date: date ? dayjs(date).format('YYYY-MM-DD') : undefined})
    // } else {
    //   startCopilot()
    // }
  }

  function refreshWalkInSchedules() {
    setRefreshing(true)
    setFirstLoaded(false)
    dispatch(cleanWalkInSchedules())
    dispatch(getWalkInSchedules({
      search: date ? dayjs(date).format('YYYY-MM-DD') : ''
    }))
    .unwrap()
    .then(() => {
      setRefreshing(false)
    })
    .catch(() => {
      setRefreshing(false)
    })
  }

  function refreshHomeServiceSchedules() {
    setRefreshing(true)
    setFirstLoaded(false)
    dispatch(cleanHomeServiceSchedules())
    dispatch(getHomeServiceSchedules({
      search: date ? dayjs(date).format('YYYY-MM-DD') : ''
    }))
    .unwrap()
    .then(() => {
      setRefreshing(false)
    })
    .catch(() => {
      setRefreshing(false)
    })
  }

  function loadMoreWalkInSchedules() {
    setFirstLoaded(true)
    if(walkInCurrentPage < walkInLastPage) {
      dispatch(getWalkInSchedules({
        page: walkInCurrentPage + 1,
        search: date ? dayjs(date).format('YYYY-MM-DD') : ''
      }))
    }
  }

  function loadMoreHomeServiceSchedules() {
    setFirstLoaded(true)
    if(homeServiceCurrentPage < homeServiceLastPage) {
      dispatch(getHomeServiceSchedules({
        page: homeServiceCurrentPage + 1,
        search: date ? dayjs(date).format('YYYY-MM-DD') : ''
      }))
    }
  }

  function filterByDate() {
    let formattedDate = ''
    if (date) {
      formattedDate = dayjs(date).format('YYYY-MM-DD')
    }
    setFirstLoaded(false)
    dispatch(cleanWalkInSchedules())
    dispatch(cleanHomeServiceSchedules())
    dispatch(getWalkInSchedules({search: formattedDate}))
    dispatch(getHomeServiceSchedules({search: formattedDate}))
  }

  useEffect(() => {
    filterByDate()
  }, [date])

  function handleDateSelect({dateVal}: {dateVal: Date | undefined}) {
    if (!date) {
      setDate(dateVal)
    } else if (dayjs(dateVal).isSame(date, 'day')) {
      setDate(undefined)
    } else {
      setDate(dateVal)
    }
  }

  const activeTabStyle = {
    backgroundColor: colors.primaryContainer,
  }

  const inActiveTabStyle = {
    backgroundColor: colors.background,
    borderWidth: .4,
  }

  function switchTab({tab}: {tab: Service}) {
    setActiveTab(tab)
  }

  function Tab({title}: {title: Service}) {
    return (
      <TouchableOpacity
        onPress={() => switchTab({tab: title})}
        style={[styles.tab, activeTab === title ? activeTabStyle : inActiveTabStyle]}
      >
        <Text variant='titleSmall' style={{color: activeTab === title ? colors.onPrimaryContainer : colors.primary}}>
          {t(title === 'home_service' ? 'concierge' : title)}
        </Text>
      </TouchableOpacity>
    )
  }

  function TopTab() {
    return (
      <View style={styles.tabView}>
        <Tab title='home_service' />
        <Tab title='walk_in' />
      </View>
    )
  }
  
  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('schedule', {ns: 'drawer'})}
          leftIcon={<Feather name='menu' size={24} color={colors.onSurface} />}
          onLeftIconPressed={() => navigation.openDrawer()}
        />
        {
          doesHomeService && <TopTab />
        }
        <CalendarComponent
          value={date}
          setValue={(val) => handleDateSelect({dateVal: val})}
          minDate={new Date()}
        />
        {
          activeTab === 'home_service' && doesHomeService && (
            homeServiceSchedulesLoading && !firstLoaded ? <ScheduleListPlaceholder /> :  (
              <ScheduleList
                dataStatus={homeServiceScheduleStatus}
                data={homeServiceData}
                refreshing={refreshing}
                onRefreshControl={() => refreshHomeServiceSchedules()}
                handleLoadMore={() => loadMoreHomeServiceSchedules()}
              />
            )
          )
        }
        {
          activeTab === 'walk_in' && (
            walkInSchedulesLoading && !firstLoaded ? <ScheduleListPlaceholder /> : (
              <ScheduleList
                dataStatus={walkInScheduleStatus}
                data={walkInData}
                refreshing={refreshing}
                onRefreshControl={() => refreshWalkInSchedules()}
                handleLoadMore={() => loadMoreWalkInSchedules()}
              />
            )
          )
        }
        <CopilotStep
          text='Tap here to setup your availability.'
          order={1}
          name='create schedule'
        >
          <WalkthroughableView>
            <TouchableOpacity
              onPress={() => handleCreateSchedule()}
              style={[styles.fab, {backgroundColor: colors.primary}]}
            >
              <Entypo name='plus' size={20} color={colors.onPrimaryContainer} />
            </TouchableOpacity>
          </WalkthroughableView>
        </CopilotStep>
        
      </View>
    </SafeAreaScreen>
  )
}

export default function ScheduleWithCopilot({navigation, route}: ScheduleStackScreenProps<'Schedule'>) {
  return (
    <CopilotProvider labels={{next: 'NEXT', finish: 'FINISH', skip: 'SKIP', previous: 'PREVIOUS'}} stepNumberComponent={() => (<View />)} tooltipComponent={CustomToolTip}>
      <Schedule navigation={navigation} route={route} />
    </CopilotProvider>
  );
}