/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, GetOverviewPayload } from "~types/api";
import { GetOverviewResponse } from "~types/apiResponse";
import apiRequest from "./request";
import AxiosBase from "./axios";

export const getOverview = createAsyncThunk<GetOverviewResponse, GetOverviewPayload, AsyncThunkConfig>
	("overview",
		async ({startDate, endDate}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/profile/overview?startDate=${startDate}&endDate=${endDate}`),
				thunkAPI)
		}
	)