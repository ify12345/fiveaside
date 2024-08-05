/* eslint-disable @typescript-eslint/no-use-before-define */
import { FlatList, Modal, RefreshControl, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { SetStateAction, useEffect, useState } from 'react'
import CloseSvg from '~assets/svg/CloseSvg'
import { Colors } from '~config/colors'
import { useTheme, Text, ActivityIndicator } from 'react-native-paper'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status } from '~types/api'
import { getBanks } from '~api/payment'
import { cleanBanks } from '~redux/reducers/bank'
import { useTranslation } from 'react-i18next'

type Props = {
  visible: boolean
  close: () => void;
  selected: number | null | undefined;
  setSelected: (number: SetStateAction<number | undefined>) => void
}

export default function BanksModal({
  visible,
  close,
  selected,
  setSelected
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('payment')
  const {currentPage, lastPage, loading, data} = useAppSelector((store) => store.bank)
  const [refreshing, setRefreshing] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [firstLoaded, setFirstLoaded] = useState(false)

  const banksLoading = loading !== Status.success
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (banksLoading) {
      dispatch(getBanks({}))
    }
  }, [])

  function handleClose() {
    close()
  }

  function handleSelect(id: number) {
    setSelected(id)
    close()
  }

  function refresh() {
    setRefreshing(true)
    setFirstLoaded(false)
    dispatch(cleanBanks())
    dispatch(getBanks({}))
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
    dispatch(getBanks({page: currentPage + 1}))
  }

  function ListFooterComponent() {
    return (
      <View>
        {loading === Status.pending && <ActivityIndicator />}
      </View>
    )
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
          <TouchableOpacity
            onPress={() => handleClose()}
            hitSlop={20}
            style={styles.btn}
          >
            <CloseSvg  />
          </TouchableOpacity>
          <Text variant='labelLarge' style={[styles.title, {color: Colors.charcoal}]}>
            {t('select_bank')}
          </Text>
          <FlatList
            data={data}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.5}
            onEndReached={() => {
              if (currentPage < lastPage) {
                loadMore()
              }
            }}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refresh()} />}
            ListFooterComponent={<ListFooterComponent />}
            renderItem={({item}) => {
              const {name, id} = item
              const isSelected = id === selected
              return (
                <TouchableOpacity
                  onPress={()=> handleSelect(id)}
                  style={[styles.bank, {backgroundColor: isSelected ? colors.tertiary : undefined}]}
                >
                  <Text variant='bodyLarge'>
                    {name}
                  </Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Colors.backDrop,
    flex: 1,
    flexDirection: 'column-reverse',
  },
  modalContent: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 24,
    paddingBottom: 16,
    paddingHorizontal: 24,
    width: '100%',
    flex: 0.55
  },
  btn: {
    alignSelf: 'flex-end'
  },
  title: {
    marginTop: 16,
    marginBottom: 40
  },
  bank: {
    marginBottom: 5,
    padding: 16
  }
})