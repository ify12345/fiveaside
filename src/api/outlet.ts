/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, GetOutletsPayload } from "~types/api";
import { GetOutletsResponse } from "~types/apiResponse";
import AxiosBase from "./axios";
import apiRequest from "./request";

export const getOutlets = createAsyncThunk<GetOutletsResponse, GetOutletsPayload, AsyncThunkConfig>(
  "outlets",
  async ({page = 1, search = ''}, thunkAPI) => {
    const Axios = await AxiosBase()
    return apiRequest(Axios.get(`/v1/onboarding/outlets?page=${page}&search=${search}`), thunkAPI)
  }
)