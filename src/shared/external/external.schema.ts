import { z } from 'zod';

export const appInfoSchema = z.object({
	apiUrl: z.string(),
});

export const localeSchema = z.object({
	app: z.object({
		name: z.string(),
	}),
});
