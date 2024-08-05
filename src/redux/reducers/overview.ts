/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'
import { getOverview } from '~api/overview'
import { Status } from '~types/api'

interface State {
  loading: Status
  overview: {
    totalEarning?: number
    totalBooked?: number
  }
}

const initialState: State = {
  loading: Status.idle,
  overview: {}
}

export const overviewSlice = createSlice({
  name: 'overview',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getOverview.pending, state => {
        state.loading = Status.pending
        state.overview = {}
      })
      .addCase(getOverview.fulfilled, (state, {payload}) => {
        state.loading = Status.success
        state.overview = payload.data.overview
      })
      .addCase(getOverview.rejected, (state) => {
        state.loading = Status.failed
      })
    builder
      .addCase(PURGE, () => initialState)
  },
})

export default overviewSlice.reducer