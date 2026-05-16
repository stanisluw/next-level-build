import { parseSchema } from '#shared/lib';
import { envSchema } from './env.schema';

export const ENV = parseSchema(envSchema, import.meta.env);
