/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { PURGE } from "redux-persist";
import { getOutlets } from "~api/outlet";
import { ReducerWithDictionary } from "~helpers";
import { Outlet } from "~types";
import { Status } from "~types/api";

interface State {
  loading: Status
  currentPage: number
  lastPage: number
  data: Outlet[]
}

const initialState: State = {
  loading: Status.idle,
  currentPage: 0,
  lastPage: 0,
  data: []
}

export const outletSlice = createSlice({
  name: 'outlets',
  initialState,
  reducers: {
    cleanOutlets: () => ({...initialState})
  },
  extraReducers(builder) {
    builder
      .addCase(getOutlets.pending, state => {
        state.loading = Status.pending
      })
      .addCase(getOutlets.fulfilled, (state, {payload}) => {
        state.loading = Status.success
        state.currentPage = payload.currentPage
        state.lastPage = payload.lastPage
        if (payload.currentPage === 1) {
          state.data = payload.data
        } else {
          state.data = ReducerWithDictionary<Outlet>([...state.data], [...payload.data])
        }
      })
    builder
      .addCase(PURGE, () => initialState)
  },
})

export const {cleanOutlets} = outletSlice.actions
export default outletSlice.reducer