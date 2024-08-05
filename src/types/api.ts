/* eslint-disable import/no-cycle */
import { AppDispatch } from "~redux/store";
import { Break, User } from "~types";

export type AsyncThunkConfig = {
  /** return type for `thunkApi.getState` */
  state?: unknown
  /** type for `thunkApi.dispatch` */
  dispatch?: AppDispatch;
  /** type of the `extra` argument for the thunk middleware, which will be passed in as `thunkApi.extra` */
  extra?: unknown
  /** type to be passed into `rejectWithValue`'s first argument that will end up on `rejectedAction.payload` */
  rejectValue: RejectValue
  /** return type of the `serializeError` option callback */
  serializedErrorType?: unknown
  /** type to be returned from the `getPendingMeta` option callback & merged into `pendingAction.meta` */
  pendingMeta?: unknown
  /** type to be passed into the second argument of `fulfillWithValue` to finally be merged into `fulfilledAction.meta` */
  fulfilledMeta?: unknown
  /** type to be passed into the second argument of `rejectWithValue` to finally be merged into `rejectedAction.meta` */
  rejectedMeta?: unknown
}

export interface RejectValue {
  msg: string;
  status: number;
}

export enum Status {
  idle = 'idle',
  pending = 'pending',
  success = 'success',
  failed = 'failed'
}

export interface RegisterPayload extends User {
  timezone?: string
}

export interface LoginPayload {
  email: string;
  password: string
}

export interface GoogleAuthPayload {
  googleToken: string
  email: string
  // firstName: string | null
  // lastName: string | null
}

export interface VerifyAccountPayload {
  otp: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  resetToken: string
  newPassword: string
  confirmPassword: string
}

export interface GetOverviewPayload {
  startDate: string
  endDate: string
}

export interface GetAppointmentsPayload {
  page?: number
  search?: string
}

export interface GetNotificationsPayload {
  page?: number
}

export interface GetEarningsPayload {
  page?:number
  startDate: string
  endDate: string
}

export interface ChangePasswordPayload {
  oldPassword: string
  newPassword: string
  confirmPassword: string
}

export interface UpdateProfilePayload {
  doesHomeService?: boolean
  homeServiceAvailable?: boolean
  firstName?: string
  lastName?: string
  countryId?: number
  streetAddress1?: string
  streetAddress2?: string
  city?: string
  zipCode?: string
  businessName?: string
  jobTitle?: string
}

export type ImageType = {
  uri: string;
  name?: string;
  type: string;
}

export interface UpdateProfilePicturePayload {
  picture: ImageType
}

export interface GetSchedulesPayload {
  page?: number
  search?: string
}

export interface CreateSchedulePayload {
  schedule_date : string
  start_time : string
  end_time : string
  repeat_schedule? : number
  for_home_service : boolean
}

export interface UpdateSchedulePayload {
  schedule_id: number
  schedule_date: string
  start_time: string
  end_time: string
  is_available: boolean
  for_home_service: boolean
  time_slots: Break[] | null
}

export interface UpdateScheduleReducerPayload {
  schedule_id: number
  schedule_date: string
  start_time: string
  end_time: string
  is_available: boolean
  for_home_service: boolean
  time_slots: Break[] | null
}

export interface ToggleSchedulePayload {
  schedule_id: number
  is_available: boolean
}

export interface ToggleScheduleDatePayload {
  schedule_date: string
  is_available: boolean
}

export interface CreateBreakPayload {
  schedule_date: string
  start_time: string
  end_time: string
  repeat_schedule: number
  for_home_service: boolean
}

export type CreateBreakReducerPayload = {
  startTime?: string
  endTime?: string
}

export type GetOutletsPayload = {
  page?: number
  search?: string
}

export type CancelAppointmentPayload = {
  appointment_id: number;
  reason: string;
}

export type GetBanksPayload = {
  page?: number
}

export type UpdateBankPayload = {
  bankId: number;
  bankRoutingNumber: string;
  bankAccountNumber: string;
  bankAccountName: string;
}

export type GetBrandImagesPayload = {
  page?: number
}

export interface UploadBrandImagePayload {
  files: ImageType[]
}

export type GetTimeslotsPayload = {
  search: string
  homeService: 1 | 0
  page: number
}