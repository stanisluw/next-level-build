import type { Config } from 'tailwindcss';

import { COLOR_BLUE, COLOR_DARK_GRAY, COLOR_GRAY, COLOR_WHITE } from '#shared/config';

const colorScale = (palette: Record<number, string>, defaultColor: number = 500) => {
	return {
		...palette,
		DEFAULT: palette[defaultColor],
	};
};

export default {
	theme: {
		extend: {
			colors: {
				background: COLOR_WHITE,
				foreground: COLOR_DARK_GRAY[400],
				default: colorScale(COLOR_GRAY),
				dark: colorScale(COLOR_DARK_GRAY, 400),
				primary: colorScale(COLOR_BLUE),
			},
		},
	},
} satisfies Config;
