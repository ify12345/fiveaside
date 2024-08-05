import React, { useEffect, useState } from "react";
import {createStackNavigator} from '@react-navigation/stack'
import { DrawerParamList, HomeStackParamList, ProfileStackParamList, RootStackParamList, ScheduleStackParamList } from "~types/navigation";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "~components/navigation/CustomDrawerContent";
import { useAppDispatch, useAppSelector } from "~redux/store";
import credentials from '~utils/keychain'
import { getUser } from "~api/auth";

// auth screens
import { logout } from "~redux/reducers/auth";
import OnboardScreen from "./auth/onboard";
import LoginScreen from "./auth/login";
import SignupOneScreen from "./auth/signup/step1";
import SignupTwoScreen from "./auth/signup/step2";
import AccountVerificationScreen from "./auth/account-verification";
import VerificationSucessScreen from "./auth/verification-success";
import ResetPasswordSucessScreen from "./auth/reset-password-success";
import ForgotPasswordScreen from "./auth/forgot-password";
import ResetPasswordScreen from "./auth/reset-password";

// authenticated screens
import HomeScreen from "./home";
import BookedAppointmentsScreen from "./booked-appointments";
import PastAppointmentsScreen from "./past-appointments";
import NotificationsScreen from "./notifications";
import EarningsScreen from "./earnings";

import ScheduleScreen from "./schedule";
import CreateScheduleScreen from "./create-schedule";
import ScheduleDetailScreen from "./schedule-detail";
import ScheduleBreakScreen from "./schedule-break";

import ProfileScreen from "./profile";
import AddressScreen from "./address";
import SettingScreen from "./settings";
import ChangePasswordScreen from "./change-password";

import PaymentScreen from "./payment";
import BrandingScreen from "./branding";

const Stack = createStackNavigator<RootStackParamList>()
const Drawer = createDrawerNavigator<DrawerParamList>()
const HomeStack = createStackNavigator<HomeStackParamList>()
const ScheduleStack = createStackNavigator<ScheduleStackParamList>()
const ProfileStack = createStackNavigator<ProfileStackParamList>()

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="BookedAppointments" component={BookedAppointmentsScreen} />
      <HomeStack.Screen name="PastAppointments" component={PastAppointmentsScreen} />
      <HomeStack.Screen name="Notifications" component={NotificationsScreen} />
      <HomeStack.Screen name="Earnings" component={EarningsScreen} />
    </HomeStack.Navigator>
  )
}

function ScheduleStackNavigator() {
  return (
    <ScheduleStack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      <ScheduleStack.Screen name="Schedule" component={ScheduleScreen} />
      <ScheduleStack.Screen name="CreateSchedule" component={CreateScheduleScreen} />
      <ScheduleStack.Screen name="ScheduleDetail" component={ScheduleDetailScreen} />
      <ScheduleStack.Screen name="ScheduleBreak" component={ScheduleBreakScreen} />
    </ScheduleStack.Navigator>
  )
}

function ProfileStackNavigator() {
  return (
    <ProfileStack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false
      }}
    >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} />
      <ProfileStack.Screen name="Address" component={AddressScreen} />
      <ProfileStack.Screen name="Settings" component={SettingScreen} />
      <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen} />
    </ProfileStack.Navigator>
  )
}

function DrawerNav() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false
      }}
    >
      <Drawer.Screen name="HomeStack" component={HomeStackNavigator} />
      <Drawer.Screen name="ScheduleStack" component={ScheduleStackNavigator} />
      <Drawer.Screen name="ProfileStack" component={ProfileStackNavigator} />
      <Drawer.Screen name="Payment" component={PaymentScreen} />
      <Drawer.Screen name="Branding" component={BrandingScreen} />
    </Drawer.Navigator>
  )
}

export default function Screens() {
  const [loading, setLoading] = useState(true)
  const {isAuthenticated, isEmailVerified} = useAppSelector((store) => store.auth)

  const dispatch = useAppDispatch()
  useEffect(() => {
    (async () => {
      const checkCredential = await credentials();
      if (!checkCredential) {
        setLoading(false)
        dispatch(logout())
      }
    })()
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getUser())
      .unwrap()
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
        dispatch(logout())
      })
    } else {
      setLoading(false)
      dispatch(logout())
    }
  }, [isAuthenticated])

  if (loading) {
    return null
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
    >
      {
        !isAuthenticated && (
          <Stack.Group>
            <Stack.Screen name="Onboard" component={OnboardScreen}  />
            <Stack.Screen name="Login" component={LoginScreen}  />
            <Stack.Screen name="SignupOne" component={SignupOneScreen} />
            <Stack.Screen name="SignupTwo" component={SignupTwoScreen} />
            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
            <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
            <Stack.Screen name="ResetPasswordSuccess" component={ResetPasswordSucessScreen} />
          </Stack.Group>
        )
      }
      {
        isAuthenticated && !isEmailVerified && (
          <Stack.Group>
            <Stack.Screen options={{gestureEnabled: false}} name="AccountVerification" component={AccountVerificationScreen} />
            <Stack.Screen options={{gestureEnabled: false}} name="AccountVerificationSuccess" component={VerificationSucessScreen} />
          </Stack.Group>
        )
      }
      {
        isAuthenticated && isEmailVerified && (
          <Stack.Screen name="Drawer" component={DrawerNav} />
        )
      }
    </Stack.Navigator>
  )
}