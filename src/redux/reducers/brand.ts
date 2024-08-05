/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'
import { getBrandImages } from '~api/brand'
import { ReducerWithDictionary } from '~helpers'
import { BrandImage } from '~types'
import { Status } from '~types/api'

interface State {
  loading: Status
  currentPage: number
  lastPage: number
  data: BrandImage[]
}

const initialState: State = {
  loading: Status.idle,
  currentPage: 0,
  lastPage: 0,
  data: []
}

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    cleanBrandImages: () => ({...initialState})
  },
  extraReducers(builder) {
    builder
      .addCase(getBrandImages.pending, state => {
        state.loading = Status.pending
      })
      .addCase(getBrandImages.fulfilled, (state, {payload}) => {
        state.loading = Status.success
        state.currentPage = payload.currentPage
        state.lastPage = payload.lastPage
        state.data = ReducerWithDictionary<BrandImage>([...state.data], [...payload.data])
      })
    builder
      .addCase(PURGE, () => initialState)
  },
})

export const {cleanBrandImages} = brandSlice.actions
export default brandSlice.reducer