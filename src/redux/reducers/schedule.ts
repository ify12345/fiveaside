/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { PURGE } from 'redux-persist'
import { createBreak, getHomeServiceSchedules, getScheduleInterval, getScheduleTimerOptions, getTimeslots, getWalkInSchedules } from '~api/schedule'
import { ReducerWithDictionary } from '~helpers'
import { Schedule } from '~types'
import { CreateBreakReducerPayload, Status, UpdateSchedulePayload, UpdateScheduleReducerPayload } from '~types/api'
import { MinuteInterval, TimeSlotType } from '~types/apiResponse'

interface State {
  intervalStatus: Status
  interval: MinuteInterval
  walkInScheduleStatus: Status
  walkInSchedules: {
    data: Schedule[]
    currentPage: number
    lastPage: number
  }

  homeServiceScheduleStatus: Status
  homeServiceSchedules: {
    data: Schedule[]
    currentPage: number
    lastPage: number
  }

  scheduleUpdate: UpdateSchedulePayload

  createBreak: {
    startTime: string
    endTime: string
  }

  timeOptions: string[]
  timeOptionStatus: Status

  scheduleTimeslotStatus: Status
  scheduleTimeslots: {
    data: TimeSlotType[]
    currentPage: number
    lastPage: number
  }
}

const initialState: State = {
  intervalStatus: Status.idle,
  interval: 15,
  walkInScheduleStatus: Status.idle,
  walkInSchedules: {
    data: [],
    currentPage: 0,
    lastPage: 0
  },

  homeServiceScheduleStatus: Status.idle,
  homeServiceSchedules: {
    data: [],
    currentPage: 0,
    lastPage: 0
  },

  scheduleUpdate: {
    schedule_id: 0,
    schedule_date: '',
    start_time: "",
    end_time: "",
    is_available: false,
    for_home_service: false,
    time_slots: null
  },

  createBreak: {
    startTime: "10:00",
    endTime: "10:30"
  },

  timeOptions: [],
  timeOptionStatus: Status.idle,

  scheduleTimeslotStatus: Status.idle,
  scheduleTimeslots: {
    data: [],
    currentPage: 0,
    lastPage: 0
  }
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    cleanWalkInSchedules: (state) => {
      state.walkInScheduleStatus = Status.idle
      state.walkInSchedules = {currentPage: 0, lastPage: 0, data: []}
    },
    cleanHomeServiceSchedules: (state) => {
      state.homeServiceScheduleStatus = Status.idle
      state.homeServiceSchedules = {currentPage: 0, lastPage: 0, data: []}
    },
    getUpdateScheduleDetails: (state, actions: PayloadAction<UpdateScheduleReducerPayload>) => {
      state.scheduleUpdate = {...state.scheduleUpdate, ...actions.payload}
    },
    cleanScheduleUpdate: (state) => {
      state.scheduleUpdate = {
        schedule_id: 0,
        schedule_date: '',
        start_time: "",
        end_time: "",
        is_available: false,
        for_home_service: false,
        time_slots: null
      }
    },
    getCreateBreakDetails: (state, action: PayloadAction<CreateBreakReducerPayload>) => {
      state.createBreak = {...state.createBreak, ...action.payload}
    },
    cleanCreateBreak: (state) => {
      state.createBreak = {
        startTime: "10:00",
        endTime: "10:30"
      }
    },
    cleanTimeslots: (state) => {
      state.scheduleTimeslotStatus = Status.idle
      state.scheduleTimeslots = {currentPage: 0, lastPage: 0, data: []}
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getScheduleInterval.pending, state => {
        state.intervalStatus = Status.pending
      })
      .addCase(getScheduleInterval.fulfilled, (state, {payload}) => {
        state.intervalStatus = Status.success
        state.interval = payload.data.interval
      })
      .addCase(getScheduleInterval.rejected, state => {
        state.intervalStatus = Status.failed
      })
    builder
      .addCase(getWalkInSchedules.pending, state => {
        state.walkInScheduleStatus = Status.pending
      })
      .addCase(getWalkInSchedules.fulfilled, (state, {payload}) => {
        state.walkInScheduleStatus = Status.success
        state.walkInSchedules = {
          currentPage: payload.currentPage,
          lastPage: payload.lastPage,
          data: ReducerWithDictionary<Schedule>([...state.walkInSchedules.data], [...payload.data])
        }
      })
      .addCase(getWalkInSchedules.rejected, state => {
        state.walkInScheduleStatus = Status.failed
      })

    builder
      .addCase(getHomeServiceSchedules.pending, state => {
        state.homeServiceScheduleStatus = Status.pending
      })
      .addCase(getHomeServiceSchedules.fulfilled, (state, {payload}) => {
        state.homeServiceScheduleStatus = Status.success
        state.homeServiceSchedules = {
          currentPage: payload.currentPage,
          lastPage: payload.lastPage,
          data: ReducerWithDictionary<Schedule>([...state.homeServiceSchedules.data], [...payload.data])
        }
      })
      .addCase(getHomeServiceSchedules.rejected, state => {
        state.homeServiceScheduleStatus = Status.failed
      })
    builder
      .addCase(createBreak.fulfilled, (state, {payload}) => {
        state.scheduleUpdate.time_slots = payload.data[0].breaks
      })
    builder
      .addCase(getScheduleTimerOptions.pending, state => {
        state.timeOptionStatus = Status.pending
      })
      .addCase(getScheduleTimerOptions.fulfilled, (state, {payload}) => {
        state.timeOptions = payload.data.options
      })
      .addCase(getScheduleTimerOptions.rejected, state => {
        state.timeOptionStatus = Status.failed
      })
     builder
      .addCase(getTimeslots.pending, state => {
        state.scheduleTimeslotStatus = Status.pending
      })
      .addCase(getTimeslots.fulfilled, (state, {payload}) => {
        state.scheduleTimeslotStatus = Status.success
        state.scheduleTimeslots = {
          currentPage: payload.currentPage,
          lastPage: payload.lastPage,
          data: ReducerWithDictionary<TimeSlotType>([...state.scheduleTimeslots.data], [...payload.data])
        }
      })
      .addCase(getTimeslots.rejected, state => {
        state.scheduleTimeslotStatus = Status.failed
      })
    builder
      .addCase(PURGE, () => initialState)
  },
})

export const {
  cleanWalkInSchedules, cleanHomeServiceSchedules, getUpdateScheduleDetails, cleanScheduleUpdate,
  getCreateBreakDetails, cleanCreateBreak, cleanTimeslots
} = scheduleSlice.actions
export default scheduleSlice.reducer