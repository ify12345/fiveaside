/* eslint-disable @typescript-eslint/no-use-before-define */
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useTheme, Text } from 'react-native-paper'
import CloseSvg from '~assets/svg/CloseSvg'
import { useTranslation } from 'react-i18next';
import { Colors } from '~config/colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackScreenProps } from '~types/navigation';
import CustomButton from '~components/CustomButton';
import { AccountType } from '~types';

interface Props {
  visible: boolean;
  close: () => void
}

type Account = {
  id: AccountType
  title: string;
  desc: string
}

export default function AccountTypeModal({visible, close}: Props) {
  const {colors} = useTheme()
  const {t} = useTranslation(['onboard', 'signup'])
  const navigation = useNavigation<RootStackScreenProps<'Onboard'>['navigation']>()
  const [selected, setSelected] = useState<AccountType | undefined>()

  const AccountTypes: Account[] = [
    {
      id: AccountType.new,
      title: t('new_account'),
      desc: t('new_account_desc')
    },
    {
      id: AccountType.existing,
      title: t('existing_account'),
      desc: t('existing_account_desc')
    }
  ]

  function handleContinue() {
    close()
    setTimeout(() => {
      navigation.navigate('SignupOne', {account_type: selected!})
    }, 300)
  }

  return (
    <Modal transparent visible={visible} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={[styles.modalContent, {backgroundColor: colors.background}]}>
          <TouchableOpacity
            onPress={close}
            hitSlop={20}
            style={styles.closeBtn}
          >
            <CloseSvg  />
          </TouchableOpacity>
          <Text variant='headlineLarge' style={[styles.title, {color: colors.onBackground}]}>
            {t('select_account_type')}
          </Text>
          {
            AccountTypes.map(accountType => {
              const {title, desc, id} = accountType;
              const isSelected = id === selected
              return (
                <TouchableOpacity
                  key={title}
                  style={[styles.accountCard, {borderWidth: isSelected ? 1 : 0, borderColor: isSelected ? colors.primary : undefined, backgroundColor: isSelected ? colors.tertiary : colors.surface}]}
                  onPress={() => setSelected(id)}
                >
                  <View style={[styles.radioBtnWrapper, {borderColor: isSelected ? colors.primary : colors.onSurface}]}>
                    <View style={[styles.radioSelect, {backgroundColor: isSelected ? colors.primary : undefined}]} />
                  </View>
                  <View>
                    <Text variant='bodyLarge' style={{color: colors.onBackground}}>
                      {title}
                    </Text>
                    <Text variant='titleSmall' style={{color: Colors.grey}}>
                      {desc}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            })
          }
          <CustomButton
            primary
            title={t('continue', {ns: 'signup'})}
            style={styles.btn}
            disabled={!selected}
            onPress={() => handleContinue()}
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
  fullView: {
    flex: 1
  },
  modalContent: {
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingTop: 24,
    paddingBottom: 40,
    paddingHorizontal: 24,
    width: '100%'
  },
   closeBtn: {
    alignSelf: 'flex-end'
  },
  title: {
    marginTop: 16,
    marginBottom: 24,
    fontWeight: '800'
  },
  accountCard: {
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    flexDirection: 'row'
  },
  radioBtnWrapper: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8
  },
  radioSelect: {
    width: 10,
    height: 10,
    borderRadius: 5
  },
  btn: {
    marginTop: 16
  }
})