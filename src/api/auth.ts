/* eslint-disable import/no-cycle */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AsyncThunkConfig, ForgotPasswordPayload, GoogleAuthPayload, LoginPayload, RegisterPayload, ResetPasswordPayload, VerifyAccountPayload } from "~types/api";
import { GetCountries, GetUserResponse, LoginResponse, RegisterResponse, RequestResponse, VerifyAccountResponse } from "~types/apiResponse";
import AxiosBase from "./axios";
import apiRequest from "./request";

export const getCountries = createAsyncThunk<GetCountries, void, AsyncThunkConfig>
		("auth/countries",
				async (_, thunkAPI) => {
						const Axios = await AxiosBase()
						return apiRequest(Axios.get('/v1/onboarding/countries'), thunkAPI)
				}
		)
export const register = createAsyncThunk<RegisterResponse, RegisterPayload, AsyncThunkConfig>
		("auth/register",
				async (payload, thunkAPI) => {
						const Axios = await AxiosBase();
						return apiRequest(Axios.post('/v1/onboarding/register', payload),
								thunkAPI, 'auth')
				}
		);

export const login = createAsyncThunk<LoginResponse, LoginPayload, AsyncThunkConfig>
("auth/login",
				async (payload, thunkAPI) => {
						const Axios = await AxiosBase();
						return apiRequest(Axios.post('/v1/auth/login', payload),
								thunkAPI, 'auth')
				}
);

export const continueWithGoogle = createAsyncThunk<LoginResponse, GoogleAuthPayload, AsyncThunkConfig>
		("auth/google",
				async (payload, thunkAPI) => {
						const Axios = await AxiosBase();
						return apiRequest(Axios.post('/v1/auth/google/login', payload),
								thunkAPI, 'auth')
				}
		)

export const accountVerification = createAsyncThunk<VerifyAccountResponse, VerifyAccountPayload, AsyncThunkConfig>
				("auth/verify-account",
						async (payload, thunkAPI) => {
								const Axios = await AxiosBase();
								return apiRequest(Axios.post('/v1/auth/verify-email', payload),
										thunkAPI)
						}
				)

export const resendOtp = createAsyncThunk<RequestResponse, void, AsyncThunkConfig>
		('auth/resend-otp',
				async (_, thunkAPI) => {
						const Axios = await AxiosBase();
						return apiRequest(Axios.post('/v1/auth/resend-verification-code'),
								thunkAPI)
				}
		)

export const forgotPassword = createAsyncThunk<RequestResponse, ForgotPasswordPayload, AsyncThunkConfig>
		('auth/forgot-password',
				async (payload, thunkAPI) => {
						const Axios = await AxiosBase();
						return apiRequest(Axios.post('/v1/auth/password/forgot', payload),
								thunkAPI)
				}
		)

export const resetPassword = createAsyncThunk<RequestResponse, ResetPasswordPayload, AsyncThunkConfig>
	("auth/reset-password",
		async (payload, thunkAPI) => {
			const Axios = await AxiosBase();
				return apiRequest(Axios.post('/v1/auth/password/reset', payload),
					thunkAPI)
		}
	)

export const logOut = createAsyncThunk<RequestResponse, void, AsyncThunkConfig>
	("auth/logout",
		async (_, thunkAPI) => {
			const Axios = await AxiosBase();
			return apiRequest(Axios.post('/v1/auth/logout'),
				thunkAPI)
		}
	)

export const getUser = createAsyncThunk<GetUserResponse, void, AsyncThunkConfig>
	('auth/get-user', 
		async (_, thunkAPI) => {
			const Axios = await AxiosBase()
			return apiRequest(Axios.get('/v1/profile'), thunkAPI)
		}
	)
		

