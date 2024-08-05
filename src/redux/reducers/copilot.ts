/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit"

interface State {
  homeCompleted: boolean
  homeServiceToggleCompleted: boolean
  createScheduleCompleted: boolean
  scheduleDetailCompleted: boolean
}

const initialState: State = {
  homeCompleted: false,
  homeServiceToggleCompleted: false,
  createScheduleCompleted: false,
  scheduleDetailCompleted: false
}

export const copilotSlice = createSlice({
  name: 'copilot',
  initialState,
  reducers: {
    completeHomeCopilot: (state) => {
      state.homeCompleted = true
    },
    completeHomeServiceToggleCopilot: (state) => {
      state.homeServiceToggleCompleted = true
    },
    completeCreateScheduleCopilot: state => {
      state.createScheduleCompleted = true
    },
    completeScheduleDetailCopilot: state => {
      state.scheduleDetailCompleted = true
    }
  }
})

export const {completeHomeCopilot, completeHomeServiceToggleCopilot, completeCreateScheduleCopilot,
  completeScheduleDetailCopilot
} = copilotSlice.actions
export default copilotSlice.reducer