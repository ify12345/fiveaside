/* eslint-disable @typescript-eslint/no-use-before-define */
import { Modal, StyleSheet, View } from 'react-native'
import React, { SetStateAction, useState } from 'react'
import { Colors } from '~config/colors'
import { useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import CalendarComponent from '~components/Calendar'
import CustomButton from '~components/CustomButton'

interface Props {
  visible: boolean;
  close: () => void;
  selected: Date | undefined;
  setSelected: (value: SetStateAction<Date | undefined>) => void;
  minDate?: Date
  maxDate?: Date
}

export default function SelectDateModal({
  visible,
  close,
  selected,
  setSelected,
  minDate,
  maxDate
}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation('schedule')
  const [currentDate, setCurrentDate] = useState(selected)

  function save() {
    setSelected(currentDate)
    close()
  }

  function cancel() {
    setCurrentDate(selected);
    close()
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
          <CalendarComponent
            value={currentDate}
            setValue={setCurrentDate}
            minDate={minDate}
            maxDate={maxDate}
          />
          <View style={styles.btnWrapper}>
             <CustomButton
              onPress={() => cancel()}
              title={t('cancel')}
              style={[styles.btn, {borderColor: Colors.darkLiver, borderWidth: 1}]}
              titleStyle={{color: colors.onSurface}}
            />
            <CustomButton
              onPress={() => save()}
              primary
              title={t('save')}
              disabled={!currentDate}
              style={styles.btn}
            />
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
   modalContainer: {
    backgroundColor: Colors.backDrop,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    paddingBottom: 16,
    width: '100%'
  },
  btnWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginTop: 24
  },
  btn: {
    width: '45%'
  }
})