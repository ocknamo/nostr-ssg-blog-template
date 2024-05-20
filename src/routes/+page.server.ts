import { getLongformEvent } from '$lib/server';
import { naddrEncode } from 'nostr-tools/nip19';
import type { AdouptedEvent } from '$lib/types';

export async function load() {
	const events = await getLongformEvent();

	const adouptedEvent: AdouptedEvent[] = events
		.map((e) => {
			const identifierTag = e.tags.find((t) => t[0] === 'd');
			return identifierTag ? { ...e, identifier: identifierTag[1] } : { ...e, identifier: '' };
		})
		.filter((e) => !!e.identifier)
		.map((e) => ({
			...e,
			naddress: naddrEncode({ identifier: e.identifier as string, pubkey: e.pubkey, kind: e.kind })
		}));
	return {
		events: adouptedEvent
	};
}
