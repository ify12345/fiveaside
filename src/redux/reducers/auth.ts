/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { continueWithGoogle, getUser, login, register } from '~api/auth';
import { updateProfile, updateProfilePhoto } from '~api/profile';
import { User } from '~types';

interface State {
  user: User;
  isAuthenticated: boolean;
  isEmailVerified: boolean;
}

const initialState: State = {
  user: {},
  isAuthenticated: false,
  isEmailVerified: false
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getUserDetails: (state, actions: PayloadAction<User>) => {
      state.user = {...state.user, ...actions.payload}
    },
    success: (state) => {
      state.isEmailVerified = true
    },
    logout: () => ({...initialState})
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.fulfilled, (state, {payload}) => {
        state.user = payload.data.profile
        state.isAuthenticated = true
        state.isEmailVerified = payload.data.profile.hasVerifiedEmail
      })
    builder
      .addCase(register.fulfilled, (state, {payload}) => {
        state.user = payload.data.profile
        state.isAuthenticated = true
        state.isEmailVerified = payload.data.profile.hasVerifiedEmail
      });
    builder
      .addCase(login.pending, state => {
        state.isAuthenticated = false
        state.isEmailVerified = false
      })
      .addCase(login.fulfilled, (state, {payload}) => {
        state.user = payload.data.profile
        state.isAuthenticated = true
        state.isEmailVerified = payload.data.profile.hasVerifiedEmail
      })
    builder
      .addCase(continueWithGoogle.fulfilled, (state, {payload}) => {
        state.user = payload.data.profile
        state.isAuthenticated = true
        state.isEmailVerified = payload.data.profile.hasVerifiedEmail
      })
    builder
      .addCase(updateProfile.fulfilled, (state, {payload}) => {
        state.user = payload.data
      })
    builder
      .addCase(updateProfilePhoto.fulfilled, (state, {payload}) => {
        state.user = payload.data
      })
  },
})

export const {getUserDetails, success, logout} = authSlice.actions
export default authSlice.reducer