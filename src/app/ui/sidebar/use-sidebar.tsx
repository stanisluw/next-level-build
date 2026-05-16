import { usePreferencesActions, usePreferencesSelector } from '#preferences';

export const useSidebar = () => {
	const { isSidebarCollapsed } = usePreferencesSelector();
	const { setIsSidebarCollapsed } = usePreferencesActions();

	const handleCollapse = () => {
		setIsSidebarCollapsed(!isSidebarCollapsed);
	};

	return {
		isSidebarCollapsed,
		handleCollapse,
	};
};
