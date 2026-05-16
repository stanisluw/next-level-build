import { createSlice } from '@reduxjs/toolkit';

import { PREFERENCES_STORAGE_KEY } from '#preferences/config';
import { clearState, initialState, setIsSidebarCollapsed } from './preferences.actions';
import { getPreferencesFromStorage } from './preferences.storage';

export const preferencesSlice = createSlice({
	name: PREFERENCES_STORAGE_KEY,
	initialState: getPreferencesFromStorage() || initialState,
	reducers: {
		clearState,
		setIsSidebarCollapsed,
	},
});
