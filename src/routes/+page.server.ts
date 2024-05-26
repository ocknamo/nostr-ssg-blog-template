import { blogStore } from '$lib/server/blog-store.service';

export async function load() {
	await blogStore.fetch();
	const blogs = blogStore.blogs;

	// Debug log
	for (const blog of blogs) {
		console.log('Build titile: ', blog.title);
	}

	return {
		blogs
	};
}
