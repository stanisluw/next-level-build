import { PREFERENCES_STORAGE_KEY } from '#preferences/config';
import { parseSchema } from '#shared/lib/parse.ts';
import { type TPreferencesState, preferencesSchema } from './preferences.schema';

export const getPreferencesFromStorage = (): TPreferencesState | null => {
	const stored = localStorage.getItem(PREFERENCES_STORAGE_KEY);

	if (stored) {
		try {
			return parseSchema(preferencesSchema, JSON.parse(stored));
		} catch (e) {
			console.error(e);
		}
	}

	return null;
};

export const setPreferencesToStorage = (preferences: TPreferencesState) => {
	localStorage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(preferences));
};

export const clearPreferencesFromStorage = () => {
	localStorage.removeItem(PREFERENCES_STORAGE_KEY);
};
