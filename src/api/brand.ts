/* eslint-disable import/prefer-default-export */
/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, GetBrandImagesPayload, UploadBrandImagePayload } from "~types/api";
import { GetBrandImagesResponse, UploadBrandImageResponse } from "~types/apiResponse";
import apiRequest from "./request";
import AxiosBase from "./axios";

export const getBrandImages = createAsyncThunk<GetBrandImagesResponse, GetBrandImagesPayload, AsyncThunkConfig>
	("brand/images",
		async ({page = 1}, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.get(`/v1/settings/images?page=${page}`),
				thunkAPI)
		}
	)

export const uploadBrandImage = createAsyncThunk<UploadBrandImageResponse, UploadBrandImagePayload, AsyncThunkConfig>
	('brand/image/upload',
		async ({files}, thunkAPI) => {
			const formData = new FormData()
			files.forEach((file, index) => {
				formData.append(`fileInput[${index}]`, file)
			})
			const Axios = await AxiosBase();
			return apiRequest(Axios.post('/v1/settings/images/bulk-upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}), thunkAPI)
		}
	)

export const deleteBrandImage = createAsyncThunk<void, {imagesId: number[]}, AsyncThunkConfig>(
	"brand/image/delete",
	async (payload, thunkAPI) => {
		const Axios = await AxiosBase();
		return apiRequest(Axios.delete(`/v1/settings/images/bulk-delete`, {data: payload}),
			thunkAPI)
	}
)