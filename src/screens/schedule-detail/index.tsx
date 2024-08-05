import { FlatList, RefreshControl, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
// import CustomHeader from '~components/CustomHeader'
import { useTheme, Text, Switch, ActivityIndicator } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { ScheduleStackScreenProps } from '~types/navigation'
import { Colors } from '~config/colors'
import {Feather} from '@expo/vector-icons'
import dayjs from '~config/dayjs'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { cleanHomeServiceSchedules, cleanTimeslots, cleanWalkInSchedules } from '~redux/reducers/schedule'
import { getHomeServiceSchedules, getScheduleTimerOptions, getTimeslots, getWalkInSchedules, toggleScheduleDate } from '~api/schedule'
import TimeSlot from '~components/schedule/TimeSlot'
import { Status } from '~types/api'
import {CopilotProvider, CopilotStep, useCopilot, walkthroughable} from 'react-native-copilot'
import CustomToolTip from '~components/CustomToolTip'
import BackIconSvg from '~assets/svg/BackIconSvg'
import { completeScheduleDetailCopilot } from '~redux/reducers/copilot'
import { useFocusEffect } from '@react-navigation/native'
import styles from './styles'

const WalkthroughableView = walkthroughable(View)

function ScheduleDetail({
  navigation,
  route: {
    params: {schedule}
  }
}: ScheduleStackScreenProps<'ScheduleDetail'>) {
  const {colors} = useTheme();
  const {t} = useTranslation('schedule')
  const {start: startCopilot, copilotEvents} = useCopilot()
   const {scheduleDetailCompleted} = useAppSelector((store) => store.copilot)
  const {schedule_date: scheduleDate, isAvailable,
    forHomeService
  } = schedule;
  const {timeOptionStatus} = useAppSelector((store) => store.schedule)
  const [isSwitchOn, setIsSwitchOn] = useState(isAvailable);
  const {scheduleTimeslotStatus, scheduleTimeslots: {data, currentPage, lastPage}} = useAppSelector((store) => store.schedule)
  const [refreshing, setRefreshing] = useState(false)

  const date = dayjs(scheduleDate, 'MMM DD, YYYY').format('ddd, DD MMM YYYY')

  const dispatch = useAppDispatch()
   useEffect(() => {
      if (timeOptionStatus !== Status.success) {
        dispatch(getScheduleTimerOptions())
      }
    }, [])

  useEffect(() => {
    const listener = () => {
      // Copilot tutorial finished!
      dispatch(completeScheduleDetailCopilot())
    };

    copilotEvents.on("stop", listener);

    return () => {
      copilotEvents.off("stop", listener)
    };
  }, [])

  // console.log(scheduleDate)
  const searchDate = dayjs(scheduleDate, 'MMM DD, YYYY').format('YYYY-MM-DD')
  // useEffect(() => {
  //   dispatch(cleanTimeslots())
  //   dispatch(getTimeslots({page: 1, search: searchDate, homeService: forHomeService ? 1 : 0}))
  // }, [schedule])

  useFocusEffect(
    React.useCallback(() => {
      dispatch(cleanTimeslots())
      dispatch(getTimeslots({page: 1, search: searchDate, homeService: forHomeService ? 1 : 0}))
    }, [schedule])
  );
  
  // useEffect(() => {
  //   dispatch(getUpdateScheduleDetails({
  //     schedule_id: scheduleId,
  //     schedule_date: dayjs(scheduleDate, 'MMM DD, YYYY').format('YYYY-MM-DD'),
  //     start_time: dayjs(startTime, 'hh:mm A').format('HH:mm'),
  //     end_time: dayjs(endTime, 'hh:mm A').format('HH:mm'),
  //     is_available: isAvailable,
  //     for_home_service: forHomeService,
  //     time_slots: breaks
  //   }))
  // }, [schedule])

  function onToggleSwitch(){
    dispatch(toggleScheduleDate({
      schedule_date: dayjs(scheduleDate, 'MMM DD, YYYY').format('YYYY-MM-DD'),
      is_available: !isSwitchOn
    }))
    .unwrap()
    .then(() => {
      if (schedule.forHomeService) {
        dispatch(cleanHomeServiceSchedules())
        dispatch(getHomeServiceSchedules({}))
      } else {
        dispatch(cleanWalkInSchedules())
        dispatch(getWalkInSchedules({}))
      }
    })
    setIsSwitchOn(!isSwitchOn)
  }

  // function handleToggleSwitch() {
    
  //   if (scheduleDetailCompleted) {
  //     onToggleSwitch()
  //   } else {
  //     startCopilot()
  //   }
  // }

  const onLeftIconPressed = () => {
    navigation.goBack()
    // dispatch(cleanScheduleUpdate())
  }

  const refresh = () => {
    setRefreshing(true)
    dispatch(cleanTimeslots())
    dispatch(getTimeslots({page: 1, search: searchDate, homeService: forHomeService ? 1 : 0}))
    .unwrap()
    .then(() => {
      setRefreshing(false)
    })
    .catch(() => {
      setRefreshing(false)
    })
  }

  const loadMore = () => {
    dispatch(getTimeslots({page: currentPage + 1, search: searchDate, homeService: forHomeService ? 1 : 0}))
  }

  function ListFooterComponent() {
    return (
      <View>
        {scheduleTimeslotStatus === Status.pending && <ActivityIndicator />}
      </View>
    )
  }

  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <View style={[styles.customHeader, {backgroundColor: colors.background}]}>
          <TouchableOpacity hitSlop={20} onPress={onLeftIconPressed}>
            <BackIconSvg />
          </TouchableOpacity>
          <Text variant='bodyLarge' style={{color: Colors.charcoal}}>
            {date}
          </Text>
          <CopilotStep
            text='Toggle off the button to indicate your off days.'
            order={1}
            name='off schedule day'
          >
            <WalkthroughableView>
              <View style={styles.switchView}>
                <Switch
                  value={isSwitchOn}
                  onValueChange={() => onToggleSwitch()}
                />
                <Text variant='titleSmall' style={{color: colors.onSurface}}>
                  {isSwitchOn ? t('open') : t('closed')}
                </Text>
              </View>
            </WalkthroughableView>
          </CopilotStep>
        </View>
        <View style={[styles.scrollContent, {backgroundColor: colors.background}]}>
          <View style={styles.header}>
            <Text variant='bodyMedium' style={[styles.breakTitle, {color: Colors.charcoal}]}>
              {t('time_slots')}
            </Text>
            <TouchableOpacity
              hitSlop={20}
              style={styles.addBtn}
              onPress={() => navigation.navigate('ScheduleBreak', {date, isHomeService: forHomeService})}
            >
              <Feather name='plus' color={colors.primary} size={16} />
              <Text variant='titleSmall' style={[styles.addText, {color: Colors.charcoal}]}>
                {t('add_break')}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList 
            data={data}
            contentContainerStyle={[{backgroundColor: colors.background}]}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.schedule_date + item.start_time + item.closing_time + item.id}
            renderItem={({item}) => <TimeSlot time_slot={item} />}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (currentPage < lastPage) {
                loadMore()
              }
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refresh()} />}
            ListFooterComponent={<ListFooterComponent />}
          />
        </View>
      </View>
    </SafeAreaScreen>
  )
}

function ScheduleDetailWithCopilot({navigation, route}: ScheduleStackScreenProps<'ScheduleDetail'>) {
  return (
    <CopilotProvider labels={{next: 'NEXT', finish: 'FINISH', skip: 'SKIP', previous: 'PREVIOUS'}} stepNumberComponent={() => (<View />)} tooltipComponent={CustomToolTip}>
      <ScheduleDetail navigation={navigation} route={route} />
    </CopilotProvider>
  );
}

export default ScheduleDetailWithCopilot