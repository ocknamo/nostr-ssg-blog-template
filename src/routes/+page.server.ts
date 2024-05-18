import { fetchEvent } from '$lib/server';

export async function load() {
	const eventString = await fetchEvent();
	return {
		event: eventString
	};
}
