/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'
import { getEarnings } from '~api/earning'
import { ReducerWithDictionary } from '~helpers'
import { Earning } from '~types'
import { Status } from '~types/api'

interface State {
  loading: Status
  currentPage: number
  lastPage: number
  data: Earning[]
  totalEarnings: number
}

const initialState: State  = {
  loading: Status.idle,
  currentPage: 0,
  lastPage: 0,
  data: [],
  totalEarnings: 0
}

const earningSlice = createSlice({
  name: 'earning',
  initialState,
  reducers: {
    cleanEarnings: () => ({...initialState})
  },
  extraReducers(builder) {
    builder
      .addCase(getEarnings.pending, state => {
        state.loading = Status.pending
      })
      .addCase(getEarnings.fulfilled, (state, {payload}) => {
        state.loading = Status.success
        state.currentPage = payload.currentPage
        state.lastPage = payload.lastPage
        state.totalEarnings = payload.totalEarnings
        state.data = ReducerWithDictionary<Earning>([...state.data], [...payload.data])
      })
      .addCase(getEarnings.rejected, state => {
        state.loading = Status.failed
      })
    builder
      .addCase(PURGE, () => initialState)
  },
})

export const {cleanEarnings} = earningSlice.actions
export default earningSlice.reducer