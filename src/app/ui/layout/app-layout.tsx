import type { FC } from 'react';

import { Outlet } from 'react-router';

import { Sidebar } from '#app/ui/sidebar';

enum CL {
	MAIN = 'size-full flex',
	CONTENT = 'size-full bg-background text-foreground',
}

export const AppLayout: FC = () => {
	return (
		<div className={CL.MAIN}>
			<Sidebar />
			<div className={CL.CONTENT}>
				<Outlet />
			</div>
		</div>
	);
};
