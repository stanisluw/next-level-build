import type { PayloadAction } from '@reduxjs/toolkit';

import type { TPreferencesState } from './preferences.schema';
import { clearPreferencesFromStorage, setPreferencesToStorage } from './preferences.storage';

export const initialState: TPreferencesState = {
	isSidebarCollapsed: false,
};

export const clearState = (state: TPreferencesState) => {
	state.isSidebarCollapsed = initialState.isSidebarCollapsed;

	clearPreferencesFromStorage();
};

export const setIsSidebarCollapsed = (
	state: TPreferencesState,
	{ payload }: PayloadAction<TPreferencesState['isSidebarCollapsed']>
) => {
	state.isSidebarCollapsed = payload;

	setPreferencesToStorage(state);
};
