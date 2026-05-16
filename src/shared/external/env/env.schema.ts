import { z } from 'zod';

export const envSchema = z.object({
	VITE_APP_INFO_URL: z.string(),
	VITE_LOCALE_URL: z.string(),
});
