import { KeyboardAvoidingView, ScrollView, View, Image, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { ActivityIndicator, useTheme } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import SafeAreaScreen from '~components/SafeAreaScreen'
import CustomHeader from '~components/CustomHeader'
import {Feather, Octicons} from '@expo/vector-icons'
import { ProfileStackScreenProps } from '~types/navigation'
import InputField from '~components/InputField'
import EditNameModal from '~components/modals/EditNameModal'
import EditBusinessNameModal from '~components/modals/EditBusinessNameModal'
import EditPhoneNumberModal from '~components/modals/EditPhoneNumberModal'
import { useAppDispatch, useAppSelector } from '~redux/store'
import * as ImagePicker from 'expo-image-picker'
import TinyToast from '~components/Toast'
import Toast from 'react-native-toast-message'
import { UpdateProfilePicturePayload } from '~types/api'
import { updateProfilePhoto } from '~api/profile'
import EditJobTitleModal from '~components/modals/EditJobTitleModal'
import { Role } from '~types/apiResponse'
import styles from './styles'

export default function Profile({navigation}: ProfileStackScreenProps<'Profile'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['signup', 'login', 'drawer', 'profile'])
  const {user: {fullName, businessName, email, phone, profilePhotoUrl, jobTitle, roles}} = useAppSelector((store) => store.auth)
  const [editNameModalVisible, setEditNameModalVisible] = useState(false)
  const [editBusinessNameModalVisible, setEditBusinessNameModalVisible] = useState(false)
  const [editPhoneModalVisible, setEditPhoneModalVisible] = useState(false)
  const [jobTitleModalVisible, setJobTitleModalVisible] = useState(false)
  const [loading, setLoading] = useState(false);

  const manager = roles?.includes(Role.MANAGER);

  async function requestPermission() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return permission
  }

  const dispatch = useAppDispatch()
  async function pickImage() {
    try {
      const permissionResult = await requestPermission()

      if (permissionResult.granted === false) {
        return
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1
      })
      
      if (result.assets) {
        const asset = result.assets[0]
        const uri = Platform.OS === 'android' ? asset.uri : asset.uri.replace('file://', '')
        const filename = asset.uri.split('/').pop()
        const match = /\.(\w+)$/.exec(filename as string)
        const type = match ? `image/${match[1]}` : 'image'
        
        const imageFile = {
          uri,
          name: filename,
          type
        }
        const payload: UpdateProfilePicturePayload = {
          picture: imageFile
        }
        setLoading(true)
        dispatch(updateProfilePhoto(payload))
        .unwrap()
        .then(() => {
          setLoading(false)
        })
        .catch(err => {
          setLoading(false)
          Toast.show({
            type: 'error',
            props: {message: err?.msg}
          })
        })
      }
    } catch(err) {
      TinyToast(t('pick_image_error'))
    }
  }

  function toggleEditNameModal() {
    setEditNameModalVisible(!editNameModalVisible)
  }

  function toggleEditBusinessNameModal() {
    setEditBusinessNameModalVisible(!editBusinessNameModalVisible)
  }

  function toggleEditPhoneModal() {
    setEditPhoneModalVisible(!editPhoneModalVisible)
  }

  function toggleJobTitleModal() {
    setJobTitleModalVisible(!jobTitleModalVisible)
  }

  return (
    <SafeAreaScreen>
      <View style={[styles.content, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('profile', {ns: 'drawer'})}
          leftIcon={<Feather name='menu' size={24} color={colors.onSurface} />}
          onLeftIconPressed={() => navigation.openDrawer()}
        />
        <KeyboardAvoidingView behavior='height' style={styles.content}>
          <ScrollView contentContainerStyle={[styles.scrollContent, {backgroundColor: colors.background}]} showsVerticalScrollIndicator={false} bounces={false}>
            <View style={styles.avatarView}>
              <View style={[styles.avatarWrapper, {backgroundColor: colors.secondary}]}>
                {
                  loading ? <ActivityIndicator style={{}} /> :
                  <Image resizeMode='cover' source={{uri: profilePhotoUrl}} style={styles.avatar} />
                }
              </View>
              <TouchableOpacity
                onPress={() => pickImage()}
                disabled={loading}
                hitSlop={20}
                style={[styles.imagePicker, {backgroundColor: colors.background, borderColor: colors.primary}]}
              >
                <Octicons name='pencil' size={14} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <InputField
              selectPicker
              label={t('full_name', {ns: 'profile'})}
              value={fullName}
              autoCapitalize='words'
              autoComplete='name'
              autoCorrect={false}
              rightIcon={<Feather name='edit-3' color={colors.primary} size={16} />}
              pickerPressed={() => toggleEditNameModal()}
            />
            {
              manager && (
                <InputField
                selectPicker
                label={t('business_name')}
                value={businessName || ''}
                autoCapitalize='none'
                autoCorrect={false}
                rightIcon={<Feather name='edit-3' color={colors.primary} size={16} />}
                pickerPressed={() => toggleEditBusinessNameModal()}
              />
              )
            }
            <InputField
              selectPicker
              label={t('job_title', {ns: 'profile'})}
              value={jobTitle || ''}
              autoCapitalize='words'
              autoComplete='off'
              autoCorrect={false}
              rightIcon={<Feather name='edit-3' color={colors.primary} size={16} />}
              pickerPressed={() => toggleJobTitleModal()}
            />
            <InputField
              value={email}
              label={t('email_address', {ns: 'login'})}
              rightIcon={<Feather name='edit-3' color={colors.primary} size={16} />}
              editable={false}
            />
            <InputField
              selectPicker
              label={t('phone_number')}
              value={phone}
              keyboardType='phone-pad'
              rightIcon={<Feather name='edit-3' color={colors.primary} size={16} />}
              pickerPressed={() => toggleEditPhoneModal()}
            />
          </ScrollView>
        </KeyboardAvoidingView>
        <EditNameModal
          visible={editNameModalVisible}
          close={() => toggleEditNameModal()}
          name={fullName}
        />
        <EditBusinessNameModal
          visible={editBusinessNameModalVisible}
          close={() => toggleEditBusinessNameModal()}
          business_name={businessName || ''}
        />
        <EditPhoneNumberModal
          visible={editPhoneModalVisible}
          close={() => toggleEditPhoneModal()}
        />
        <EditJobTitleModal
          visible={jobTitleModalVisible}
          close={() => toggleJobTitleModal()}
          jobTitle={jobTitle || ''}
        />
      </View>
    </SafeAreaScreen>
  )
}