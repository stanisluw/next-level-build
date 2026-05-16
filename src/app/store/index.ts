import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { preferencesSlice } from '#preferences';

export const store = configureStore({
	reducer: combineReducers({
		[preferencesSlice.name]: preferencesSlice.reducer,
	}),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

setupListeners(store.dispatch);
