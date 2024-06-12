import type { Blog } from '$lib/types';
import { naddrEncode } from 'nostr-tools/nip19';
import { getLongformEvent } from './get-event';

export class BlogStoreService {
	blogs: Blog[] = [];

	async fetch(): Promise<void> {
		console.info('BlogStoreService: start fetch.');
		const events = await getLongformEvent();

		const blogs: Blog[] = events
			.map((e) => {
				const identifierTag = e.tags.find((t) => t[0] === 'd') ?? [];
				const titleTag = e.tags.find((t) => t[0] === 'title') ?? [];
				const summaryTag = e.tags.find((t) => t[0] === 'summary') ?? [];
				const imageTag = e.tags.find((t) => t[0] === 'image') ?? [];
				const hashTags = e.tags.filter((t) => t[0] === 't').map((t) => t[1]);
				return {
					...e,
					identifier: identifierTag[1],
					title: titleTag[1],
					summary: summaryTag[1],
					image: imageTag[1],
					hashTags
				};
			})
			.filter((e) => !!e.identifier)
			.map((e) => ({
				...e,
				naddress: naddrEncode({
					identifier: e.identifier as string,
					pubkey: e.pubkey,
					kind: e.kind
				})
			}));

		// fetch imagePlaceholderUrl
		for (const blog of blogs) {
			if (blog.image) {
				// PoC
				// TODO: config
				const optimazerPrefix = 'https://nostr-image-optimizer.ocknamo.com/image/';

				const res = await fetch(
					`${optimazerPrefix}width=200,quality=40,format=webp/${blog.image}`,
					{ headers: { 'User-Agent': 'Mozilla/5.0' } }
				); // dummy user-agent

				console.info(`Requested to: ${res.url}`);

				if (!res.ok) {
					console.warn(`${res.status}: ${res.statusText}`);

					continue;
				}

				const blob = await res.blob();

				const buffer = Buffer.from(await blob.arrayBuffer());
				const base64 = buffer.toString('base64');

				// Base64文字列を使ってData URLsを作成する
				const base64DataURL = base64 ? `data:image/webp;base64,${base64}` : undefined;

				Object.assign(blog, { imagePlaceholderUrl: base64DataURL });
			}
		}

		this.blogs = blogs;

		console.info('BlogStoreService: end fetch.');
	}
}

export const blogStore = new BlogStoreService();
