import type { ZodType } from 'zod';

const parseTemplateRegexp = /{([^{}]+)}/g;

export const parseTemplate = <T extends Record<string, unknown>>(
	template: string,
	values: T
): string => {
	return template.replace(parseTemplateRegexp, (_, key) => {
		const value = values[key];

		return value !== undefined ? String(value) : `{${key}}`;
	});
};

export const parseSchema = <T>(schema: ZodType<T>, data: unknown): T => {
	const result = schema.safeParse(data);

	if (!result.success) {
		throw result.error;
	}

	return result.data;
};
