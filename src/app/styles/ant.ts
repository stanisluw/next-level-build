import type { ThemeConfig } from 'antd';

import { COLOR_BLUE, COLOR_DARK_GRAY } from '#shared/config';

export const theme: ThemeConfig = {
	token: {
		colorText: COLOR_DARK_GRAY[400],
		colorPrimary: COLOR_BLUE[500],
	},
};
