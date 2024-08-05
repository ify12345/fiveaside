import { CompositeScreenProps, NavigatorScreenParams } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import {DrawerScreenProps} from '@react-navigation/drawer'
import { AccountType, Schedule, Service } from "~types";

export type RootStackParamList = {
  Onboard: undefined;
  Login: undefined;
  SignupOne: {account_type: AccountType};
  SignupTwo: {account_type: AccountType};
  AccountVerification: undefined;
  AccountVerificationSuccess: undefined;
  ForgotPassword: undefined;
  ResetPassword: {email: string};
  ResetPasswordSuccess: undefined;
  Drawer: NavigatorScreenParams<DrawerParamList>;
}

export type HomeStackParamList = {
  Home: undefined;
  BookedAppointments: undefined;
  PastAppointments: undefined;
  Earnings: undefined;
  Notifications: undefined;
}

export type ScheduleStackParamList = {
  Schedule: undefined;
  CreateSchedule: {service: Service, date?: string};
  ScheduleDetail: {schedule: Schedule};
  ScheduleBreak: {date: string; isHomeService: boolean};
}

export type ProfileStackParamList = {
  Profile: undefined;
  Address: undefined;
  Settings: undefined;
  ChangePassword: undefined;
}

export type DrawerParamList = {
  HomeStack: NavigatorScreenParams<HomeStackParamList>;
  ProfileStack: NavigatorScreenParams<ProfileStackParamList>;
  ScheduleStack: NavigatorScreenParams<ScheduleStackParamList>;
  Payment: undefined;
  Branding: undefined;
}

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>

export type DrawerStackScreenProps<T extends keyof DrawerParamList> =
  CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, T>,
    RootStackScreenProps<keyof RootStackParamList>
  >

export type HomeStackScreenProps<T extends keyof HomeStackParamList> =
  CompositeScreenProps<
    StackScreenProps<HomeStackParamList, T>,
    CompositeScreenProps<
      DrawerScreenProps<DrawerParamList>,
      RootStackScreenProps<keyof RootStackParamList>
    >
  >

export type ScheduleStackScreenProps<T extends keyof ScheduleStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ScheduleStackParamList, T>,
    CompositeScreenProps<
      DrawerScreenProps<DrawerParamList>,
      RootStackScreenProps<keyof RootStackParamList>
    >
  >

export type ProfileStackScreenProps<T extends keyof ProfileStackParamList> =
  CompositeScreenProps<
    StackScreenProps<ProfileStackParamList, T>,
    CompositeScreenProps<
      DrawerScreenProps<DrawerParamList>,
      RootStackScreenProps<keyof RootStackParamList>
    >
  >

declare global {
  namespace ReactNaigation {
    interface RootParamList extends RootStackParamList {}
  }
}