import type { FC } from 'react';

import { LOCALE, LOGO_LIGHT_PATH } from '#shared/external';

import { Outlet } from 'react-router';

enum CL {
	MAIN = 'size-full flex flex-col items-center justify-center',
	CONTAINER = 'p-8 w-132 flex flex-col items-center gap-8 bg-background text-foreground rounded-xl',
}

export const AuthLayout: FC = () => {
	return (
		<div className={CL.MAIN}>
			<div className={CL.CONTAINER}>
				<img src={LOGO_LIGHT_PATH} alt={LOCALE.app.name} />
				<Outlet />
			</div>
		</div>
	);
};
