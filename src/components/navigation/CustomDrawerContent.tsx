/* eslint-disable @typescript-eslint/no-use-before-define */
import { View, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer'
import { useTheme, Text, Switch } from 'react-native-paper'
import { Colors } from '~config/colors'
import HomeSvg from '~assets/svg/HomeSvg'
import ProfileSvg from '~assets/svg/ProfileSvg'
import AddressSvg from '~assets/svg/AddressSvg'
import ScheduleSvg from '~assets/svg/ScheduleSvg'
import SettingSvg from '~assets/svg/SettingSvg'
import LogoutSvg from '~assets/svg/LogoutSvg'
import { useTranslation } from 'react-i18next'
import { persistor, useAppDispatch, useAppSelector } from '~redux/store'
import { logout } from '~redux/reducers/auth'
import { logOut } from '~api/auth'
import { UpdateProfilePayload } from '~types/api'
import { updateProfile } from '~api/profile'
import PaySvg from '~assets/svg/PaySvg'
import { Role } from '~types/apiResponse'
import BrandSvg from '~assets/svg/BrandSvg'
import {CopilotStep, useCopilot, walkthroughable} from 'react-native-copilot'
import { completeHomeServiceToggleCopilot } from '~redux/reducers/copilot'

const WalkthroughableView = walkthroughable(View)

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {navigation} = props
  const {colors} = useTheme()
  const {t} = useTranslation('drawer')
  const {start: startCopilot, copilotEvents} = useCopilot()
  const {
    user: {firstName, lastName, email, profilePhotoUrl,
      doesHomeService, roles
    }
  } = useAppSelector((store) => store.auth)
   const {homeServiceToggleCompleted} = useAppSelector((store) => store.copilot)

  const [isSwitchOn, setIsSwitchOn] = useState<boolean>(false);

  const manager = roles?.includes(Role.MANAGER);

  useEffect(() => {
    setIsSwitchOn(!!doesHomeService)
  }, [])

  const dispatch = useAppDispatch()
  useEffect(() => {
    const listener = () => {
      // Copilot tutorial finished!
      dispatch(completeHomeServiceToggleCopilot())
    };

    copilotEvents.on("stop", listener);

    return () => {
      copilotEvents.off("stop", listener)
    };
  }, [])

  function onToggleSwitch () {
    const payload: UpdateProfilePayload = {
      doesHomeService: !isSwitchOn,
      homeServiceAvailable: !isSwitchOn
    }
    setIsSwitchOn(!isSwitchOn)
    dispatch(updateProfile(payload))
  };

  function handleLogout() {
    dispatch(logOut())
    dispatch(logout())
    persistor.purge()
  }

  function handleToggleSwitch() {
    onToggleSwitch()
    // if (homeServiceToggleCompleted) {
    //   onToggleSwitch()
    // } else {
    //   startCopilot()
    // }
  }

  return (
    <DrawerContentScrollView bounces={false} {...props} style={[styles.scrollView, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <View style={[styles.avatarWrapper, {backgroundColor: colors.secondary}]}>
           <Image resizeMode='cover' source={{uri: profilePhotoUrl}} style={styles.avatar} />
        </View>
        <View>
          <Text variant='bodySmall' style={{color: Colors.charcoal}}>
            {firstName} {lastName} 
          </Text>
          <Text variant='displaySmall' style={{color: colors.onSurface}}>
            {email}
          </Text>
        </View>
      </View>

      <View style={[styles.homeService, {backgroundColor: colors.background, borderColor: colors.surface}]}>
        <Text variant='titleSmall' style={[styles.availabilityLabel, {color: colors.onSurface}]}>
          {t('available_concierge', {ns: 'profile'})}
        </Text>
        <CopilotStep
          text='Toggle on the button to indicate you render home service.'
          order={1}
          name='toggle home service availability'
        >
          <WalkthroughableView>
            <Switch
              value={isSwitchOn}
              onValueChange={() => handleToggleSwitch()}
            />
          </WalkthroughableView>
        </CopilotStep>
      </View>

      <DrawerItem
        style={styles.navItem}
        icon={() => <HomeSvg />}
        label={t('home')}
        labelStyle={styles.navLabel}
        onPress={() => {
          navigation.navigate('HomeStack', {screen: 'Home'})
        }}
        pressColor={colors.secondary}
      />
      <DrawerItem
        style={styles.navItem}
        icon={() => <ProfileSvg />}
        label={t('profile')}
        labelStyle={styles.navLabel}
        onPress={() => {
          navigation.navigate('ProfileStack', {screen: 'Profile'})
        }}
        pressColor={colors.secondary}
      />
      <DrawerItem
        style={styles.navItem}
        icon={() => <AddressSvg />}
        label={t('address')}
        labelStyle={styles.navLabel}
        onPress={() => {
          navigation.navigate('ProfileStack', {screen: 'Address'})
        }}
        pressColor={colors.secondary}
      />
      <DrawerItem
        style={styles.navItem}
        icon={() => <ScheduleSvg />}
        label={t('schedule')}
        labelStyle={styles.navLabel}
        onPress={() => {
          navigation.navigate('ScheduleStack', {screen: 'Schedule'})
        }}
        pressColor={colors.secondary}
      />
      {
        manager && (
          <DrawerItem
            style={styles.navItem}
            icon={() => <PaySvg/>}
            label={t('payment')}
            labelStyle={styles.navLabel}
            onPress={() => {
              navigation.navigate('Payment')
            }}
            pressColor={colors.secondary}
          />
        )
      }
      {
        manager && (
          <DrawerItem
            style={styles.navItem}
            icon={() => <BrandSvg />}
            label={t('branding')}
            labelStyle={styles.navLabel}
            onPress={() => {
              navigation.navigate('Branding')
            }}
            pressColor={colors.secondary}
          />
        )
      }
      <DrawerItem
        style={styles.navItem}
        icon={() => <SettingSvg />}
        label={t('settings')}
        labelStyle={styles.navLabel}
        onPress={() => {
          navigation.navigate('ProfileStack', {screen: 'Settings'})
        }}
        pressColor={colors.secondary}
      />
      <DrawerItem
        style={styles.navItem}
        icon={() => <LogoutSvg />}
        label={t('logout')}
        labelStyle={[styles.navLabel, {color: colors.error}]}
        onPress={() => handleLogout()}
        pressColor={colors.errorContainer}
      />
    </DrawerContentScrollView>
  )
}

export const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 24
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 24,
    marginBottom: 24
  },
  avatarWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden'
  },
  avatar: {
    width: '100%',
    height: '100%'
  },
  homeService: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 24,
    borderWidth: 1
  },
  availabilityLabel: {
    width: '80%'
  },
  navItem: {
    marginBottom: 32
  },
  navLabel: {
    fontFamily: 'Avenir-Regular',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: Colors.charcoal,
    marginLeft: - 20
  }
})