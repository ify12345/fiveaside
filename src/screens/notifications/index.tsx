import { RefreshControl, SectionList, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import CustomHeader from '~components/CustomHeader'
import { HomeStackScreenProps } from '~types/navigation'
import { useTheme, Text } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import {Notification} from '~types'
import { Colors } from '~config/colors'
import dayjs from '~config/dayjs'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status } from '~types/api'
import { getNotifications } from '~api/notification'
import NotificationListPlaceholder from '~components/placeholders/notification'
import styles from './styles'
import EmptyNotifications from './empty'

export default function Notifications({navigation}: HomeStackScreenProps<'Notifications'>) {
  const {colors} = useTheme()
  const {t} = useTranslation('notification')
  const {currentPage, lastPage, loading, data} = useAppSelector((store) => store.notification)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const notificationLoading = loading !== Status.success
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (notificationLoading) {
      dispatch(getNotifications({}))
    }
  }, [])

  const sectionedData : {title: string; data: Notification[]}[] = []

  data?.forEach(notification => {
    const {createdAt} = notification
    const formattedDate = dayjs(createdAt, 'DD MMM YYYY hh:mm A', 'en').format('YYYY-MM-DD')
    const existingTitle = sectionedData.find(a => a.title === formattedDate);
    if (existingTitle) {
      const index = sectionedData.indexOf(existingTitle)
      sectionedData[index].data?.push(notification)
    } else {
      const newData = {title: formattedDate, data: [notification]}
      sectionedData.push(newData)
    }
  })

  function refresh() {
    setRefreshing(true)
    setFirstLoaded(false)
    dispatch(getNotifications({}))
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
      dispatch(getNotifications({page: currentPage + 1}))
    }
  }

  function RenderSectionHeader({title}: {title: string}) {
    return (
      <Text variant='titleSmall' style={styles.sectionHeader}>
        {dayjs(title).isToday() ? t('today', {ns: 'appointment'}) : dayjs(title).format('ddd, D MMM')}
      </Text>
    )
  }

  function RenderItem({item}: {item: Notification}) {
    const {body, subject} = item;
    return (
      <View style={[styles.card, {backgroundColor: colors.background}]}>
        <View style={[styles.statusIcon, {backgroundColor: colors.primary}]} />
        <View>
          <Text variant='bodyMedium' style={{color: Colors.charcoal}}>
            {subject}
          </Text>
          <Text variant='displayMedium' style={{color: colors.onSurface}}>
            {body}
          </Text>
        </View>
      </View>
    )
  }
  
  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('notifications')}
          onLeftIconPressed={() => navigation.goBack()}
        />
        {
          notificationLoading && !firstLoaded ? <NotificationListPlaceholder /> : (
            <SectionList
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
              sections={sectionedData}
              keyExtractor={item => item.id.toString()}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (currentPage < lastPage) {
                  loadMore()
                }
              }}
              renderSectionHeader={(({section : {title}}) => (<RenderSectionHeader title={title} />))}
              renderItem={({item}) => <RenderItem item={item} />}
              ListEmptyComponent={<EmptyNotifications />}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refresh()} />}
            /> 
          )
        }
      </View>
    </SafeAreaScreen>
  )
}