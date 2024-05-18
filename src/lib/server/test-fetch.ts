import { Relay } from 'nostr-tools/relay';

export async function fetchEvent(): Promise<string> {
	const relay = await Relay.connect('wss://nos.lol/');
	console.log(`connected to ${relay.url}`);

	// let's query for an event that exists

	const event = await new Promise((resolve, reject) => {
		const sub = relay.subscribe(
			[
				{
					ids: ['00cbd92cd088de9d37423c8f025d39fb5b4f1ea4b28c9bfcd7cdee1986013d38']
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

	return JSON.stringify(event);
}
