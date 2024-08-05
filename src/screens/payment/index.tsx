import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { Text, useTheme } from 'react-native-paper'
import CustomHeader from '~components/CustomHeader'
import { DrawerStackScreenProps } from '~types/navigation'
import PaySvg from '~assets/svg/PaySvg'
import { Colors } from '~config/colors'
import EditSvg from '~assets/svg/EditSvg'
import { useTranslation } from 'react-i18next'
import {TextMask} from 'react-native-masked-text'
import AddPaymentAccountModal from '~components/modals/AddPaymentAccountModal'
import { useAppSelector } from '~redux/store'
import styles from './styles'
import Empty from './empty'

export default function Payment({navigation}: DrawerStackScreenProps<'Payment'>) {
  const {colors} = useTheme()
  const {t} = useTranslation('payment')
  const {user: {outlet}} = useAppSelector((store) => store.auth)
  const [addModalVisible, setAddModalVisible] = useState(false)

  function closeAddModal() {
    setAddModalVisible(false)
  }

  function editAccount() {
    setAddModalVisible(true)
  }

  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('payment_account')}
          onLeftIconPressed={() => navigation.goBack()}
        />
        {
          outlet?.bankId === null ? (
            <Empty openAddModal={()=> setAddModalVisible(true)} /> 
          ) : (
            <View style={[styles.account, {backgroundColor: colors.background}]}>
              <View style={styles.rowAligned}>
                <View style={[styles.iconWrapper, {backgroundColor: colors.tertiary}]}>
                  <PaySvg color={colors.primary} />
                </View>
                <View>
                  <Text variant='bodyMedium' style={{color: Colors.charcoal}}>
                    {outlet?.bankName}
                  </Text>
                  <TextMask
                    value={outlet?.bankAccountNumber!}
                    type="credit-card"
                    options={{
                      obfuscated: true
                    }}
                    style={[styles.accountNumber, {color: colors.onSurface}]}
                  />
                </View>
              </View>
              <View style={styles.rowAligned}>
                <TouchableOpacity
                  onPress={() => editAccount()}
                  hitSlop={10}       
                  style={styles.editIcon}>
                  <EditSvg />
                </TouchableOpacity>
              </View>
            </View>
          )
        }
      </View>
      <AddPaymentAccountModal
        visible={addModalVisible}
        close={() => closeAddModal()}
        type={outlet?.bankId === null ? 'add' : 'edit'}
      />
    </SafeAreaScreen>
  )
}