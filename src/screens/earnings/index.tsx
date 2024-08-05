import { FlatList, RefreshControl, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import CustomHeader from '~components/CustomHeader'
import { useTheme, Text, ActivityIndicator } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { HomeStackScreenProps } from '~types/navigation'
import { Colors } from '~config/colors'
import DurationPicker from '~components/DurationPicker'
import dayjs from '~config/dayjs'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status } from '~types/api'
import { getEarnings } from '~api/earning'
import { Earning } from '~types'
import EarningsListPlaceholder from '~components/placeholders/earnings'
import { cleanEarnings } from '~redux/reducers/earning'
import Empty from './empty'
import styles from './styles'

export default function Earnings({navigation}: HomeStackScreenProps<'Earnings'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['earning', 'home'])
  const [duration, setDuration] = useState('month')
  const {totalEarnings, lastPage, currentPage, loading, data} = useAppSelector((store) => store.earning)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const earningsLoading = loading !== Status.success

  const dispatch = useAppDispatch()

  function getDates() {
    let startDate = '';
    const endDate = dayjs().format('YYYY-MM-DD');
    if (duration === 'today') {
      startDate = endDate
    }
    if (duration === 'week') {
      startDate = dayjs().day(0).format('YYYY-MM-DD')
    }
    if (duration === 'month') {
      startDate = dayjs().date(1).format('YYYY-MM-DD')
    }
    return {startDate, endDate}
  }

  useEffect(() => {
    if (earningsLoading) {
      const {startDate, endDate} = getDates()
      dispatch(getEarnings({
        startDate,
        endDate
      }))
    }
  }, [])

  useEffect(() => {
    setFirstLoaded(false)
    const {startDate, endDate} = getDates()
    dispatch(cleanEarnings())
    dispatch(getEarnings({
      startDate,
      endDate,
    }))
  }, [duration])

  function RenderItem({item}: {item: Earning}) {
    const {createdAt, service, price, clientName} = item;
    return (
      <View style={[styles.card, {borderColor: Colors.platinum}]}>
        <View style={styles.details}>
          <Text variant='bodyMedium' style={{color: Colors.charcoal}}>
            {clientName}
          </Text>
          <Text variant='titleSmall' style={{color: colors.onSurface}}>
            {dayjs(createdAt).format('D/MM/YYYY')}
          </Text>
        </View>
        <View style={styles.rowSpaced}>
          <Text variant='titleMedium' style={[styles.service, {color: colors.onSurface}]}>
            {service}
          </Text>
          <Text variant='bodyLarge' style={{color: colors.primary}}>
            ${price}
          </Text>
        </View>
      </View>
    )
  }

  function refresh() {
    setRefreshing(true)
    setFirstLoaded(false)
    const {startDate, endDate} = getDates()
    dispatch(cleanEarnings())
    dispatch(getEarnings({startDate, endDate}))
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
    const {startDate, endDate} = getDates()
    dispatch(getEarnings({page: currentPage + 1, startDate, endDate}))
  }

  function ListFooterComponent() {
    return (
      <View>
        {loading === Status.pending && <ActivityIndicator />}
      </View>
    )
  }
  
  return (
    <SafeAreaScreen>
      <View style={[styles.screen, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('earnings')}
          onLeftIconPressed={() => navigation.goBack()}
        />
        <View style={[styles.content, {backgroundColor: colors.background}]}>
          {
            earningsLoading && !firstLoaded ? <EarningsListPlaceholder /> : (
              <>
                <View style={styles.dashboardHeader}>
                  <View>
                    <Text variant='displaySmall' style={{color: colors.onSurface}}>
                      {t('total_earnings', {ns: 'home'})}
                    </Text>
                    <Text variant='labelLarge' style={{color: Colors.charcoal}}>
                      ${totalEarnings}
                    </Text>
                  </View>
                  <DurationPicker
                    selected={duration}
                    setSelected={setDuration}
                  />
                </View>
                <FlatList
                  data={data}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={item => item.id.toString()}
                  contentContainerStyle={styles.list}
                  onEndReachedThreshold={0.5}
                  onEndReached={() => {
                    if (currentPage < lastPage) {
                      loadMore()
                    }
                  }}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refresh()} />}
                  ListFooterComponent={<ListFooterComponent />}
                  renderItem={({item}) => <RenderItem item={item} />}
                  ListEmptyComponent={<Empty />}
                />
              </>
            )
          }
        </View>
      </View>
    </SafeAreaScreen>
  )
}