/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, GetEarningsPayload } from "~types/api";
import { GetEarningsResponse } from "~types/apiResponse";
import apiRequest from "./request";
import AxiosBase from "./axios";

export const getEarnings = createAsyncThunk<GetEarningsResponse, GetEarningsPayload, AsyncThunkConfig>
	("earnings",
		async ({page = 1, startDate = '', endDate = ''}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/profile/earnings?page=${page}&startDate=${startDate}&endDate=${endDate}`),
				thunkAPI)
		}
	)