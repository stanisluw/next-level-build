import { z } from 'zod';

export const preferencesSchema = z.object({
	isSidebarCollapsed: z.boolean(),
});

export type TPreferencesState = z.infer<typeof preferencesSchema>;

export interface IPreferencesUseSelector {
	preferences: TPreferencesState;
}
