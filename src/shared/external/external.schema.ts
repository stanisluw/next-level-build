import { z } from 'zod';

export const appInfoSchema = z.object({
	apiUrl: z.string(),
});

export const localeSchema = z.object({
	app: z.object({
		name: z.string(),
	}),
	['404']: z.string(),
	pageNotFound: z.string(),
	projects: z.string(),
	employees: z.string(),
});
