/* eslint-disable @typescript-eslint/no-use-before-define */
import { StyleSheet } from 'react-native'
import React, { SetStateAction } from 'react'
import {Dropdown} from 'react-native-element-dropdown'
import { useTranslation } from 'react-i18next'
import { useTheme } from 'react-native-paper'
import {FontAwesome} from '@expo/vector-icons'
import { PickerData } from '~types'

interface Props {
  selected: string;
  setSelected: (string: SetStateAction<string>) => void;
  interval?: boolean;
}

export default function DurationPicker({
  selected,
  setSelected,
  interval = false
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['home', 'schedule'])

  const DurationPickerData: PickerData[] = [
    {label: t('today'), value: 'today'},
    {label: t('this_week'), value: 'week'},
    {label: t('this_month'), value: 'month'}
  ]

  const IntervalPickerData : PickerData[] = [
    {label: t('days', {ns: 'schedule'}), value: '1'},
    {label: t('weeks', {ns: 'schedule'}), value: '2'},
    {label: t('months', {ns: 'schedule'}), value: '3'}
  ]

  return (
    <Dropdown
      data={interval ? IntervalPickerData : DurationPickerData}
      value={selected}
      labelField='label'
      valueField='value'
      onChange={({value}) => {
        setSelected(value)
      }}
      placeholder=''
      selectedTextStyle={[styles.dropdownText, {color: colors.onSurface}]}
      placeholderStyle={[styles.dropdownText, {color: colors.onSurface}]}
      itemTextStyle={[styles.dropdownText, {color: colors.onSurface}]}
      itemContainerStyle={styles.dropdownItem}
      containerStyle={styles.listContainer}
      renderRightIcon={() => interval ? <FontAwesome name='angle-down' size={24} color={colors.onSurface} /> : <FontAwesome name='caret-down' color={colors.primary} /> }
      style={[interval ? styles.interval : styles.dropdown, {backgroundColor: colors.background}]}
      iconStyle={{tintColor: colors.primary}}
    />
  )
}

const styles = StyleSheet.create({
  dropdown: {
    width: 100,
    borderColor: 'gray',
    borderWidth: 0.4,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  interval: {
    width: 100,
    height: 50,
    borderWidth: 0,
    borderRadius: 4,
    paddingHorizontal: 8,
  },
  listContainer: {
    paddingBottom: 15,
    borderRadius: 4
  },
  dropdownItem: {
    marginBottom: -10
  },
  dropdownText: {
    fontFamily: 'Avenir-Regular',
    fontWeight: '400',
    fontSize: 12
  },
})