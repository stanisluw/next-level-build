import type { FC } from 'react';

import { Outlet } from 'react-router';

enum CL {
	MAIN = 'w-full h-dvh bg-dark text-white',
}

export const Layout: FC = () => {
	return (
		<div className={CL.MAIN}>
			<Outlet />
		</div>
	);
};
