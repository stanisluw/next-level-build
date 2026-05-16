import type { IconName } from 'lucide-react/dynamic';
import type { NavLinkProps } from 'react-router';

export interface SidebarMenuItemProps {
	to: NavLinkProps['to'];
	icon: IconName;
	label: string;
}
