/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface State {
  languageCode: string;
}

const initialState: State = {
  languageCode: ''
}

export const langSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguageCode: (state, actions: PayloadAction<string>) => {
      state.languageCode = actions.payload
    }
  }
})

export const {setLanguageCode} = langSlice.actions
export default langSlice.reducer