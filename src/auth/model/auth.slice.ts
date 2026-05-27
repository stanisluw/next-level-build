import { createSlice } from '@reduxjs/toolkit';

import { clearState, initialState, setUser } from './auth.actions';
import { AUTH_STORAGE_KEY } from './auth.storage';
import { getAuthFromStorage } from './auth.storage';

export const authSlice = createSlice({
	name: AUTH_STORAGE_KEY,
	initialState: getAuthFromStorage() || initialState,
	reducers: {
		clearState,
		setUser,
	},
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
