/* eslint-disable import/no-cycle */
/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RequestResponse, UpdateProfileResponse } from "~types/apiResponse";
import { AsyncThunkConfig, ChangePasswordPayload, UpdateProfilePayload, UpdateProfilePicturePayload } from "~types/api";
import AxiosBase from "./axios";
import apiRequest from "./request";

export const updatePassword = createAsyncThunk<RequestResponse, ChangePasswordPayload, AsyncThunkConfig>
	('update-password',
		async (payload, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.patch('/v1/profile/change-password', payload), thunkAPI)
		}
	)

export const updateProfile = createAsyncThunk<UpdateProfileResponse, UpdateProfilePayload, AsyncThunkConfig>
	('profile/update',
		async (payload, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.patch('/v1/profile/update', payload), thunkAPI)
		}
	)

export const updateProfilePhoto = createAsyncThunk<UpdateProfileResponse, UpdateProfilePicturePayload, AsyncThunkConfig>
	('profile/update-picture',
		async ({picture}, thunkAPI) => {
			const formData = new FormData()
			formData.append('file', picture)
			const Axios = await AxiosBase();
			return apiRequest(Axios.post('/v1/profile/update-profile-picture', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			}), thunkAPI)
		}
	)