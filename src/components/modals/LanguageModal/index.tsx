/* eslint-disable @typescript-eslint/no-use-before-define */
import { FlatList, Modal, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Text, RadioButton } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import { Colors } from '~config/colors';
import CloseSvg from '~assets/svg/CloseSvg';
import {AntDesign} from '@expo/vector-icons'
import { useAppDispatch, useAppSelector } from '~redux/store';
import { setLanguageCode } from '~redux/reducers/language';
import i18next from '~config/i18next'
import dayjs from '~config/dayjs';
import {LocaleConfig} from 'react-native-calendars'
import LanguageData from './data';

interface Props {
  visible: boolean;
  close: () => void;
}

export default function LanguageModal({
  visible,
  close
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'language'])
 
  const {languageCode} = useAppSelector((state) => state.language)
  const currentLanguage = LanguageData.find(lang => lang.code === languageCode)

  const [checked, setChecked] = useState(currentLanguage?.code || 'en');
  const [unfilteredData] = useState(LanguageData)
  const [languageData, setLanguageData] = useState(LanguageData);
  const setSearchValue = useState('')[1]

  function handleClose() {
    close()
  }

  const dispatch = useAppDispatch()
  function handleSelect(code: string) {
    dispatch(setLanguageCode(code))
    i18next.changeLanguage(code)
    dayjs.locale(code)
    LocaleConfig.defaultLocale = code
    setChecked(code)
    close()
  }

  function search(val: string) {
    if (!val) {
      setLanguageData(unfilteredData)
      return;
    }
    const regex = new RegExp(`${val.toLowerCase()}`, 'i');
    const filtered = languageData!.filter(lang => regex.test(lang.name));
    if (filtered?.length > 0) {
      setLanguageData(filtered)
    }
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
            data={languageData}
            keyExtractor={item => item.code}
            showsVerticalScrollIndicator={false}
            bounces={false}
            renderItem={({item}) => {
              const {code, name} = item;
              const isCurrentLocal = checked === code
              return (
                <TouchableOpacity
                  hitSlop={10}
                  style={styles.locale}
                  onPress={() => handleSelect(code)}
                >
                  <Text variant='bodyMedium' style={[styles.code, {color: colors.onSurface}]}>
                    {t(name, {ns: 'language'})}
                  </Text>
                  <RadioButton.Android
                    value={code}
                    status={ isCurrentLocal ? 'checked' : 'unchecked' }
                    onPress={() => handleSelect(code)}
                    uncheckedColor={colors.onSurface}
                    color={colors.primary}
                  />
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
  locale: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  code: {
    fontSize: 16
  }
})