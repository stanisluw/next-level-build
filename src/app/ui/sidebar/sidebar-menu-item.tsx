import type { FC } from 'react';

import cn from 'classnames';
import { NavLink } from 'react-router';

import { DynamicIcon } from 'lucide-react/dynamic';
import type { SidebarMenuItemProps } from './sidebar.types';

enum CL {
	MAIN = 'overflow-hidden p-3.5 w-full flex items-center gap-3.5 text-white/75 text-base font-semibold whitespace-nowrap rounded-lg transition-colors hover:text-white hover:bg-white/10',
	ACTIVE = '!text-primary !bg-white/15',
	ICON = 'size-6 text-primary shrink-0',
}

export const SidebarMenuItem: FC<SidebarMenuItemProps> = ({ to, icon, label }) => {
	return (
		<NavLink className={({ isActive }) => cn(CL.MAIN, isActive && CL.ACTIVE)} to={to}>
			<span className={CL.ICON}>
				<DynamicIcon name={icon} />
			</span>
			{label}
		</NavLink>
	);
};
