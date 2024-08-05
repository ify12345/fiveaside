/* eslint-disable import/no-cycle */
/* eslint-disable no-param-reassign */
import {createSlice} from '@reduxjs/toolkit'
// import dayjs from 'dayjs'
import { PURGE } from 'redux-persist'
import { getPastAppointments, getUpcomingAppointments } from '~api/appointment'
import { ReducerWithDictionary } from '~helpers'
import { Appointment } from '~types'
import { Status } from '~types/api'
import { createAppointmentNotifications } from '~utils/notification'

interface State {
  upcomingAppointmentStatus: Status
  upcomingAppointments: {
    data: Appointment[]
    currentPage: number
    lastPage: number
  }

  pastAppointmentStatus: Status
  pastAppointments: {
    data: Appointment[]
    currentPage: number
    lastPage: number
  }
}

const initialState: State = {
  upcomingAppointmentStatus: Status.idle,
  upcomingAppointments: {
    data: [],
    currentPage: 0,
    lastPage: 0
  },
  pastAppointmentStatus: Status.idle,
  pastAppointments: {
    data: [],
    currentPage: 0,
    lastPage: 0
  }
}

const appointmentSlice = createSlice({
  name: 'appointment',
  initialState,
  reducers: {
    cleanUpcomingAppointments: (state) => {
      state.upcomingAppointmentStatus = Status.idle
      state.upcomingAppointments = {
        data: [],
        currentPage: 0,
        lastPage: 0
      }
    },
    cleanPastAppointments: (state) => {
      state.pastAppointmentStatus = Status.idle
      state.pastAppointments = {
        data: [],
        currentPage: 0,
        lastPage: 0
      }
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getUpcomingAppointments.pending, state => {
        state.upcomingAppointmentStatus = Status.pending
      })
      .addCase(getUpcomingAppointments.fulfilled, (state, {payload}) => {
        state.upcomingAppointmentStatus = Status.success
        state.upcomingAppointments = {
          currentPage: payload.currentPage,
          lastPage: payload.lastPage,
          data: ReducerWithDictionary<Appointment>([...state.upcomingAppointments.data], [...payload.data])
        }
        // use each appointment to create notifications at interval
        state.upcomingAppointments.data.forEach(appointment => {
          const {id, clientName, startTime: date} = appointment
          createAppointmentNotifications({
            id,
            date,
            client: clientName
          })
        });
      })
      .addCase(getUpcomingAppointments.rejected, state => {
        state.upcomingAppointmentStatus = Status.failed
      })
    builder
      .addCase(getPastAppointments.pending, state => {
        state.pastAppointmentStatus = Status.pending
      })
      .addCase(getPastAppointments.fulfilled, (state, {payload}) => {
        state.pastAppointmentStatus = Status.success
        state.pastAppointments = {
          currentPage: payload.currentPage,
          lastPage: payload.lastPage,
          data: ReducerWithDictionary<Appointment>([...state.pastAppointments.data], [...payload.data])
        }
      })
      .addCase(getPastAppointments.rejected, state => {
        state.pastAppointmentStatus = Status.failed
      })
    builder
      .addCase(PURGE, () => initialState)
  },
})

export const {cleanUpcomingAppointments, cleanPastAppointments} = appointmentSlice.actions
export default appointmentSlice.reducer