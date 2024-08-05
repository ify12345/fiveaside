import { View, Image, FlatList, RefreshControl, Platform, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SafeAreaScreen from '~components/SafeAreaScreen'
import { useTheme, Text, ActivityIndicator } from 'react-native-paper'
import CustomHeader from '~components/CustomHeader'
import { useTranslation } from 'react-i18next'
import { DrawerStackScreenProps } from '~types/navigation'
import CustomButton from '~components/CustomButton'
import { BrandImage } from '~types'
import { useAppDispatch, useAppSelector } from '~redux/store'
import { Status, UploadBrandImagePayload } from '~types/api'
import { deleteBrandImage, getBrandImages, uploadBrandImage } from '~api/brand'
import dayjs from '~config/dayjs'
import {Feather} from '@expo/vector-icons'
import DeleteSvg from '~assets/svg/DeleteSvg'
import DeleteScheduleModal from '~components/modals/DeleteScheduleModal'
import Loader from '~components/loader'
import Toast from 'react-native-toast-message'
import { cleanBrandImages } from '~redux/reducers/brand'
import * as ImagePicker from 'expo-image-picker'
import TinyToast from '~components/Toast'
import styles from './styles'
import Empty from './empty'
import { ListPlaceholder } from './placeholder'

export default function Branding({navigation}: DrawerStackScreenProps<'Branding'>) {
  const {colors} = useTheme()
  const {t} = useTranslation(['branding', 'appointment'])
  const {data, currentPage, lastPage, loading: brandLoading} = useAppSelector((store) => store.brand)

  const [firstLoaded, setFirstLoaded] = useState(false)
  const [refreshing, setRefreshing] = useState(false)
  const [checked, setChecked] = useState<number[]>([])
  const [deleteModalVisible, setDeleteModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)

  const imagesLoading = brandLoading !== Status.success

  const dispatch = useAppDispatch()
  useEffect(() => {
    if (imagesLoading) {
      dispatch(getBrandImages({}))
    }
  }, [])

  function toggleDeleteModal() {
    setDeleteModalVisible(!deleteModalVisible)
  }

  function refresh() {
    setRefreshing(true)
    setFirstLoaded(false)
    dispatch(getBrandImages({}))
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
    if(currentPage < lastPage) {
      dispatch(getBrandImages({page: currentPage + 1}))
    }
  }

  // const sectionedData : {title: string; data: BrandImage[]}[] = []

  // data?.forEach(image => {
  //   const {createdAt} = image
  //   const formattedDate = dayjs(createdAt, 'DD MMM YYYY hh:mm A', 'en').format('YYYY-MM-DD')
  //   const existingTitle = sectionedData.find(a => a.title === formattedDate);
  //   if (existingTitle) {
  //     const index = sectionedData.indexOf(existingTitle)
  //     sectionedData[index].data?.push(image)
  //   } else {
  //     const newData = {title: formattedDate, data: [image]}
  //     sectionedData.push(newData)
  //   }
  // })

  function RenderItem ({item}: {item: BrandImage}) {
    const isChecked = checked.includes(item.id)

    const onPress = () => {
      if (isChecked) {
        const filtered = checked.filter(id => id !== item.id)
        setChecked(filtered)
      } else {
        setChecked(prev => [...prev, item.id])
      }
    }
    
    return (
      <TouchableOpacity onPress={() => onPress()}>
        <View
          style={styles.imageView}>
          <View style={[styles.imageWrapper, {backgroundColor: colors.onSurface}]}>
            <Image source={{uri: item.url}} style={styles.image} resizeMode='cover' />
            {
            isChecked && (
                <View style={[styles.radioCheck, {backgroundColor: colors.primary}]}>
                  <Feather name='check' size={16} color={colors.background} />
                </View>
              )
            }
          </View>
          <Text variant='bodyMedium' numberOfLines={1} style={styles.imageName}>
            {item.name}
          </Text>
          <Text>
            {dayjs(item.createdAt, 'DD MMM YYYY hh:mm A', 'en').format('MMMM D, YYYY')}
          </Text>
        </View>
      </TouchableOpacity>
    )
  }

  function handleDeleteImage() {
    toggleDeleteModal()
    setTimeout(() => {
      setLoading(true)
      dispatch(deleteBrandImage({imagesId: checked!}))
      .unwrap()
      .then(() => {
        dispatch(cleanBrandImages())
        dispatch(getBrandImages({}))
        setLoading(false)
      })
      .catch(err => {
        setLoading(false)
        Toast.show({
          type: 'error',
          props: {message: err?.msg}
        })
      })
    }, 300)
  }

  async function requestPermission() {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    return permission
  }

  async function pickImage() {
    try {
      const permissionResult = await requestPermission()

      if (permissionResult.granted === false) {
        return
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        allowsMultipleSelection: true,
        quality: 1,  
      })
      
      if (result.assets) {
        const selectedImages = result.assets.map(asset => {
          const uri = Platform.OS === 'android' ? asset.uri : asset.uri.replace('file://', '')
          const filename = asset.uri.split('/').pop()
          const match = /\.(\w+)$/.exec(filename as string)
          const type = match ? `image/${match[1]}` : 'image'

          const imageFile = {
            uri,
            name: filename,
            type
          }
          return imageFile
        })

        const payload: UploadBrandImagePayload = {
          files: selectedImages
        }
        setLoading(true)
        dispatch(uploadBrandImage(payload))
        .unwrap()
        .then(() => {
          dispatch(cleanBrandImages())
          dispatch(getBrandImages({}))
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

  function ListFooterComponent() {
    return (
      <View>
        {brandLoading === Status.pending && <ActivityIndicator />}
      </View>
    )
  }

  return (
    <SafeAreaScreen>
      <View style={[styles.screen, {backgroundColor: colors.surface}]}>
        <CustomHeader
          title={t('branding')}
          onLeftIconPressed={() => navigation.goBack()}
          rightIcon={checked.length > 0 && <DeleteSvg />}
          onRightIconPressed={() => toggleDeleteModal()}
        />
        {
          imagesLoading && !firstLoaded ? <ListPlaceholder /> : (
            <FlatList
              contentContainerStyle={styles.listContainer}
              data={data}
              keyExtractor={item => item.url}
              renderItem={({item}) => <RenderItem item={item} />}
              numColumns={3}
              columnWrapperStyle={{justifyContent: 'space-between'}}
              onEndReachedThreshold={0.5}
              onEndReached={() => {
                if (currentPage < lastPage) {
                  loadMore()
                }
              }}
              refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => refresh()} />}
              ListFooterComponent={<ListFooterComponent />}
              ListEmptyComponent={<Empty onBtnPress={() => pickImage()} />}
            />
          )
        }
        {
          data.length !== 0 && !imagesLoading && (
            <CustomButton
              primary
              title={t('upload_images')}
              style={styles.listBtn}
              onPress={() => pickImage()}
            />
          )
        }
      </View>
      <DeleteScheduleModal
        visible={deleteModalVisible}
        close={() => toggleDeleteModal()}
        confirm={() => handleDeleteImage()}
      />
      <Loader visible={loading} />
    </SafeAreaScreen>
  )
}