import { error } from '@sveltejs/kit';

import { blogStore } from '$lib/server/blog-store.service';

export function load({ params }: { params: { slug: string } }) {
	const blogs = blogStore.blogs;

	const blog = blogs.find((b) => b.id === params.slug);

	if (blog) {
		return {
			blog
		};
	}

	error(404, 'Not found');
}
