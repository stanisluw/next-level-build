import type { TAuthState } from './auth.schema';

export const AUTH_STORAGE_KEY = 'auth';

export const getAuthFromStorage = (): TAuthState | null => {
	const stored = localStorage.getItem(AUTH_STORAGE_KEY);

	if (stored) {
		try {
			return JSON.parse(stored);
		} catch (e) {
			console.error(e);
			return null;
		}
	}
	return null;
};

export const setAuthToStorage = (auth: TAuthState): void => {
	localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
};

export const clearAuthFromStorage = (): void => {
	localStorage.removeItem(AUTH_STORAGE_KEY);
};
