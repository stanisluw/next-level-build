import { useDispatch, useSelector } from 'react-redux';

import { bindActionCreators } from '@reduxjs/toolkit';
import { type IPreferencesUseSelector, preferencesSlice } from '#preferences/model';

export const usePreferencesSelector = (): IPreferencesUseSelector['preferences'] => {
	return useSelector((state: IPreferencesUseSelector) => state.preferences);
};

export const usePreferencesActions = () => {
	const dispatch = useDispatch();

	return bindActionCreators(preferencesSlice.actions, dispatch);
};
