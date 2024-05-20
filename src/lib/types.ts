import type { NostrEventExt } from 'nostr-fetch';

export interface AdouptedEvent extends NostrEventExt {
	identifier: string;
	naddress: string;
}
