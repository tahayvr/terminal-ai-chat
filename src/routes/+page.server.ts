import type { PageServerLoad } from './$types';

export const load = (async () => {
	// You can load server-side data here if needed
	return {};
}) satisfies PageServerLoad;
