/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-use-before-define */
import { FlatList, Modal, RefreshControl, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { SetStateAction, useEffect, useState } from 'react'
import { useTheme, Text, ActivityIndicator } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors } from '~config/colors';
import CloseSvg from '~assets/svg/CloseSvg';
import {AntDesign} from '@expo/vector-icons'
import { Country } from '~types';
import { useAppDispatch } from '~redux/store';
import { getCountries } from '~api/auth';

interface Props {
  visible: boolean;
  close: () => void;
  setSelected: (value: SetStateAction<Country>) => void;
}

export default function CountryCodeModal({
  visible,
  close,
  setSelected
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('signup')
  const [loading, setLoading] = useState(false)
  const [unfilteredData, setUnfilteredData] = useState<Country[]>()
  const [countriesData, setCountriesData] = useState<Country[]>();
  const setSearchValue = useState('')[1]

  const dispatch = useAppDispatch()
  async function fetchCountries() {
    setLoading(true)
    dispatch(getCountries())
    .unwrap()
    .then(({data: {countries}}) => {
      setLoading(false)
      setCountriesData(countries)
      setUnfilteredData(countries)
    })
    .catch(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchCountries()
  }, [])

  function handleClose() {
    close()
  }

  function handleSelect(item: Country) {
    setSelected(item)
    close()
  }

  function search(val: string) {
    if (!val) {
      setCountriesData(unfilteredData)
      return;
    }
    const regex = new RegExp(`${val.toLowerCase()}`, 'i');
    const filtered = countriesData!.filter(country => regex.test(country.countryName));
    if (filtered?.length > 0) {
      setCountriesData(filtered)
    }
  }

  function refresh() {
    fetchCountries()
  }

  function RenderItem({item}: {item: Country}) {
    const {countryDialCode, countryName} = item
    return (
      <TouchableOpacity
        hitSlop={10}
        style={styles.country}
        onPress={() => handleSelect(item)}
      >
        <View style={styles.details}>
          <Text variant='bodyMedium' style={[styles.code, styles.dialCode, {color: colors.onSurface}]}>
            {countryDialCode}
          </Text>
          <Text variant='bodyMedium' style={[styles.code, {color: colors.onSurface}]}>
            {countryName}
          </Text>
        </View>
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
            loading ? <ActivityIndicator color={colors.primary} /> : (
              <>
                <View style={[styles.searchView, {borderColor: Colors.platinum}]}>
                  <AntDesign name='search1' size={16} color={colors.onSurface} />
                  <TextInput
                    style={[styles.searchInput, {color:colors.primary}]}
                    placeholder={t('search')}
                    placeholderTextColor={colors.onSurface}
                    onChangeText={val => {
                      setSearchValue(val)
                      search(val)
                    }}
                  />
                </View>
                <FlatList
                  data={countriesData}
                  keyExtractor={item => item.countryId.toString()}
                  renderItem={({item}) => <RenderItem item={item} />}
                  showsVerticalScrollIndicator={false}
                  refreshControl={
                    <RefreshControl
                      refreshing={loading}
                      onRefresh={() => refresh()}
                    />
                  }
                />
              </>
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
  country: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%'
  },
  code: {
    fontSize: 16
  },
  dialCode: {
    width: '20%'
  }
})