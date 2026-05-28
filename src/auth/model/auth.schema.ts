import { z } from 'zod';

export const authUserSchema = z.object({
	email: z.string(),
	name: z.string(),
});

export type TAuthState = z.infer<typeof authUserSchema>;
export type TAuthUser = TAuthState;

export const authSchema = z.object({
	user: authUserSchema,
});

export interface IAuthUseSelector {
	auth: TAuthState;
}
