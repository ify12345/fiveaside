/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'
import { getBanks } from '~api/payment'
import { ReducerWithDictionary } from '~helpers'
import { Bank } from '~types'
import { Status } from '~types/api'

interface State {
  loading: Status
  currentPage: number
  lastPage: number
  data: Bank[]
}

const initialState: State = {
  loading: Status.idle,
  currentPage: 0,
  lastPage: 0,
  data: []
}

const bankSlice = createSlice({
  name: 'banks',
  initialState,
  reducers: {
    cleanBanks: () => ({...initialState})
  },
  extraReducers(builder) {
    builder
      .addCase(getBanks.pending, state => {
        state.loading = Status.pending
      })
      .addCase(getBanks.fulfilled, (state, {payload}) => {
        state.loading = Status.success
        state.currentPage = payload.currentPage
        state.lastPage = payload.lastPage
        state.data = ReducerWithDictionary<Bank>([...state.data], [...payload.data])
      })
    builder
      .addCase(PURGE, () => initialState)
  },
})

export const {cleanBanks} = bankSlice.actions
export default bankSlice.reducer