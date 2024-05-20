import { error } from '@sveltejs/kit';

import { blogStore } from '$lib/server/blog-store.service';

export function load({ params }: { params: { slug: string } }) {
	const events = blogStore.events;

	const event = events.find((e) => e.naddress === params.slug);

	if (event) {
		return {
			naddress: params.slug,
			content: event.content
		};
	}

	error(404, 'Not found');
}
