import type { ZodType } from 'zod';

import urlcat from 'urlcat';
import { CONTENT_TYPE, HEADER } from '#shared/config';
import { parseSchema, parseTemplate } from '#shared/lib';
import { ENV } from './env';
import { appInfoSchema, localeSchema } from './external.schema';

const { VITE_APP_INFO_URL, VITE_LOCALE_URL } = ENV;

const externalJsonError = 'Failed to fetch external JSON';

const getExternalJSON = async <T = any>(url: string, schema: ZodType<T>): Promise<T> => {
	const res = await fetch(parseTemplate(url, { origin: window.location.origin }));
	const contentType = res.headers.get(HEADER.CONTENT_TYPE) || '';

	if (!(res.ok && contentType.includes(CONTENT_TYPE.APPLICATION_JSON))) {
		throw new Error(externalJsonError);
	}

	return parseSchema(schema, await res.json());
};

export const APP_INFO = await getExternalJSON(VITE_APP_INFO_URL, appInfoSchema);
export const LOCALE = await getExternalJSON(VITE_LOCALE_URL, localeSchema);

export const API = {
	URL: urlcat(APP_INFO.apiUrl, 'api'),
};

const PUBLIC_IMG_PATH = '/img';
const LOGO_PATH = `${PUBLIC_IMG_PATH}/logo`;
export const LOGO_LIGHT_PATH = `${LOGO_PATH}/light.svg`;
export const LOGO_DARK_PATH = `${LOGO_PATH}/dark.svg`;
