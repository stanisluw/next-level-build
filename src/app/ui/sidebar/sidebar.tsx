import type { FC } from 'react';

import { Button } from 'antd';
import cn from 'classnames';

import { ChevronLeftIcon } from 'lucide-react';
import { ROUTE_NAMES } from '#shared/config';
import { LOCALE, LOGO_DARK_PATH } from '#shared/external';
import { SidebarMenuItem } from './sidebar-menu-item';
import { useSidebar } from './use-sidebar';

enum CL {
	MAIN = 'px-4 py-6 w-77 h-full flex flex-col gap-6 shrink-0 transition-all duration-300',
	COLLAPSED = '!w-21',
	LOGO = 'min-w-69',
	CONTAINER = 'size-full flex flex-col justify-between',
	CONTENT = 'w-full flex flex-col gap-3',
	MENU = 'w-full flex flex-col gap-1',
	COLLAPSE_ICON = 'transition-transform duration-300',
	COLLAPSE_ICON_COLLAPSED = 'rotate-180',
}

export const Sidebar: FC = () => {
	const { isSidebarCollapsed, handleCollapse } = useSidebar();

	return (
		<div className={cn(CL.MAIN, isSidebarCollapsed && CL.COLLAPSED)}>
			<img className={CL.LOGO} src={LOGO_DARK_PATH} alt={LOCALE.app.name} />
			<div className={CL.CONTAINER}>
				<div className={CL.CONTENT}>
					<div className={CL.MENU}>
						<SidebarMenuItem
							to={ROUTE_NAMES.PROJECTS}
							icon={'folder'}
							label={LOCALE.projects}
						/>
						<SidebarMenuItem
							to={ROUTE_NAMES.EMPLOYEES}
							icon={'users'}
							label={LOCALE.employees}
						/>
					</div>
				</div>
				<div className={CL.CONTENT}>
					<Button
						size={'large'}
						variant={'solid'}
						color={'primary'}
						icon={
							<ChevronLeftIcon
								className={cn(
									CL.COLLAPSE_ICON,
									isSidebarCollapsed && CL.COLLAPSE_ICON_COLLAPSED
								)}
							/>
						}
						onClick={handleCollapse}
						block
					/>
				</div>
			</div>
		</div>
	);
};
