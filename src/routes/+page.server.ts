import type { PageServerLoad } from './$types';
import { getSystemPrompt } from '$lib/server/systemPrompt';

export const load: PageServerLoad = async () => {
	return {
		systemPrompt: getSystemPrompt()
	};
};
