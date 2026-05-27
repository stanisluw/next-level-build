import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';

import { preferencesSlice } from '#preferences';
import { authReducer } from '../../auth/model';

export const store = configureStore({
	reducer: combineReducers({
		[preferencesSlice.name]: preferencesSlice.reducer,
		auth: authReducer,
	}),
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { authActions } from '../../auth/model';
