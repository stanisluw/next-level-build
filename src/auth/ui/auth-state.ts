import { useDispatch, useSelector } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';
import type { RootState } from '#app/store';
import { authSlice } from '../model/auth.slice';

export const useAuthSelector = () => {
	return useSelector((state: RootState) => state.auth);
};

export const useAuthActions = () => {
	const dispatch = useDispatch();
	return bindActionCreators(authSlice.actions, dispatch);
};
