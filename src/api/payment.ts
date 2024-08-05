/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, GetBanksPayload, UpdateBankPayload } from "~types/api";
import { GetBanksResponse, UpdateBankResponse } from "~types/apiResponse";
import apiRequest from "./request";
import AxiosBase from "./axios";

export const getBanks = createAsyncThunk<GetBanksResponse, GetBanksPayload, AsyncThunkConfig>
	("banks",
		async ({page = 1}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/banks/list?page=${page}`),
				thunkAPI)
		}
	)

export const updateBank = createAsyncThunk<UpdateBankResponse, UpdateBankPayload, AsyncThunkConfig>
  ("bank/update",
    async (payload, thunkAPI) => {
      const Axios = await AxiosBase();
			return apiRequest(Axios.patch(`/v1/banks`, payload),
				thunkAPI)
    }
  )