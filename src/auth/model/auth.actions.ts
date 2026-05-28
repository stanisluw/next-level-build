import type { PayloadAction } from '@reduxjs/toolkit';

import type { TAuthState } from './auth.schema';
import { clearAuthFromStorage, setAuthToStorage } from './auth.storage';

export const initialState: TAuthState = {
	email: '',
	name: '',
};

export const clearState = (state: TAuthState) => {
	state.email = initialState.email;
	state.name = initialState.name;

	clearAuthFromStorage();
};

export const setUser = (state: TAuthState, { payload }: PayloadAction<TAuthState>) => {
	state.email = payload.email;
	state.name = payload.name;
	setAuthToStorage(state);
};
