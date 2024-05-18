import { getEvent } from '$lib/server';

export async function load() {
	const event = await getEvent();
	return {
		eventString: JSON.stringify(event)
	};
}
