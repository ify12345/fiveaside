/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, GetNotificationsPayload } from "~types/api";
import { GetNotificationsResponse } from "~types/apiResponse";
import apiRequest from "./request";
import AxiosBase from "./axios";

export const getNotifications = createAsyncThunk<GetNotificationsResponse, GetNotificationsPayload, AsyncThunkConfig>
	("notifications",
		async ({page = 1}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/profile/notifications?page=${page}`),
				thunkAPI)
		}
	)