import { eventKind, NostrFetcher, type NostrEventExt } from 'nostr-fetch';

const nHoursAgo = (hrs: number): number => Math.floor((Date.now() - hrs * 60 * 60 * 1000) / 1000);

export async function getLongformEvent(): Promise<NostrEventExt[]> {
	const fetcher = NostrFetcher.init();
	const relayUrls = ['wss://nos.lol/'];
	const oneYearAgo = nHoursAgo(24 * 365);

	const allPosts = await fetcher.fetchAllEvents(
		relayUrls,
		{
			kinds: [eventKind.article],
			authors: ['26bb2ebed6c552d670c804b0d655267b3c662b21e026d6e48ac93a6070530958'] // Me
		},
		{
			since: oneYearAgo
		},
		{
			sort: true
		}
	);

	console.log(allPosts);

	return allPosts;
}
