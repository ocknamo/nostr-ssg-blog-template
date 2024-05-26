import type { NostrEventExt } from 'nostr-fetch';

export interface Blog extends NostrEventExt {
	title: string;
	summary: string;
	hashTags: string[];
	identifier: string;
	naddress: string;
}
