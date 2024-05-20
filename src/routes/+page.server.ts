import { blogStore } from '$lib/server/blog-store.service';

export async function load() {
	await blogStore.fetch();
	const events = blogStore.events;

	// Debug log
	for (const event of events) {
		console.log('id', event.naddress);
	}

	return {
		events
	};
}
