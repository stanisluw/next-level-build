import { useAuthActions, useAuthSelector } from './auth-state';

export const useAuthUser = () => {
	const user = useAuthSelector();
	const { clearState } = useAuthActions();

	const handleLogout = () => {
		clearState();
	};

	return {
		user,
		handleLogout,
	};
};
