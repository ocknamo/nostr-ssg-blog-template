import { getDate } from '$lib/server';

export function load() {
	return {
		dateString: getDate()
	};
}
