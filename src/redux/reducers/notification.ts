/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'
import { getNotifications } from '~api/notification'
import { ReducerWithDictionary } from '~helpers'
import { Notification } from '~types'
import { Status } from '~types/api'

interface State {
  loading: Status
  currentPage: number
  lastPage: number
  data: Notification[]
}

const initialState: State = {
  loading: Status.idle,
  currentPage: 0,
  lastPage: 0,
  data: []
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getNotifications.pending, state => {
        state.loading = Status.pending
      })
      .addCase(getNotifications.fulfilled, (state, {payload}) => {
        state.loading = Status.success
        state.currentPage = payload.currentPage
        state.lastPage = payload.lastPage
        state.data = ReducerWithDictionary<Notification>([...state.data], [...payload.data])
      })
    builder
      .addCase(PURGE, () => initialState)
  },
})

export default notificationSlice.reducer