import type { AdouptedEvent } from '$lib/types';
import { naddrEncode } from 'nostr-tools/nip19';
import { getLongformEvent } from './get-event';

export class BlogStoreService {
	events: AdouptedEvent[] = [];

	async fetch(): Promise<void> {
		console.info('BlogStoreService: start fetch.');
		const events = await getLongformEvent();

		const adouptedEvent: AdouptedEvent[] = events
			.map((e) => {
				const identifierTag = e.tags.find((t) => t[0] === 'd');
				return identifierTag ? { ...e, identifier: identifierTag[1] } : { ...e, identifier: '' };
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

		this.events = adouptedEvent;

		console.info('BlogStoreService: end fetch.');
	}
}

export const blogStore = new BlogStoreService();
