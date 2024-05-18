import { fetchEvent } from '$lib/server';

export async function load() {
	const event = await fetchEvent();
	return {
		event
	};
}
