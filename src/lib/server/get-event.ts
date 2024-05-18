import type * as Nostr from 'nostr-typedef';
import { Relay } from 'nostr-tools/relay';

export async function getEvent(): Promise<Nostr.Event | null> {
	const relay = await Relay.connect('wss://nos.lol/');
	console.log(`connected to ${relay.url}`);

	// let's query for an event that exists

	const event: Nostr.Event | null = await new Promise((resolve, reject) => {
		const sub = relay.subscribe(
			[
				{
					ids: ['ed16238935665bebd4c897cdecc7a98a53a183dac90486d130e7193b1cb27f6a']
				}
			],
			{
				onevent(event) {
					console.log('we got the event we wanted:', event);

					resolve(event);
				},
				oneose() {
					sub.close();
					reject(null);
				}
			}
		);

		setTimeout(() => {
			console.warn('Cannot fetch event!');

			resolve(null);
		}, 10 * 1000);
	});

	relay.close();

	return event;
}
