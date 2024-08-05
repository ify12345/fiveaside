/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, CancelAppointmentPayload, GetAppointmentsPayload } from "~types/api";
import { GetAppointmentsResponse } from "~types/apiResponse";
import apiRequest from "./request";
import AxiosBase from "./axios";

export const getPastAppointments = createAsyncThunk<GetAppointmentsResponse, GetAppointmentsPayload, AsyncThunkConfig>
	("appointments/past",
		async ({page = 1, search = ''}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/appointments/past?page=${page}&search=${search}`),
				thunkAPI)
		}
	)

export const getUpcomingAppointments = createAsyncThunk<GetAppointmentsResponse, GetAppointmentsPayload, AsyncThunkConfig>
	("appointments/upcoming",
		async ({page = 1, search = ''}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/appointments/upcoming?page=${page}&search=${search}`),
				thunkAPI)
		}
	)

export const cancelAppointment = createAsyncThunk<void, CancelAppointmentPayload, AsyncThunkConfig>(
	"appointment/cancel",
	async (payload, thunkAPI) => {
		const Axios = await AxiosBase();
			return apiRequest(Axios.patch('/v1/appointments/cancel', payload),
				thunkAPI)
	}
)

export const completeAppointment = createAsyncThunk<void, {appointment_id: number}, AsyncThunkConfig>(
	"appointment/complete",
	async (payload, thunkAPI) => {
		const Axios = await AxiosBase();
			return apiRequest(Axios.patch('/v1/appointments/complete', payload),
				thunkAPI)
	}
)

