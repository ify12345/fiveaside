/* eslint-disable @typescript-eslint/no-use-before-define */
import { FlatList, Modal, RefreshControl, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useTheme, Text, RadioButton, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors } from '~config/colors';
import CloseSvg from '~assets/svg/CloseSvg';
import {AntDesign} from '@expo/vector-icons'
import { Outlet } from '~types';
import { useAppDispatch, useAppSelector } from '~redux/store';
import { Status } from '~types/api';
import { getOutlets } from '~api/outlet';
import { cleanOutlets } from '~redux/reducers/outlet';

interface Props {
  visible: boolean;
  close: () => void;
  setValue: (val: string) => void
  setOutletId: (number: SetStateAction<number | undefined>) => void
}

export default function BusinessModal({
  visible,
  close,
  setValue,
  setOutletId
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'language'])
  const {loading, currentPage, lastPage, data} = useAppSelector((store) => store.outlet)
  const [selectedOutlet, setSelectedOutlet] = useState<number | undefined>(undefined)
  const [searchValue, setSearchValue] = useState<string | undefined>(undefined)
  const [firstLoaded, setFirstLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)

  const outletsLoading = loading !== Status.success

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (outletsLoading) {
      dispatch(getOutlets({}))
    }
  }, [])

  function handleClose() {
    close()
  }

  function handleSelect(outlet: Outlet) {
    setSelectedOutlet(outlet.id)
    setOutletId(outlet.id)
    setValue(outlet.outletName)
    close()
  }

  useEffect(() => {
    if (searchValue) {
      setFirstLoaded(false)
      dispatch(getOutlets({search: searchValue}))
    } else {
      dispatch(cleanOutlets())
      dispatch(getOutlets({}))
    }
  }, [searchValue])

  function refreshOutlets() {
    setRefreshing(true)
    setFirstLoaded(false)
    dispatch(cleanOutlets())
    dispatch(getOutlets({}))
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
    dispatch(getOutlets({page: currentPage + 1, search: searchValue}))
  }

  function ListFooterComponent() {
    return (
      <View>
        {loading === Status.pending && <ActivityIndicator />}
      </View>
    )
  }

  function RenderItem({outlet}: {outlet: Outlet}) {
    const {id, outletName} = outlet;
    const isCurrent = selectedOutlet === id
    return (
      <TouchableOpacity
        hitSlop={10}
        style={styles.outlet}
        onPress={() => handleSelect(outlet)}
      >
        <Text variant='bodyMedium' style={[styles.code, {color: colors.onSurface}]}>
          {outletName}
        </Text>
        <RadioButton.Android
          value={id.toString()}
          status={ isCurrent ? 'checked' : 'unchecked' }
          onPress={() => handleSelect(outlet)}
          uncheckedColor={colors.onSurface}
          color={colors.primary}
        />
      </TouchableOpacity>
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
          {
            (data.length !== 0 || searchValue !== undefined) && (
              <View style={[styles.searchView, {borderColor: Colors.platinum}]}>
                <AntDesign name='search1' size={16} color={colors.onSurface} />
                <TextInput
                  style={[styles.searchInput, {color:colors.primary}]}
                  placeholder={t('search')}
                  placeholderTextColor={colors.onSurface}
                  onChangeText={val => {
                    setSearchValue(val)
                  }}
                />
              </View>
            )
          }
          {
            outletsLoading && !firstLoaded ? <ActivityIndicator /> : ( 
                <FlatList
                  data={data}
                  keyExtractor={item => item.id.toString()}
                  showsVerticalScrollIndicator={false}
                  renderItem={({item}) => <RenderItem outlet={item} />}
                  onEndReachedThreshold={0.5}
                  contentContainerStyle={{flexGrow: 1}}
                  onEndReached={() => {
                    if (currentPage < lastPage) {
                      loadMore()
                    }
                  }}
                  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refreshOutlets()} />}
                  ListFooterComponent={<ListFooterComponent />}
                />
            )
          }
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
  searchView: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 16,
    padding: 8,
    overflow: 'hidden'
  },
  searchInput: {
    width: '100%',
    paddingLeft: 4
  },
  outlet: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16
  },
  code: {
    fontSize: 16
  }
})