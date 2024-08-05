/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, CreateBreakPayload, CreateSchedulePayload, GetSchedulesPayload, GetTimeslotsPayload, ToggleScheduleDatePayload, ToggleSchedulePayload} from "~types/api";
import { CreateBreakResponse, GetIntervalResponse, GetSchedulesResponse, GetTimerOptionsResponse, GetTimeslotsResponse, RequestResponse, ToggleScheduleResponse } from "~types/apiResponse";
import apiRequest from "./request";
import AxiosBase from "./axios";

export const getWalkInSchedules = createAsyncThunk<GetSchedulesResponse, GetSchedulesPayload, AsyncThunkConfig>
	("schedules/walk-in",
		async ({page = 1, search = ''}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/schedules/walk-in?page=${page}&search=${search}`),
				thunkAPI)
		}
	)

export const getHomeServiceSchedules = createAsyncThunk<GetSchedulesResponse, GetSchedulesPayload, AsyncThunkConfig>
	("schedules/home-service",
		async ({page = 1, search = ''}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/schedules/home-service?page=${page}&search=${search}`),
				thunkAPI)
		}
	)

export const getTimeslots = createAsyncThunk<GetTimeslotsResponse, GetTimeslotsPayload, AsyncThunkConfig>
('schedule/timeslots', async ({page = 1, search, homeService}, thunkAPI) => {
	const Axios = await AxiosBase()
	return apiRequest(Axios.get(`/v1/schedules?search=${search}&homeService=${homeService}&page=${page}`), thunkAPI)
})

export const createSchedule = createAsyncThunk<RequestResponse, CreateSchedulePayload, AsyncThunkConfig>
	('schedule/create',
		async (payload, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.post('/v1/schedules/store', payload),
				thunkAPI)
		}
	)

export const getScheduleInterval = createAsyncThunk<GetIntervalResponse, void, AsyncThunkConfig>
	('schedule/interval',
		async (_, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get('/v1/schedules/intervals'),
				thunkAPI)
		}
	)

export const toggleSchedule = createAsyncThunk<ToggleScheduleResponse, ToggleSchedulePayload, AsyncThunkConfig>
	('schedule/toggle-availability',
		async (payload, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.patch('/v1/schedules/toggle', payload),
				thunkAPI)
		}
	)

export const toggleScheduleDate = createAsyncThunk<GetSchedulesResponse, ToggleScheduleDatePayload, AsyncThunkConfig>
	('schedule/date/toggle-availability',
		async (payload, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.patch('/v1/schedules/toggle-date', payload),
				thunkAPI)
		}
	)

export const createBreak = createAsyncThunk<CreateBreakResponse, CreateBreakPayload, AsyncThunkConfig>
	('schedule/create-break',
		async (payload, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.post('/v1/schedules/create-break', payload),
				thunkAPI)
		}
	)

export const getScheduleTimerOptions = createAsyncThunk<GetTimerOptionsResponse, void, AsyncThunkConfig>
	('schedule/timer-data',
		async (_, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get('/v1/schedules/options'),
				thunkAPI)
		}
	)